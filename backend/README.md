# Eillish Flask Backend

High-performance Python Flask REST API server for Eillish.

## Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run Flask API server (starts on http://localhost:8000)
python app.py
```

## Features

- **Pure Flask Architecture**: Lightweight, fast, and completely decoupled from Next.js.
- **Full CORS Support**: Preconfigured for React frontends running on `http://localhost:5173` and `http://localhost:3000`.
- **JWT Authentication**: 256-bit signed tokens with multi-role access control (architect, admin, engineer).
- **RAG Neural Search**: Semantic question-answering with line-level evidence citations.
- **Repository Management**: Connect and synchronize knowledge bases.

## Available Endpoints

- `GET /health` — Liveness health probe
- `GET /api/v1/health` — Knowledge API readiness probe
- `POST /api/v1/auth/login` — Authenticate workspace user
- `POST /api/v1/auth/signup` — Register new workspace user
- `GET /api/v1/auth/me` — Retrieve current user profile
- `GET /api/v1/knowledge/stats` — Aggregated indexing and chunk stats
- `GET /api/v1/knowledge/growth` — Knowledge timeline growth data
- `GET /api/v1/knowledge` — Filterable list of indexed documents
- `GET /api/v1/knowledge/<id>` — Detailed document view with content
- `GET /api/v1/repositories` — List connected repositories
- `POST /api/v1/repositories/connect` — Connect a new repository
- `POST /api/v1/repositories/<id>/sync` — Synchronize repository
- `POST /api/v1/search` — Neural RAG search with evidence citations
- `GET /api/v1/activity` — Real-time activity feed
- `GET /api/v1/analytics/metrics` — Retrieval latency and usage metrics
- `GET /api/v1/settings` — User preferences and configuration
- `PUT /api/v1/settings` — Update preferences
- `POST /api/v1/feedback` — Submit citation/answer feedback
