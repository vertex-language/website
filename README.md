# Vertex Documentation Website

The open source documentation website for [Vertex](https://github.com/vertex-language). It is a read-only site that introduces the language, its packages, and its SDKs.

## Layout

| Path | Contents |
| --- | --- |
| `frontend/` | The site: a React and TypeScript single-page app built with Vite |
| `backend/` | A small Go HTTP server that serves the compiled bundle |
| `docs-src/` | Markdown sources for the language docs |

## Run locally

```bash
cd frontend
npm install
npm run dev
```

## Build and serve

```bash
cd frontend && npm ci && npm run build
cd ../backend && go build -o server .
STATIC_DIR=../frontend/dist PORT=8080 ./server
```

The server listens on `$PORT` (default `8080`) and serves the bundle in `$STATIC_DIR` (default `./dist`).

## Docker

```bash
docker build -t vertex-website .
docker run --rm -p 8080:8080 vertex-website
```

The image listens on port 8080 and honors `$PORT`, so it runs on Cloud Run as-is.

## Editing the docs

The language docs are Markdown in `docs-src/`. After editing, run `npm run docs` in `frontend/` to compile every example with `vsc` and regenerate the pages. This needs the `vsc` compiler on your `PATH`.

## License

MIT. See [LICENSE](LICENSE).
