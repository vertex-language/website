# Build the Vite bundle.
FROM node:22-alpine AS frontend
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Build the static file server.
FROM golang:1.23-alpine AS backend
WORKDIR /src
COPY backend/ ./
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /server .

# Minimal runtime image.
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=backend /server /server
COPY --from=frontend /app/dist /dist
ENV STATIC_DIR=/dist
EXPOSE 8080
ENTRYPOINT ["/server"]
