# React Essentials: Props, Prop Drilling, and Basic App

## Introduction to React
React is a powerful JavaScript library for building dynamic user interfaces. It is component-based, allowing developers to create reusable UI elements. 

### Key Concepts
- **Components:** Reusable building blocks of UI.
- **State:** Internal data management for components.
- **Props (Properties):** Data passed from parent to child components.
- **Prop Drilling:** The process of passing props through multiple layers of components.

---

## Props in React
**Props** (short for properties) allow data to be passed from a parent component to a child component. Props are read-only and cannot be modified by the child component.

### Example:
```jsx
import React from 'react';

function Greeting(props) {
    return <h1>Hello, {props.name}!</h1>;
}

function App() {
    return <Greeting name="Alice" />;
}

export default App;
```

### Explanation:
- `Greeting` is a child component that receives `name` as a prop.
- The `App` component passes the value `"Alice"` to the `Greeting` component as a prop.

---

## Prop Drilling in React
**Prop Drilling** occurs when you need to pass props down multiple component layers, which can make the code harder to manage.

### Example:
```jsx
import React from 'react';

function Grandchild({ name }) {
    return <h3>Grandchild says hi to {name}</h3>;
}

function Child({ name }) {
    return <Grandchild name={name} />;
}

function Parent() {
    const userName = "Bob";
    return <Child name={userName} />;
}

function App() {
    return <Parent />;
}

export default App;
```

### Explanation:
- The `Parent` component has `userName`, which is passed as a prop down to `Child`, and then again to `Grandchild`.
- This is called **prop drilling** — data is passed down multiple levels, which can become cumbersome in larger apps.

---

## Building a CRUD Task Manager App with Props and Prop Drilling
We'll create a **Task Manager App** with these features:
- **Create** new tasks
- **Read** (display) tasks
- **Update** existing tasks
- **Delete** tasks

### Step 1: App Structure
```
/src
  /components
    - TaskList.js
    - TaskItem.js
    - AddTask.js
  App.js
  index.js
```

### Step 2: Code Implementation

**`AddTask.js`**
```jsx
import React, { useState } from 'react';

function AddTask({ onAddTask }) {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (task.trim()) {
            onAddTask(task);
            setTask("");
        }
    };

    return (
        <div>
            <input 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Add a new task"
            />
            <button onClick={handleAdd}>Add Task</button>
        </div>
    );
}

export default AddTask;
```

**`TaskItem.js`**
```jsx
import React, { useState } from 'react';

function TaskItem({ task, onComplete, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleUpdate = () => {
        onUpdate(task, updatedTask);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input 
                        value={updatedTask} 
                        onChange={(e) => setUpdatedTask(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <span>{task}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => onComplete(task)}>Complete</button>
                    <button onClick={() => onDelete(task)}>Delete</button>
                </>
            )}
        </div>
    );
}

export default TaskItem;
```

**`TaskList.js`**
```jsx
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onComplete, onUpdate, onDelete }) {
    return (
        <div>
            {tasks.map((task, index) => (
                <TaskItem 
                    key={index} 
                    task={task} 
                    onComplete={onComplete} 
                    onUpdate={onUpdate} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
}

export default TaskList;
```

**`App.js`**
```jsx
import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => setTasks([...tasks, task]);

    const completeTask = (completedTask) => {
        setTasks(tasks.filter(task => task !== completedTask));
    };

    const updateTask = (oldTask, updatedTask) => {
        setTasks(tasks.map(task => task === oldTask ? updatedTask : task));
    };

    const deleteTask = (taskToDelete) => {
        setTasks(tasks.filter(task => task !== taskToDelete));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <AddTask onAddTask={addTask} />
            <TaskList 
                tasks={tasks} 
                onComplete={completeTask} 
                onUpdate={updateTask} 
                onDelete={deleteTask} 
            />
        </div>
    );
}

export default App;
```

---

### Step 3: Key Takeaways
✅ **Props** efficiently pass data from parent to child components.  
✅ **Prop Drilling** can become complex in deeply nested components. Using context or state management tools can help mitigate this.  
✅ Building small, reusable components is key to efficient React development.  
✅ Full CRUD operations ensure comprehensive task management functionality.

---

### Next Steps
In future steps, we can enhance this app by:
- Implement React Context API to simplify prop drilling. 
- Introduce useRef for referencing DOM elements directly and maintaining values without re-rendering 
- Use useEffect for API calls and side effects.
- Demonstrate scenarios for useMemo, useCallback, and Memo HOC to optimize performance.

===================================================== 

## Updated Code with Added Enhancements: Implementation of useContext API, useRef, and useEffect for Improved Functionality and Code Efficiency

### Step 1: App Structure
```
/src
  /components
    - TaskList.js
    - TaskItem.js
    - AddTask.js
    - TaskContext.js
  App.js
  index.js
```

### Step 2: Code Implementation

**`TaskContext.js` (New for Context API)**
```jsx
import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => setTasks([...tasks, task]);
    const completeTask = (completedTask) => setTasks(tasks.filter(task => task !== completedTask));
    const updateTask = (oldTask, updatedTask) => setTasks(tasks.map(task => task === oldTask ? updatedTask : task));
    const deleteTask = (taskToDelete) => setTasks(tasks.filter(task => task !== taskToDelete));

    return (
        <TaskContext.Provider value={{ tasks, addTask, completeTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
```

**`AddTask.js`**
```jsx
import React, { useRef } from 'react';
import { useTaskContext } from './TaskContext';

function AddTask() {
    const inputRef = useRef();
    const { addTask } = useTaskContext();

    const handleAdd = () => {
        const newTask = inputRef.current.value.trim();
        if (newTask) {
            addTask(newTask);
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <input ref={inputRef} placeholder="Add a new task" />
            <button onClick={handleAdd}>Add Task</button>
        </div>
    );
}

export default AddTask;
```

**`TaskItem.js`**
```jsx
import React, { memo, useState } from 'react';
import { useTaskContext } from './TaskContext';

const TaskItem = memo(({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);
    const { completeTask, updateTask, deleteTask } = useTaskContext();

    const handleUpdate = () => {
        updateTask(task, updatedTask);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input 
                        value={updatedTask} 
                        onChange={(e) => setUpdatedTask(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <span>{task}</span>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => completeTask(task)}>Complete</button>
                    <button onClick={() => deleteTask(task)}>Delete</button>
                </>
            )}
        </div>
    );
});

export default TaskItem;
```

**`App.js`**
```jsx
import React, { useEffect, useState } from 'react';
import { TaskProvider, useTaskContext } from './components/TaskContext';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(data => setApiData(data.map(item => item.title)));
    }, []);

    return (
        <TaskProvider>
            <div>
                <h1>Task Manager</h1>
                <AddTask />
                <TaskList tasks={apiData} />
            </div>
        </TaskProvider>
    );
}

export default App;
```

---

# Understanding useMemo, useCallback, and Memo in React

In this guide, we'll explore **`useMemo`**, **`useCallback`**, and **`Memo` HOC** in React with clear examples, explanations, and key differences.

---

## 1. `useMemo` - Memoizing Values

### What is `useMemo`?
`useMemo` is used to memoize **computed values**. It optimizes performance by caching the result of expensive calculations and recomputing only when dependencies change.

### When to Use `useMemo`
- When you have **expensive calculations** that don't need to run on every render.
- To **optimize performance** for derived data or filtered results.

### Example:
```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ count }) {
    const computeValue = (num) => {
        console.log('Calculating...');
        let total = 0;
        for (let i = 0; i < 100000000; i++) {
            total += num * 2;  // Expensive calculation
        }
        return total;
    };

    const memoizedValue = useMemo(() => computeValue(count), [count]);

    return <h1>Result: {memoizedValue}</h1>;
}

export default function App() {
    const [count, setCount] = useState(1);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <ExpensiveCalculation count={count} />
        </div>
    );
}
```

### Key Takeaway:
✅ `useMemo` caches the computed value until the `count` changes, preventing unnecessary recalculations.

---

## 2. `useCallback` - Memoizing Functions

### What is `useCallback`?
`useCallback` memoizes **functions** and returns the same function reference unless dependencies change. It’s useful when passing callback functions to child components to prevent unnecessary re-renders.

### When to Use `useCallback`
- When passing **callback functions** to child components that rely on **reference equality** (especially with `React.memo`).
- To optimize performance in frequently rendering components.

### Example:
```jsx
import React, { useState, useCallback } from 'react';
import ChildComponent from './ChildComponent';

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const handleClick = useCallback(() => {
        console.log('Button clicked:', count);
    }, [count]);

    return (
        <div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something"
            />
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <ChildComponent onClick={handleClick} />
        </div>
    );
}

export default App;
```

**`ChildComponent.js`**
```jsx
import React, { memo } from 'react';

const ChildComponent = memo(({ onClick }) => {
    console.log('Child rendered');
    return <button onClick={onClick}>Click Me</button>;
});

export default ChildComponent;
```

### Key Takeaway:
✅ `useCallback` ensures that `handleClick` maintains the same reference unless `count` changes, preventing unnecessary re-renders of `ChildComponent`.

---

## 3. `Memo` - Higher Order Component (HOC)

### What is `Memo`?
`React.memo` is a **higher-order component** that memoizes an entire component. It skips rendering the component if its props haven't changed.

### When to Use `Memo`
- When you want to **prevent unnecessary renders** for components that receive the same props.
- Best paired with `useCallback` to optimize performance further.

### Example:
```jsx
import React, { useState } from 'react';
import { memo } from 'react';

const MemoizedComponent = memo(({ name }) => {
    console.log('Memoized Component Rendered');
    return <h1>Hello, {name}!</h1>;
});

export default function App() {
    const [name, setName] = useState('Alice');
    const [count, setCount] = useState(0);

    return (
        <div>
            <MemoizedComponent name={name} />
            <button onClick={() => setCount(count + 1)}>Increment Count</button>
        </div>
    );
}
```

### Key Takeaway:
✅ `Memo` ensures the `MemoizedComponent` only re-renders if its `name` prop changes.

---

## 4. Key Differences Between `useEffect`, `useMemo`, and `useCallback`

| Feature        | `useEffect` | `useMemo`  | `useCallback` |
|----------------|--------------|-------------|----------------|
| **Purpose**       | Used for side effects like data fetching, subscriptions, or manually modifying the DOM. | Used to memoize **computed values**. | Used to memoize **callback functions**. |
| **Returns**        | No return value (manages side effects only).  | Returns the **memoized value**. | Returns the **memoized function**. |
| **When to Use**   | For API calls, DOM manipulations, or cleanup logic. | For optimizing expensive calculations. | For memoizing functions passed as props to child components. |

---

## 5. When to Use Each Hook
| Scenario                        | Best Choice       |
|----------------------------------|-------------------|
| Performing **API calls** or **side effects**     | `useEffect` |
| Preventing re-render of **memoized values**        | `useMemo`   |
| Optimizing **callback functions** passed to child components | `useCallback` |
| Preventing re-render of **entire components** with unchanged props | `Memo` HOC    |

---

## 6. Final Thoughts
- Use **`useEffect`** for side effects like data fetching or DOM manipulation.
- Use **`useMemo`** for optimizing expensive calculations.
- Use **`useCallback`** for memoizing functions passed to child components.
- Use **`React.memo`** for memoizing entire components when props remain unchanged.


# Complex Example: Context API with `useReducer` vs Redux

In this guide, we'll explore a complex example using **Context API with `useReducer`** and then implement the **same functionality with Redux** to understand the key differences and identify when to use each.

## Problem Statement
We'll build a **Task Management App** with the following features:
- Add, Edit, and Delete tasks.
- Toggle task completion.
- Filter tasks (All, Completed, Incomplete).

---

# 1. Context API with `useReducer` Implementation

### Step 1: Create the `TaskReducer`
**`TaskReducer.js`**
```jsx
export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};
```

### Step 2: Create the `TaskContext`
**`TaskContext.js`**
```jsx
import React, { createContext, useReducer, useContext } from 'react';
import { taskReducer } from './TaskReducer';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
```

### Step 3: Build the Task Components
**`TaskApp.js`**
```jsx
import React, { useState } from 'react';
import { TaskProvider, useTaskContext } from './TaskContext';

function TaskInput() {
    const [task, setTask] = useState('');
    const { dispatch } = useTaskContext();

    const addTask = () => {
        if (task.trim()) {
            dispatch({ type: 'ADD_TASK', payload: task });
            setTask('');
        }
    };

    return (
        <div>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

function TaskList() {
    const { tasks, dispatch } = useTaskContext();

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                    </span>
                    <button onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}>
                        Toggle
                    </button>
                    <button onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default function App() {
    return (
        <TaskProvider>
            <TaskInput />
            <TaskList />
        </TaskProvider>
    );
}
```

---

# 2. Redux Implementation

### Step 1: Create the Redux Reducer
**`taskSlice.js`**
```jsx
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push({ id: Date.now(), text: action.payload, completed: false });
        },
        toggleTask: (state, action) => {
            const task = state.find(task => task.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        }
    }
});

export const { addTask, toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
```

### Step 2: Create the Redux Store
**`store.js`**
```jsx
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({
    reducer: { tasks: taskReducer }
});
```

### Step 3: Build the Redux Components
**`TaskAppRedux.js`**
```jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask } from './taskSlice';

function TaskInput() {
    const [task, setTask] = useState('');
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (task.trim()) {
            dispatch(addTask(task));
            setTask('');
        }
    };

    return (
        <div>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

function TaskList() {
    const tasks = useSelector(state => state.tasks);
    const dispatch = useDispatch();

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.text}
                    </span>
                    <button onClick={() => dispatch(toggleTask(task.id))}>Toggle</button>
                    <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default function App() {
    return (
        <div>
            <TaskInput />
            <TaskList />
        </div>
    );
}
```

---

### 3. Key Differences and When to Use

| Feature                | Context API + `useReducer` | Redux (Toolkit) |
|------------------------|----------------------------|------------------|
| **Setup Complexity**       | Simple, minimal boilerplate. | More setup required (actions, reducers, store). |
| **Scalability**             | Best for small to medium apps. | Ideal for larger applications with complex state. |
| **Performance Optimization**| Requires memoization for performance. | Built-in optimizations for efficient updates. |
| **Debugging Tools**         | Limited debugging support. | Advanced Redux DevTools for easy debugging. |

---

### 4. Conclusion
- Use **Context API with `useReducer`** for simpler state management and smaller projects.
- Use **Redux** when dealing with **complex state logic**, **multiple data sources**, or requiring **robust debugging tools**.

# **React Context API vs Redux (Detailed Explanation with Examples)**

## **Key Differences**

| Feature                  | Context API + `useReducer`   | Redux (Toolkit)           |
|------------------------|----------------------------|---------------------------|
| **Setup Complexity**       | Simple, minimal boilerplate.   | More setup required (actions, reducers, store). |
| **Scalability**             | Best for small to medium apps. | Ideal for larger applications with complex state. |
| **Performance Optimization**| Requires memoization for performance. | Built-in optimizations for efficient updates. |
| **Debugging Tools**         | Limited debugging support.     | Advanced Redux DevTools for easy debugging.      |


## **Limitations of Context API for Large-Scale Apps**
- Managing **multiple states** with Context API may require **multiple providers**, making the component tree deeply nested and complex.
- Combining multiple states into **one context** is inefficient and leads to **unnecessary re-renders**.
- Context API doesn't provide **centralized state management** like Redux does, which is crucial for complex apps.
- Updating complex data structures in Context API requires **spread syntax** or similar methods since data must be immutable, increasing code complexity.


## **Why Redux is Suitable for Large-Scale Apps**
- Redux offers a **single source of truth** with one centralized **store** for all application states.
- It provides clear data flow with **actions**, **reducers**, and **subscriptions**.
- Redux Toolkit simplifies the boilerplate code required for setting up Redux.


---

# With out Redux Tool Kit Vs With Redux ToolKit

## **Redux Flow (Without Redux Toolkit)**

### **1. Store Creation**
- The **store** holds the entire state tree of your application.
- It is created using `createStore()` from Redux.

```jsx
import { createStore } from 'redux';
import rootReducer from './reducers'; // Combine all reducers here

const store = createStore(rootReducer);
export default store;
```

---

### **2. Reducers**
- Reducers are pure functions that take **state** and **action** as arguments and return a **new state**.

```jsx
const initialState = { count: 0, theme: 'light', user: null };

function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
```

---

### **3. Actions**
- Actions are objects with a `type` property and optionally a `payload`.

```jsx
export const increment = () => ({ type: 'INCREMENT' });
export const decrement = () => ({ type: 'DECREMENT' });
export const setTheme = (theme) => ({ type: 'SET_THEME', payload: theme });
export const setUser = (user) => ({ type: 'SET_USER', payload: user });
```

---

### **4. Dispatching Actions**
- Components dispatch actions to update the state.

```jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, setTheme, setUser } from './actions';

function AppComponent() {
    const { count, theme, user } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <h2>Theme: {theme}</h2>
            <h2>User: {user ? user.name : 'No User'}</h2>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(setTheme('dark'))}>Set Dark Theme</button>
            <button onClick={() => dispatch(setUser({ name: 'John Doe' }))}>Set User</button>
        </div>
    );
}
```

---

### **5. Provider**
- The `<Provider>` component wraps your app and provides the Redux store to the entire component tree.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

---

## **Redux Toolkit (Recommended Approach)**
Redux Toolkit simplifies Redux logic by reducing boilerplate code.

### **Steps to Implement Redux Toolkit**

### **1. Create Slice** (Combines Reducer + Actions)
```jsx
import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: { count: 0, theme: 'light', user: null },
    reducers: {
        increment: (state) => { state.count += 1; },
        decrement: (state) => { state.count -= 1; },
        setTheme: (state, action) => { state.theme = action.payload; },
        setUser: (state, action) => { state.user = action.payload; }
    }
});

export const { increment, decrement, setTheme, setUser } = appSlice.actions;
export default appSlice.reducer;
```

---

### **2. Configure Store**
```jsx
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';

const store = configureStore({
    reducer: {
        app: appReducer
    }
});

export default store;
```

---

### **3. Dispatch Actions in Components**
```jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, setTheme, setUser } from './appSlice';

function AppComponent() {
    const { count, theme, user } = useSelector(state => state.app);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Count: {count}</h1>
            <h2>Theme: {theme}</h2>
            <h2>User: {user ? user.name : 'No User'}</h2>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(setTheme('dark'))}>Set Dark Theme</button>
            <button onClick={() => dispatch(setUser({ name: 'John Doe' }))}>Set User</button>
        </div>
    );
}
```

---

### **Key Takeaways**
✅ Redux Toolkit reduces boilerplate with `createSlice` and `configureStore`.
✅ Ideal for **medium to large-scale applications** with complex state logic.
✅ Redux DevTools provide powerful insights for debugging.


# React Router - Old vs New (with `createBrowserRouter`)

## 🚀 Introduction
React Router has evolved significantly over time. The newer API, `createBrowserRouter`, introduced in **React Router v6.4+**, enhances data handling, error management, and simplifies route definitions. Below is a detailed explanation of both approaches.

---

## 📋 Old Way Using `<BrowserRouter>`
### **App.js** (Old Way)
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Settings from './Settings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
```

---

## 🆕 New Way Using `createBrowserRouter`
### Key Concepts
- **`createBrowserRouter`** – Defines the router with route objects.
- **`RouterProvider`** – Wraps the app and provides routing capabilities.
- **`Loader`** – Fetches data before rendering a route.
- **`Action`** – Handles form submissions or data mutations.
- **`ErrorElement`** – Provides custom error handling.
- **`Outlet`** – Used to render nested routes.

---

### **App.js** (New Way)
```jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './Home';
import About, { aboutLoader } from './About';
import Contact from './Contact';
import NotFound from './NotFound';
import Dashboard from './Dashboard';
import Settings from './Settings';

const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About />, loader: aboutLoader },
    { path: '/contact', element: <Contact /> },
    {
        path: '/dashboard',
        element: <Dashboard />, 
        children: [
            { path: 'settings', element: <Settings /> },
        ]
    },
    { path: '*', element: <NotFound /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
```

---

### **About.js** (with Data Loader Example)
```jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';

// Data fetching function
export async function aboutLoader() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    return data;
}

const About = () => {
    const userData = useLoaderData();

    return (
        <div>
            <h1>About Page</h1>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default About;
```

### **Dashboard.js** (with Nested Route Support)
```jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to="settings">Settings</Link>
            </nav>
            <Outlet />  {/* Renders nested routes here */}
        </div>
    );
};

export default Dashboard;
```

### **Router with Loader Integrated**
```jsx
const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About />, loader: aboutLoader },
    { path: '/contact', element: <Contact /> },
    {
        path: '/dashboard',
        element: <Dashboard />, 
        children: [
            { path: 'settings', element: <Settings /> },
        ]
    },
    { path: '*', element: <NotFound /> },
]);
```

---

## ✅ Key Benefits of `createBrowserRouter`
- Better structure for defining routes.  
- Simplifies **data fetching** with `loader`.  
- Provides enhanced **error handling** with `errorElement`.  
- Supports **mutation handling** via `action`.  
- Enhanced support for **nested routing** using `<Outlet />` for improved UI organization.

---

## ⚡ When to Use?
- Prefer `createBrowserRouter` for **newer projects** requiring **data fetching**, **better error handling**, and **modern patterns**.
- Stick with `<BrowserRouter>` for simpler apps or when working in **legacy codebases**.

---
