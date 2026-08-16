# Mercer Mettl MCQ Master Guide (Corrected & Expanded)

**BRUTAL REALITY CHECK APPLIED**: The evaluation is 1-3 years intermediate. Exotic React 19 RSC features will appear, but **Core Hooks, Class Components, and React Router** will dominate the weighting.

## Domain 1: React Core Hooks & Lifecycles (Heaviest Weight)
1. **The Hook Dependency & Cleanup Trap**
   * **The Concept**: `useEffect` cleanup execution and stale closures.
   * **The Trap**: An interval is set in `useEffect` without a dependency array or cleanup function, causing memory leaks and geometric timer acceleration.
   * **The Answer**: Return a `clearTimeout`/`clearInterval` function. If dependencies are empty `[]`, it runs once; if omitted, it runs every render.
2. **`useMemo` vs `useCallback`**
   * **The Concept**: Reference stability across renders.
   * **The Answer**: `useMemo` caches the *result* of a calculation. `useCallback` caches the *function reference* itself (crucial for passing to `React.memo` children).
3. **Class Component Equivalents (Guaranteed Recycled Questions)**
   * **The Concept**: Legacy bank questions on class lifecycles.
   * **The Trap**: What is the hook equivalent of `componentWillUnmount`?
   * **The Answer**: The return function inside `useEffect`.
   * **The Trap**: `setState` batching in classes. Calling `this.setState` twice synchronously with the same object key.
   * **The Answer**: Only the last call applies unless the functional updater `this.setState(prev => ...)` is used.
4. **React 18/19 Hydration Mismatch (Correction)**
   * **The Concept**: Server HTML doesn't match client HTML.
   * **The Answer**: React 18/19 **discards the server HTML for that subtree**, re-renders it entirely on the client, and logs a mismatch error. (It does *not* do a slow layout fallback).
5. **The "New Hook" (React 19)**
   * **The Concept**: Resolving promises in render.
   * **The Answer**: `use` (can be called inside conditionals/loops), `useOptimistic` (optimistic UI updates), `useActionState` (managing `<form action>` pending/error states).

## Domain 2: React Router (v6.4+ / v7)
1. **Nested Routes & Layouts**
   * **The Concept**: Shared UI wrappers.
   * **The Trap**: A parent route has a navigation bar, but child routes don't render.
   * **The Answer**: The parent component must render `<Outlet />` where the children should appear.
2. **`Link` vs `NavLink`**
   * **The Answer**: `NavLink` automatically provides an `isActive` boolean/class to style the active route. `Link` does not.
3. **Data Loaders & Actions**
   * **The Answer**: `loader` runs before the route renders to fetch data. `action` handles form submissions and data mutations.

## Domain 3: Core JavaScript DOM & Execution
1. **Hoisting & TDZ (Temporal Dead Zone)**
   * **The Trap**: Accessing a `let` or `const` variable before its declaration.
   * **The Answer**: Throws a ReferenceError (TDZ), unlike `var` which returns `undefined`.
2. **`this` Binding & Arrow Functions**
   * **The Trap**: A class method passed as a callback loses its context.
   * **The Answer**: Must use `.bind(this)` in the constructor, or declare the method as an arrow function (which inherits lexical `this`).
3. **Shallow vs Deep Copy**
   * **The Trap**: Modifying a nested object property after `const copy = { ...obj }`.
   * **The Answer**: The original object mutates because spread `...` is shallow. Use `structuredClone(obj)` for deep copies.

## Domain 4: The 0 Rendering Trap & Reconciliation
1. **The Falsy `0` Bleed**
   * **The Trap**: `{items.length && <List />}` when empty.
   * **The Answer**: Renders a literal `0`. Use `> 0`.
2. **Index as Key Anti-Pattern**
   * **The Trap**: Using `key={index}` when the list order can change (e.g. sorting, deleting).
   * **The Answer**: React uses keys to track DOM nodes. If an item is deleted from the start, all indexes shift, causing React to mutate the wrong DOM elements instead of unmounting.
