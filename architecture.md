# 🧠 Architecture Overview

This document explains how the **Collaborative Canvas** application is structured and how real-time synchronization works.

---

## 🧩 System Components

### 1. **Frontend (Client)**
- Built with HTML5 Canvas and Vanilla JavaScript.
- Handles drawing logic and user interactions.
- Sends drawing data to the server over WebSocket.

### 2. **Backend (Server)**
- Built with **Node.js + Express** and **WebSocket (ws)**.
- Broadcasts drawing events to all connected clients.
- Manages connected users and message synchronization.

---

## 🔄 Data Flow

```text
User draws on canvas → Client emits drawing data → Server receives event →
Server broadcasts to all clients → Clients render the strokes in real-time
