// Command server serves the compiled Vite bundle over plain HTTP.
//
// It is a read-only static file server for a single-page app: files that exist
// in the bundle are served as-is, and every other path falls back to
// index.html so client-side routes resolve. It listens on $PORT (default 8080,
// which is what Cloud Run provides) and reads the bundle from $STATIC_DIR
// (default ./dist).
package main

import (
	"compress/gzip"
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path"
	"path/filepath"
	"strings"
	"syscall"
	"time"
)

func main() {
	root := env("STATIC_DIR", "dist")
	addr := ":" + env("PORT", "8080")

	if _, err := os.Stat(filepath.Join(root, "index.html")); err != nil {
		log.Fatalf("no bundle found in %q: %v", root, err)
	}

	srv := &http.Server{
		Addr:              addr,
		Handler:           gzipped(spa(root)),
		ReadHeaderTimeout: 10 * time.Second,
		IdleTimeout:       120 * time.Second,
	}

	go func() {
		log.Printf("serving %s on %s", root, addr)
		if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			log.Fatal(err)
		}
	}()

	// Cloud Run sends SIGTERM before stopping an instance.
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, os.Interrupt)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Printf("shutdown: %v", err)
	}
}

// spa serves files from root and falls back to index.html for unknown paths.
func spa(root string) http.Handler {
	files := http.FileServer(http.Dir(root))
	index := filepath.Join(root, "index.html")

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		clean := path.Clean("/" + r.URL.Path)
		info, err := os.Stat(filepath.Join(root, filepath.FromSlash(clean)))
		exists := err == nil && !info.IsDir()

		switch {
		case exists && strings.HasPrefix(clean, "/assets/"):
			// Vite fingerprints everything under /assets/, so it never changes.
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
			files.ServeHTTP(w, r)
		case exists && clean != "/index.html":
			w.Header().Set("Cache-Control", "public, max-age=3600")
			files.ServeHTTP(w, r)
		case path.Ext(clean) != "" && clean != "/index.html":
			// A missing file (favicon, script, image) is a 404, not an app route.
			http.NotFound(w, r)
		default:
			w.Header().Set("Cache-Control", "no-cache")
			http.ServeFile(w, r, index)
		}
	})
}

type gzipWriter struct {
	http.ResponseWriter
	zw *gzip.Writer
}

func (g gzipWriter) Write(b []byte) (int, error) { return g.zw.Write(b) }

// gzipped compresses text responses for clients that accept it.
func gzipped(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") || r.Method == http.MethodHead || !compressible(r.URL.Path) {
			next.ServeHTTP(w, r)
			return
		}
		w.Header().Set("Content-Encoding", "gzip")
		w.Header().Add("Vary", "Accept-Encoding")
		w.Header().Del("Content-Length")
		zw := gzip.NewWriter(w)
		defer zw.Close()
		next.ServeHTTP(gzipWriter{w, zw}, r)
	})
}

// compressible reports whether a path is text worth compressing. Extensionless
// paths are app routes that resolve to index.html.
func compressible(p string) bool {
	switch strings.ToLower(path.Ext(p)) {
	case "", ".html", ".js", ".css", ".json", ".svg", ".txt", ".map", ".xml":
		return true
	}
	return false
}

func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
