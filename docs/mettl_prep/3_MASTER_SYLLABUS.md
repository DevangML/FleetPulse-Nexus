# Accenture Custom Software Engineer (ReactJS) - Master Syllabus

This is the exhaustive, validated master blueprint for the entire evaluation pipeline. Every topic, sub-topic, blind spot trap, and coding variant is mapped here.

---

## PHASE 1: The Mercer Mettl Online Assessment (60 Mins)
*Structure: 20 MCQs + 1 Hands-On Automated Coding Challenge. Graded by headless compilers.*

### A. The 20 MCQ Theoretical Domains

**Domain 1: React 19 & Server Components (New Syllabus Blind Spot)**
*   **Server vs Client Components:** Compilation paths. Missing `"use client"` when using hooks causes fatal build errors.
*   **Rendering Engines:** `createRoot` (CSR) vs `hydrateRoot` (SSR). Hydration mismatches cause slow layout fallbacks.
*   **React 19 Actions:** Native state integration in `<form action={asyncAction}>`. React handles pending states automatically.
*   **React 19 Form Hooks (`useFormStatus`):** Must be invoked inside a *child* component of the form, not the parent itself.
*   **Pure Components:** `React.PureComponent` relies on shallow `Object.is` reference checks. Deep property mutations skip re-renders.

**Domain 2: React Tools & Build Ecosystem**
*   **Flux vs Redux:** Flux uses multiple stores and a centralized Dispatcher. Redux uses a single immutable store and no Dispatcher.
*   **Redux Slice Purity:** Reducers cannot contain side-effects (e.g., `Date.now()`, `Math.random()`, async fetches).
*   **Webpack & Babel:** Browsers crash on JSX syntax. `babel-loader` is required to transpile JSX into `React.createElement()`.

**Domain 3: Core JS "Falsy" Rendering Traps**
*   **The Falsy `0` DOM Bleeding:** `{array.length && <Component />}` evaluates to `0` when empty, rendering a literal '0' string. **Fix:** `{array.length > 0 && <Component />}`.
*   **Pass-by-Reference Mutation:** Mutating state via `const copy = state; copy.push(); setState(copy)` fails to re-render because the memory reference remains identical.

### B. The Automated Coding Simulator Variants
*Constraint: No npm packages. Strictly graded by Puppeteer DOM selectors.*

*   **Variant 1 (The Golden Standard): The Debounced Auto-Filter Grid.**
    *   *Core:* `500ms` setTimeout in a `useEffect`, clearing the timer on keystrokes. Strict HTML IDs (`id="search-input"`).
*   **Variant 2: React 19 Form Submission.**
    *   *Core:* Utilizing `<form action={...}>` over synthetic `onSubmit` events.
*   **Variant 3: Pure Array Mutations.**
    *   *Core:* Adding, removing, and toggling list items using strict `.filter()` and `.map()` immutability.
*   **Variant 4: Pagination Slice Math.**
    *   *Core:* Calculating `Math.ceil()` for total pages and slicing a large mock array based on `currentPage`.

---

## PHASE 2: Technical Round 1 (Live JS/React Machine Coding)
*Structure: 45-60 Mins. Screen-share coding with a Senior Engineer.*

### A. The 20-Minute "No React" Javascript Ban
*The Danger: The interviewer bans React to expose raw JS logic.*

*   **Polyfill 1:** `Promise.myAll` (Asynchronous resolution tracking array).
*   **Polyfill 2:** `Array.prototype.reduce` (Custom accumulator mapping).
*   **DSA Challenge:** Flatten a Nested Array via Recursion (e.g., `[1, [2, [3, 4]]]`).
*   **Async Logic Tracing:** Predicting console outputs across the Event Loop (Macro-tasks vs Micro-tasks).
*   **Closures:** Writing a higher-order memoization utility that caches function outputs based on input arguments.

### B. High-Density UI Coding Challenges
*The Danger: Evaluates state discipline, edge-case validation, and semantic markup.*

*   **UI Variant 1: Infinite Nested Comment System (Reddit-Style)**
    *   *Focus:* Component recursion to render infinitely deep nodes, and safe immutable updates to deeply nested state objects.
*   **UI Variant 2: HTML5 Drag-and-Drop Kanban Board**
    *   *Focus:* Tracking multi-dimensional arrays across lists using native `onDragStart`, `onDragOver`, and `onDrop` without third-party libraries.
*   **UI Variant 3: Tokenizer Combobox (Tag Input)**
    *   *Focus:* Keyboard accessibility tracking (Arrow up/down, Enter, Escape) and tag deletions via the backspace key.

---

## PHASE 3: Technical Round 2 (Architecture & System Design)
*Structure: 45-60 Mins. Discussion led by an Engineering Delivery Lead/Architect.*

### A. Advanced State Management & Data Streaming
*   **State Split Decisions:** Why to use Redux Toolkit or Zustand vs Context API for high-frequency renders.
*   **Server State Optimization:** Using RTK Query / TanStack Query to minimize network polling, enforce stale-time boundaries, and trigger automatic cache invalidation.

### B. Enterprise Network Security & Resiliency
*   **The Axios Interceptor JWT Token Queue:**
    *   *Architecture:* Catching a 401 Unauthorized error.
    *   *Mechanism:* Pausing all outgoing network requests, holding them in a Promise array queue, executing the Refresh Token API, updating the Authorization headers globally, and replaying the failed queue transparently.

### C. Web Performance Remediation
*   **Lighthouse Metric Diagnostics:**
    *   *Route-based Code Splitting:* Implementing `React.lazy()` + `<Suspense>`.
    *   *Tree Shaking:* Utilizing Vite/Webpack chunk analyzers to drop unused exports and eliminate dead code.
    *   *DOM Windowing / Virtualization:* Handling 10,000+ row data grids by calculating `scrollTop` tracking variables to only render visible rows, preventing browser memory crashes.
