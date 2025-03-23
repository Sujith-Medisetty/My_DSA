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

