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

## Building a Basic App with Props and Prop Drilling
We'll create a **Task Manager App** with these features:
- Display a list of tasks
- Add new tasks
- Mark tasks as completed

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
import React from 'react';

function TaskItem({ task, onComplete }) {
    return (
        <div>
            <span>{task}</span>
            <button onClick={() => onComplete(task)}>Complete</button>
        </div>
    );
}

export default TaskItem;
```

**`TaskList.js`**
```jsx
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onComplete }) {
    return (
        <div>
            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} onComplete={onComplete} />
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

    return (
        <div>
            <h1>Task Manager</h1>
            <AddTask onAddTask={addTask} />
            <TaskList tasks={tasks} onComplete={completeTask} />
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

---

### Next Steps
In future steps, we can enhance this app by:
- Adding persistent storage using `localStorage`
- Implementing React Context to simplify prop drilling
- Introducing better UI/UX improvements using libraries like `shadcn/ui` or `Material-UI`.

