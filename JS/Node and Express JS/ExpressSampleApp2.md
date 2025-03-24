# Express.js CRUD API with PostgreSQL Integration

This guide walks you through building a RESTful CRUD API using **Express.js** with **PostgreSQL**. The project follows industry best practices with proper separation of concerns.

✅ CRUD Operations (Create, Read, Update, Delete)  
✅ Path & Query Parameters  
✅ Error Handling  
✅ SQL Database Integration  
✅ Model-Based Database Interaction  

---

## 🏗️ Project Structure
```
/express-sql-crud
├── /node_modules
├── /routes
│   └── users.js
├── /controllers
│   └── userController.js
├── /config
│   └── db.js
├── /models
│   └── User.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## 📦 Step 1: Setup the Project

1. Initialize your project:
```bash
npm init -y
```

2. Install dependencies:
```bash
npm install express pg dotenv
```

3. Create a `.env` file for environment variables:
```
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
PORT=3000
```

---

## ⚙️ Step 2: Database Configuration (`/config/db.js`)

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = pool;
```

---

## 🗂️ Step 3: User Model (`/models/User.js`)

```javascript
const pool = require('../config/db');

class User {
    static async create(name, email, age) {
        const result = await pool.query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        return result.rows[0];
    }

    static async findAll(minAge) {
        const query = minAge ? 'SELECT * FROM users WHERE age >= $1' : 'SELECT * FROM users';
        const values = minAge ? [minAge] : [];
        const result = await pool.query(query, values);
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    static async update(id, name, email, age) {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
            [name, email, age, id]
        );
        return result.rows[0] || null;
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    }
}

module.exports = User;
```

---

## 🚀 Step 4: Controller Methods (`/controllers/userController.js`)

```javascript
const User = require('../models/User');

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body.name, req.body.email, req.body.age);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll(req.query.minAge);
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.update(req.params.id, req.body.name, req.body.email, req.body.age);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.delete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
```

---

## 🌐 Step 5: Routes (`/routes/users.js`)

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

---

## 📄 Step 6: Main Server File (`server.js`)

```javascript
const express = require('express');
const userRoutes = require('./routes/users');
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 🎯 Best Practices Followed
✅ RESTful API structure  
✅ Clear error handling with proper status codes  
✅ SQL injection prevention using parameterized queries  
✅ Organized project structure for scalability  
✅ Encapsulation of database logic within a model  

By structuring the project this way, each layer (model, controller, route) has a clear responsibility, making the application easier to maintain and scale.

