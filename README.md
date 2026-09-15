# Eillish

> **Your knowledge, understood.**

**Eillish** is an AI-powered personal knowledge system that turns your notes, documentation, and code into a structured, searchable knowledge base.

Instead of simply storing files or providing a basic “chat with your documents” interface, Eillish continuously **ingests, understands, indexes, and connects your knowledge**—then uses retrieval-augmented generation (RAG) to answer questions with evidence from the original sources.

## What Eillish Does

* 📚 **Ingests knowledge** from Markdown, text, and code files
* 🧠 **Understands content** through summaries, tags, metadata, and embeddings
* 🔎 **Searches semantically** instead of relying only on exact keywords
* 🤖 **Answers questions with RAG** using retrieved knowledge as context
* 🔗 **Provides citations** back to the exact source behind an answer
* 🔄 **Syncs with GitHub** when knowledge changes
* 📊 **Tracks interactions and feedback** to evaluate answer quality
* ⚙️ **Automates knowledge processing** through background agent workflows

## The Idea

Most document-based AI applications follow a simple pattern:

```text
Upload → Embed → Chat
```

Eillish aims to go further:

```text
                  ┌──────────────┐
                  │ Your Knowledge│
                  └──────┬───────┘
                         ↓
                    Understand
                         ↓
                     Structure
                         ↓
                      Index
                         ↓
                  Connect Knowledge
                         ↓
                     Retrieve
                         ↓
                   Reason with AI
                         ↓
                  Answer + Evidence
```

The objective is to build a system where AI isn't simply generating answers—it is **working on top of an organized knowledge layer that can be searched, evaluated, and continuously maintained.**

## V-1 Scope

The initial version focuses on:

* GitHub-based knowledge ingestion
* Document processing and chunking
* PostgreSQL + pgvector storage
* Semantic and keyword search
* RAG-based question answering
* Source citations
* Automatic summaries and tags
* User feedback
* Agent activity tracking
* Knowledge and retrieval analytics

The architecture is intentionally designed to evolve. Features and implementation decisions may change as the system is tested and evaluated.

## Tech Stack

**Frontend**

* React
* TypeScript

**Backend**

* Python
* FastAPI

**Data**

* PostgreSQL
* pgvector

**AI / ML**

* Embedding models
* Large Language Models
* Retrieval-Augmented Generation
* Reranking

**Infrastructure**

* GitHub
* GitHub Actions
* Docker
* Docker Compose

## Project Status

**Version:** `V-1`
**Status:** 🚧 In Development

Eillish is being built incrementally, with the initial focus on establishing a reliable data pipeline, retrieval system, backend architecture, and usable frontend before expanding into more advanced agent capabilities.
