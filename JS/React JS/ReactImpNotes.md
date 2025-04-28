# React Hooks – Practical Notes

---

## ✅ useState
- When you have **simple, isolated pieces of state** like input values, toggles, counters, etc.
- Best for **basic** state management.
- **Triggers re-render** when state changes.
- ➔ Use when each piece of state is independent and easy to update.

---

## ✅ useReducer
- When you have **multiple actions** (like update, reset, delete, increment, etc.) on **the same state**.
- Instead of writing multiple `setState()` calls or multiple small functions ➔ use a single **reducer** function to handle all changes.
- The reducer acts like a **central controller 🧠** for your state updates.
- ➔ Use when state **logic is complex** or when **multiple operations** are needed.
- We can also bundle multiple states in a single object of the reducer , So if u have muliple state variables and has multiple operations to be done then also this reducer will help us to manage the things in a claer way.

EX:
- const [state, dispatch] = useReducer(reducer, {count:0, step:0})
- const [count, step] = state;

---

## ✅ useRef
- Used for **two main purposes**:
  1. **Referencing DOM elements** (e.g., to focus an input, scroll to a div, etc.) ➔ like `inputRef.current.focus()`
  2. **Storing mutable values** across renders without triggering re-renders ➔ like timers, counters, previous values, etc.
- ➔ Think of `useRef` as a **stable box 📦** to keep values between renders.

---

## ✅ useMemo
- Memorizes the **result of a calculation** and **only recalculates when dependencies change**.
- ➔ Prevents **unnecessary re-computations** for heavy/expensive operations.
- Example: filtering large lists, complex calculations.
- ➔ Improves **performance optimization** 🚀.

---

## ✅ useCallback
- Memorizes a **function** so that the function reference **doesn't change** unless its dependencies change.
- ➔ Prevents **unnecessary re-renders**, especially when passing functions to child components.
- ➔ Good for **performance optimization** with props and memoized child components.

---

## ✅ Custom Hooks
- Reusable pieces of logic made with hooks.
- **Must contain at least one React hook** (`useState`, `useEffect`, etc.) inside it.
- ➔ Used to **clean code**, **avoid repetition**, and **encapsulate logic**.
- Naming rule ➔ **Always start with `use`** (e.g., `useFetch`, `useAuth`, `useForm`).
- Custom hooks make your app **modular** and **organized** ✨.

---

# 📋 Quick Summary Table

| Hook          | When to Use                                    | Notes                                  |
| :------------ | :--------------------------------------------- | :------------------------------------- |
| `useState`    | Simple, independent state                      | Basic and most common                  |
| `useReducer`  | Complex state with multiple actions            | Centralizes logic                      |
| `useRef`      | Refer DOM or store mutable value without rerender | Like a stable box 📦                |
| `useMemo`     | Memorize heavy calculation result              | Performance boost 🚀                   |
| `useCallback` | Memorize function references                   | Avoids unnecessary re-renders          |
| `Custom Hook` | Reusable logic made from hooks                 | Must use at least one hook inside      |

---

# 🧠 Golden Rules

> If you are **repeating state logic** ➔ extract a **Custom Hook**.

> If your state **grows complex** ➔ switch to **useReducer**.

> If your **functions** or **computations** slow the app ➔ optimize with **useMemo** and **useCallback**.
