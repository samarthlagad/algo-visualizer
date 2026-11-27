<div align="center">

# ⚡ AlgoVisualizer

**An interactive step-by-step Data Structures & Algorithms visualizer built with React, Vite, and Tailwind CSS.**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)

[Features](#-features) • [Roadmap](#-learning--build-roadmap) • [Architecture](#-architecture) • [Quick Start](#-quick-start)

</div>

---

<!--
## 🖼️ Preview

> **Tip:** Capture a screenshot of your **Linked List** or **Sorting** tab, save it to `public/screenshot.png`, and it will render automatically below.

![AlgoVisualizer Preview](./public/screenshot.png)
-->
---

## ✨ Features

- **Frame-by-Frame Replay Engine (`usePlayer`)** — Play, pause, step forward/backward, reset, and scrub execution speed dynamically across every algorithm and data structure.
- **Immutable State Snapshots** — Every algorithm and pointer operation emits pure, self-contained step snapshots (including deep-cloned `{ value, next }` node chains), making backward stepping completely bug-free.
- **Live Complexity Reference** — Contextual time (Best / Average / Worst) and space complexity panels update alongside every selected algorithm or data structure operation.
- **Edge-Case Safe Controls** — Built-in handling and visual narration for empty lists, out-of-bounds indices, missing search targets, stack/queue overflow & underflow, and pre-sorted array constraints.

---

## 🗺️ Learning & Build Roadmap

- [x] **Sorting Visualizers** — Bubble, Selection, Insertion, Merge, and Quick Sort
- [x] **Searching Visualizers** — Linear Search and Binary Search (with sorted-array enforcement)
- [x] **Linear Data Structures** — Stack (`LIFO`) and Queue (`FIFO`) with overflow/underflow guards
- [x] **Singly Linked List** — Real `{ value, next }` nodes with Insert (Head, Tail, Index), Delete (Value, Index), Search, and Traversal
- [ ] **Recursion & Call Stack** — Visual stack frames for Factorial, Fibonacci, and Merge Sort recursion trees
- [ ] **Trees** — Binary Search Tree (Insert, Search, Delete) and DFS Traversals (Inorder, Preorder, Postorder)
- [ ] **Graphs** — Adjacency list/grid pathfinding with BFS and DFS

---

## 📚 Interactive Algorithm & Data Structure Reference

Click any section below to inspect supported operations and time/space complexities:

<details>
<summary><b>📊 Sorting Algorithms (5 Implemented)</b></summary>
<br />

| Algorithm | Best | Average | Worst | Space | Key Idea |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Bubble Sort** | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | Repeatedly swaps adjacent out-of-order elements |
| **Selection Sort** | `O(n²)` | `O(n²)` | `O(n²)` | `O(1)` | Selects the minimum unsorted element each pass |
| **Insertion Sort** | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | Inserts each element into its sorted prefix |
| **Merge Sort** | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | Divide-and-conquer recursive splitting and merging |
| **Quick Sort** | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)` | Partitions elements around a pivot element |

</details>

<details>
<summary><b>🔍 Searching Algorithms (2 Implemented)</b></summary>
<br />

| Algorithm | Best | Average | Worst | Space | Prerequisite |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Linear Search** | `O(1)` | `O(n)` | `O(n)` | `O(1)` | Works on unsorted or sorted arrays |
| **Binary Search** | `O(1)` | `O(log n)` | `O(log n)` | `O(1)` | Requires a sorted array (`low + ⌊(high - low) / 2⌋`) |

</details>

<details>
<summary><b>📦 Stack & Queue (Linear Structures)</b></summary>
<br />

| Structure | Principle | Primary Operations | Time | Space |
| :--- | :---: | :--- | :---: | :---: |
| **Stack** | `LIFO` | `push(val)`, `pop()`, `peek()` | `O(1)` | `O(n)` |
| **Queue** | `FIFO` | `enqueue(val)`, `dequeue()`, `front()` | `O(1)` | `O(n)` |

</details>

<details open>
<summary><b>🔗 Singly Linked List (Pointer-Based Structure)</b></summary>
<br />

Backed by real `{ value, next }` node chains cloned per step (`makeStep`) and projected to UI arrays via `toArray(head)`.

| Operation | Complexity | Visual Behavior |
| :--- | :---: | :--- |
| **Insert at Head** | `O(1)` | Creates node and links directly to `HEAD` |
| **Insert at Tail** | `O(n)` | Walks pointers from `HEAD` until `next === NULL` |
| **Insert at Index `i`** | `O(n)` | Traverses to predecessor `i - 1` and rewires `next` |
| **Delete by Value** | `O(n)` | Scans for matching value and bypasses target node |
| **Delete at Index `i`** | `O(n)` | Traverses to `i - 1` and unlinks node `i` |
| **Search / Traverse** | `O(n)` | Highlights each visited node sequentially until `NULL` |

</details>

---

## 🏗️ Architecture

<details>
<summary><b>Click to expand folder structure & design principles</b></summary>
<br />

```text
src/
├── algorithms/
│   ├── sorting/          # Pure step-generator functions for sorting
│   └── searching/        # Pure step-generator functions for searching
├── dataStructures/
│   ├── stack.js          # Immutable stack state transitions
│   ├── queue.js          # Immutable queue state transitions
│   └── linkedList.js     # Real { value, next } nodes + step recorder
├── components/           # Stateless views (Bars, LinkedListView, PlayerControls, ComplexityPanel)
├── hooks/
│   └── usePlayer.js      # Pure step-index playback state machine
├── data/
│   └── complexity.js     # Big-O metadata & descriptions
└── pages/                # Route-level workspaces (Sorting, Searching, Stack & Queue, Linked List)
