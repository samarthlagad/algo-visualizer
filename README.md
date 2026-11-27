 <div align="center">

# ⚡ AlgoVisualizer

### Interactive Data Structures & Algorithms Visualizer

**Understand algorithms. Visualize every step. Master DSA.**

An interactive, step-by-step visualization platform built with **React, Vite, and Tailwind CSS**, designed to make learning Data Structures and Algorithms intuitive through real-time animations, visual explanations, and algorithm playback controls.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)

[Features](#-features) • [Roadmap](#-learning--development-roadmap) • [Algorithms](#-algorithm--data-structure-reference) • [Architecture](#-project-architecture) • [Quick Start](#-quick-start)

</div>

---

## 📌 Overview

AlgoVisualizer is an educational web application that demonstrates how fundamental algorithms and data structures work internally.

Instead of simply displaying the final output, it breaks down operations into individual steps, allowing users to observe changes in data, understand algorithm behavior, and explore time and space complexity.

Whether you are learning sorting algorithms, understanding pointers in linked lists, or exploring stack and queue operations, AlgoVisualizer provides an interactive environment for learning DSA.

## ✨ Features

- **🎬 Step-by-Step Visualization** — Observe algorithm execution through individual frames rather than only viewing the final result.
- **⏯️ Interactive Playback Controls** — Play, pause, move forward, move backward, reset, and dynamically adjust animation speed.
- **🔄 Immutable State Snapshots** — Each operation generates independent state snapshots, enabling deterministic backward navigation and replay.
- **📊 Live Complexity Analysis** — View Best, Average, and Worst-case time complexity along with auxiliary space complexity.
- **🛡️ Edge-Case Handling** — Handles empty data structures, invalid indices, missing search elements, stack overflow, queue underflow, and other boundary conditions.
- **🔗 Pointer-Level Linked List Visualization** — Visualizes actual `{ value, next }` node connections and pointer changes during operations.
- **📖 Educational Narration** — Understand what happens during each step through contextual explanations.

---

## 🗺️ Learning & Development Roadmap

The project is being developed incrementally, starting with fundamental algorithms and progressing towards more advanced data structures.

### Implemented

- [x] **Sorting Algorithms**
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort

- [x] **Searching Algorithms**
  - Linear Search
  - Binary Search
  - Sorted-array enforcement for Binary Search

- [x] **Linear Data Structures**
  - Stack (LIFO)
  - Queue (FIFO)
  - Capacity management
  - Overflow and underflow handling

- [x] **Singly Linked List**
  - Insert at Head, Tail, and Index
  - Delete by Value and Index
  - Search
  - Traversal

### Planned

- [ ] **Recursion & Call Stack**
  - Factorial
  - Fibonacci
  - Recursive call-stack visualization
  - Merge Sort recursion tree

- [ ] **Trees**
  - Binary Search Tree
  - Insert, Search, and Delete
  - Inorder, Preorder, and Postorder Traversals

- [ ] **Graphs**
  - Graph representation
  - Adjacency List and Adjacency Matrix
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)

---

## 📚 Algorithm & Data Structure Reference

The following tables summarize the implemented algorithms, their complexities, and their fundamental working principles.

<details>
<summary><b>📊 Sorting Algorithms</b> — 5 Implemented</summary>

| Algorithm | Best | Average | Worst | Space | Key Idea |
|:---|:---:|:---:|:---:|:---:|:---|
| **Bubble Sort** | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | Repeatedly swaps adjacent elements |
| **Selection Sort** | `O(n²)` | `O(n²)` | `O(n²)` | `O(1)` | Selects the minimum element in each pass |
| **Insertion Sort** | `O(n)` | `O(n²)` | `O(n²)` | `O(1)` | Inserts elements into their sorted positions |
| **Merge Sort** | `O(n log n)` | `O(n log n)` | `O(n log n)` | `O(n)` | Divides, sorts, and merges subarrays |
| **Quick Sort** | `O(n log n)` | `O(n log n)` | `O(n²)` | `O(log n)`* | Partitions elements around a pivot |

</details>

<details>
<summary><b>🔍 Searching Algorithms</b> — 2 Implemented</summary>

| Algorithm | Best | Average | Worst | Space | Prerequisite |
|:---|:---:|:---:|:---:|:---:|:---|
| **Linear Search** | `O(1)` | `O(n)` | `O(n)` | `O(1)` | No sorting required |
| **Binary Search** | `O(1)` | `O(log n)` | `O(log n)` | `O(1)` | Requires sorted array |

</details>

<details>
<summary><b>📦 Stack & Queue</b> — Linear Data Structures</summary>

| Structure | Principle | Primary Operations | Time | Space |
|:---|:---:|:---|:---:|:---:|
| **Stack** | LIFO | `push()`, `pop()`, `peek()` | `O(1)` | `O(n)` |
| **Queue** | FIFO | `enqueue()`, `dequeue()`, `front()` | `O(1)` | `O(n)` |

</details>

<details open>
<summary><b>🔗 Singly Linked List</b> — Pointer-Based Data Structure</summary>

The linked list implementation uses actual `{ value, next }` node objects. Each operation records immutable snapshots using `makeStep`, while `toArray(head)` converts the linked structure into a format suitable for visualization.

| Operation | Time Complexity | Visual Behavior |
|:---|:---:|:---|
| **Insert at Head** | `O(1)` | Creates a node and updates the HEAD pointer |
| **Insert at Tail** | `O(n)` | Traverses to the last node and updates its `next` pointer |
| **Insert at Index** | `O(n)` | Traverses to the predecessor and rewires pointers |
| **Delete by Value** | `O(n)` | Searches for the target and bypasses its node |
| **Delete at Index** | `O(n)` | Traverses to the predecessor and unlinks the target |
| **Search Value** | `O(n)` | Sequentially checks nodes until a match is found |
| **Traverse List** | `O(n)` | Visits nodes from HEAD to NULL |

</details>

> **Note:** Complexity values represent standard algorithmic analysis. Quick Sort's space complexity is typically `O(log n)` on average, but can reach `O(n)` in the worst case due to recursion depth. Actual implementation details may affect these bounds.

---

## 🏗️ Project Architecture

The application follows a modular architecture that separates algorithm logic, data structure operations, UI components, playback state management, and application pages.

<details open>
<summary><b>📁 Project Folder Structure</b></summary>

```text
algo-visualizer/
│
├── public/
│
├── src/
│   │
│   ├── algorithms/
│   │   ├── sorting/
│   │   │   ├── bubbleSort.js
│   │   │   ├── selectionSort.js
│   │   │   ├── insertionSort.js
│   │   │   ├── mergeSort.js
│   │   │   ├── quickSort.js
│   │   │   └── index.js
│   │   │
│   │   └── searching/
│   │       ├── linearSearch.js
│   │       ├── binarySearch.js
│   │       └── index.js
│   │
│   ├── dataStructures/
│   │   ├── stack.js
│   │   ├── queue.js
│   │   └── linkedList.js
│   │
│   ├── components/
│   │
│   ├── hooks/
│   │   └── usePlayer.js
│   │
│   ├── data/
│   │   └── complexity.js
│   │
│   ├── utils/
│   │   └── array.js
│   │
│   ├── pages/
│   │
│   └── App.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

</details>

### Architecture Highlights

| Module | Responsibility |
|:---|:---|
| `algorithms/` | Sorting and searching algorithm implementations |
| `dataStructures/` | Stack, Queue, and Linked List operations |
| `components/` | Reusable visualization and playback UI |
| `hooks/` | Playback state and frame navigation |
| `data/` | Algorithm complexity metadata |
| `utils/` | Helper functions and array generation |
| `pages/` | Individual algorithm and data structure workspaces |
| `App.jsx` | Main application and tab navigation |

### Design Principles

- **Separation of Concerns:** Algorithm logic remains independent of UI rendering.
- **Reusability:** Shared components and hooks reduce code duplication.
- **Predictable State:** Immutable snapshots support reliable playback.
- **Scalability:** Modular organization makes adding new algorithms and data structures easier.

---

## 🚀 Quick Start

Follow these steps to run AlgoVisualizer locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (included with Node.js)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/samarthlagad/algo-visualizer.git
```

### 2. Navigate to the Project Directory

```bash
cd algo-visualizer
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local URL displayed in your terminal, typically:

```text
http://localhost:5173/
```

<badge color="success">You're ready to explore AlgoVisualizer!</badge>

### Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build |
| `npm run preview` | Previews the production build locally |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| **React 18+** | Component-based user interface |
| **Vite 5+** | Development server and build tooling |
| **Tailwind CSS 3+** | Utility-first styling |
| **JavaScript (ES6+)** | Algorithm and application logic |
| **React Hooks** | State and playback management |
| **Git & GitHub** | Version control and collaboration |

---

## 🎯 Project Objectives

- Make Data Structures and Algorithms easier to understand through visualization.
- Demonstrate the internal execution of algorithms step by step.
- Connect theoretical time and space complexity with practical algorithm behavior.
- Provide an interactive environment for students and DSA learners.
- Build a scalable platform that can accommodate more advanced algorithms and data structures.

---

## 🔮 Future Scope

Potential enhancements for future versions include:

- Doubly Linked List and Circular Linked List visualizations.
- Advanced tree structures such as AVL Trees and Heaps.
- Graph algorithms including Dijkstra's and Kruskal's algorithms.
- Interactive code execution alongside visualizations.
- Custom input and array generation.
- Comparison mode for running two algorithms side by side.
- Responsive improvements for mobile and tablet devices.

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Test your implementation.
5. Commit and push your changes.
6. Open a Pull Request.

```bash
git checkout -b feature/your-feature-name
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.

---

## 👨‍💻 Author

**Samarth Lagad**

GitHub: [@samarthlagad](https://github.com/samarthlagad)

---

<div align="center">

**⭐ If you find AlgoVisualizer useful, consider giving the repository a star!**

*Built to make learning Data Structures & Algorithms more visual, interactive, and intuitive.*

</div>
