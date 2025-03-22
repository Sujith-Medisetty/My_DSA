# Task Management API with Express.js

This project covers essential Express.js concepts, including CRUD operations, middleware, authentication, and database integration.

## Project Setup

1. **Initialize Project:**
```bash
mkdir task-manager-api
cd task-manager-api
npm init -y
npm install express mongoose dotenv jsonwebtoken
```

2. **Folder Structure:**
```
/task-manager-api
├── /config
│   └── database.js
├── /controllers
│   └── taskController.js
├── /middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── /models
│   └── Task.js
├── /routes
│   └── taskRoutes.js
├── .env
├── index.js
└── package.json
```

## Database Configuration
**/config/database.js**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;
```

## Task Model
**/models/Task.js**
```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
```

## Task Controller
**/controllers/taskController.js**
```javascript
const Task = require('../models/Task');

// Create a task
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
};

// Get all tasks
exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

// Update task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTask);
};

// Delete task
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
};
```

## Routes
**/routes/taskRoutes.js**
```javascript
const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
```

## Middleware (Error Handling)
**/middleware/errorMiddleware.js**
```javascript
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};
```

## Main Entry Point
**index.js**
```javascript
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

## Environment Variables
**.env**
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

## Running the Project
1. Ensure MongoDB is running.
2. Run the application with:
```bash
node index.js
```
3. Test endpoints using Postman or any REST client.

### Sample Endpoints
- **POST** `/api/tasks` - Create a new task
- **GET** `/api/tasks` - Get all tasks
- **PUT** `/api/tasks/:id` - Update a task
- **DELETE** `/api/tasks/:id` - Delete a task

This project follows best practices and demonstrates key Express.js concepts.

