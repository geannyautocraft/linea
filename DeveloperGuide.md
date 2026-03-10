# Linea Developer Guide

This document defines the architecture, conventions, and development rules for the Linea project.

The goal is to ensure the codebase remains **clean, simple, and scalable**.

---

# Project Goal

Linea is a minimal text editor focused on fast note taking.

The application should always prioritize:

* performance
* simplicity
* clean architecture
* minimal dependencies

Avoid unnecessary complexity.

---

# MVP Scope

The first version of Linea must implement:

1. Create notes
2. Edit notes
3. Delete notes
4. Auto-save notes
5. Sidebar listing notes
6. Select active note
7. Persist notes locally

Notes must persist even after refreshing the browser.

---

# Architecture

The project should follow a simple structure.

```
apps/web

src
  components
  features
  hooks
  services
  types
  utils
```

---

# Core Data Model

Note structure:

```
Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}
```

Rules:

* title is derived from the first line of the content
* content is plain text for MVP
* timestamps are stored as unix milliseconds

---

# Storage

For MVP use:

LocalStorage

Later versions may migrate to:

IndexedDB or backend sync.

Create a storage service:

```
noteStorage.ts
```

Responsibilities:

* save notes
* load notes
* update notes
* delete notes

---

# Editor

The editor must:

* support plain text
* auto-save after changes
* update the note list automatically
* focus on writing experience

For MVP a **textarea-based editor is acceptable**.

Future versions may use:

* TipTap
* ProseMirror

---

# UI Layout

The UI should contain two main areas.

Sidebar

* list of notes
* create new note
* select note

Editor

* main text editing area
* auto-save behavior

Layout example:

```
+----------------+----------------------+
|                |                      |
|   Sidebar      |       Editor         |
|                |                      |
|                |                      |
+----------------+----------------------+
```

---

# UX Rules

* The editor must feel instant
* Saving should never require manual action
* Creating notes should take one click
* Switching notes must be fast

Avoid popups or complex UI.

---

# Code Style

Use:

* TypeScript
* functional React components
* simple hooks
* minimal dependencies

Avoid:

* heavy UI frameworks
* unnecessary abstractions
* complex state managers

Prefer:

* React state
* simple custom hooks

---

# Performance

Important rules:

* avoid unnecessary re-renders
* debounce auto-save
* keep components small

---

# Future Architecture

The system should later support:

* cloud sync
* authentication
* offline-first storage
* mobile apps

Do not couple the editor directly to storage.

Use service layers.

---

# AI Development Notes

When generating code for this project:

* keep implementations simple
* prefer readable code
* avoid premature optimization
* do not introduce unnecessary libraries
* prioritize maintainability

If unsure between complexity and simplicity, choose simplicity.

---

# Version

Current version:

V1 — MVP Development
