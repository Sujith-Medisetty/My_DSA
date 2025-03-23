# Express.js CRUD API with PostgreSQL & Sequelize

This guide walks you through building a RESTful CRUD API using **Express.js** with **PostgreSQL** via **Sequelize ORM**. The project follows industry best practices with proper separation of concerns.

✅ CRUD Operations (Create, Read, Update, Delete)  
✅ Path & Query Parameters  
✅ Error Handling  
✅ SQL Database Integration using Sequelize  
✅ Model-Based Database Interaction  

---

## 🏗️ Project Structure
```
/express-sequelize-crud
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
npm install express sequelize pg pg-hstore dotenv
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
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
});

module.exports = sequelize;
```

---

## 🗂️ Step 3: User Model (`/models/User.js`)

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = User;
```

---

## 🚀 Step 4: Controller Methods (`/controllers/userController.js`)

```javascript
const User = require('../models/User');

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
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
const sequelize = require('./config/db');
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

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
```

---

## 🎯 Best Practices Followed
✅ RESTful API structure  
✅ Clear error handling with proper status codes  
✅ Sequelize ORM for cleaner database interactions  
✅ Organized project structure for scalability  
✅ Encapsulation of database logic within a model  

This setup ensures **scalability, maintainability, and efficiency** in handling PostgreSQL databases using Sequelize ORM.

