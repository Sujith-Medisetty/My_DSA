# Express.js CRUD API with SQL Database Integration

This guide walks you through building a RESTful CRUD API using **Express.js** with **SQL Database** (e.g., **PostgreSQL**, **MySQL**). The project will cover:

✅ CRUD Operations (Create, Read, Update, Delete)
✅ Path Parameters
✅ Query Parameters
✅ Error Handling
✅ SQL Database Integration

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

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER
);
```

---

## 🚀 Step 4: Controller Methods (`/controllers/userController.js`)

```javascript
const pool = require('../config/db');

// Create User
exports.createUser = async (req, res, next) => {
    const { name, email, age } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Get All Users (with optional query filter)
exports.getUsers = async (req, res, next) => {
    const { minAge } = req.query;
    try {
        const query = minAge
            ? 'SELECT * FROM users WHERE age >= $1'
            : 'SELECT * FROM users';
        const values = minAge ? [minAge] : [];
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Get User by ID
exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (!result.rows.length) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Update User
exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const result = await pool.query(
            'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
            [name, email, age, id]
        );
        if (!result.rows.length) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (!result.rows.length) return res.status(404).json({ message: 'User not found' });
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

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## 📋 Step 7: Sample API Endpoints

### ➕ Create User (POST)
```
POST /api/users
Body: { "name": "John Doe", "email": "john@example.com", "age": 30 }
```

### 📋 Get All Users (GET)
```
GET /api/users?minAge=25
```

### 🔍 Get User by ID (GET)
```
GET /api/users/1
```

### 🛠️ Update User (PUT)
```
PUT /api/users/1
Body: { "name": "Updated Name", "email": "updated@example.com", "age": 35 }
```

### ❌ Delete User (DELETE)
```
DELETE /api/users/1
```

---

## 🚀 Step 8: Run the Project
1. Create the database and `users` table in your SQL system.
2. Run the app:
```bash
node server.js
```
3. Test the endpoints with **Postman**, **Thunder Client**, or **curl**.

---

## 🎯 Best Practices Followed
✅ RESTful API structure
✅ Clear error handling with proper status codes
✅ SQL injection prevention using parameterized queries
✅ Organized project structure for scalability

