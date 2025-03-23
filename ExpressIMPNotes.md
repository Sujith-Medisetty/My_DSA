# Understanding Async/Await in Node.js with Database Queries

## 🚀 Introduction
`async/await` is a powerful way to handle asynchronous operations in Node.js. While it appears synchronous, it still preserves Node.js's **non-blocking** nature. This document breaks down the internal working of `async/await` and its comparison with callbacks.

---

## 🌍 Callback-Based Approach

In the callback model:

1. **DB Query Sent:**
   - The `.query()` call is made, and Node.js **offloads** the I/O task (like a database query) to **Libuv**.  
2. **OS/Libuv Handles It:**
   - Libuv, in turn, delegates the operation to a **worker thread**.  
3. **Task Completes:**
   - Once the DB task is finished, Libuv pushes the callback into the **callback queue**.  
4. **Event Loop Executes Callback:**
   - The **event loop** picks the callback from the queue and executes it when the call stack is free.  

✅ Non-blocking because Node.js keeps processing other requests while waiting for the query.

---

## 🚀 Promise-Based Approach (With `async/await`)

Even though `.query()` now returns a **Promise**, the internal mechanism still follows the **non-blocking** model. Here's the flow:

1. **DB Query Sent:**
   - The `await` expression pauses the current function's execution (only that function — **not the entire app**).  
   - The `.query()` call itself is still **asynchronous** and handed off to Libuv.  
2. **OS/Libuv Handles It:**
   - Libuv delegates the database operation to a **worker thread**, just like in the callback model.  
3. **Task Completes:**
   - When the query finishes, Libuv places the result (or error) in the **microtask queue** (also called the **Promise queue**).  
4. **Event Loop Executes Promise Resolution:**
   - The **event loop** prioritizes microtasks immediately after completing the current task in the call stack.  

✅ Still **non-blocking** because Node.js continues processing other requests while waiting.

---

## ⚙️ Visual Flow: Callback vs. Promise (`await`)

### 🔄 **Callback Flow**
```
1. Start Request
2. DB Query Sent (Async Task → Libuv)
3. Continue Processing Other Requests
4. DB Query Completes
5. Callback Pushed to Callback Queue
6. Event Loop Executes Callback
```

### 🚀 **Promise/`await` Flow**
```
1. Start Request
2. DB Query Sent (Async Task → Libuv)
3. Continue Processing Other Requests
4. DB Query Completes
5. Promise Pushed to Microtask Queue
6. Event Loop Executes Microtask Immediately After Current Task
```

➡️ **Promise-based code (including `async/await`) executes faster than callbacks because microtasks have higher priority than normal callbacks.**

---

## 🔎 **Detailed Example with Logs**

### 🔥 Code Example
```javascript
console.log('1. Start');

setTimeout(() => console.log('2. setTimeout callback'), 0);  // Task Queue

Promise.resolve().then(() => console.log('3. Promise resolved'));  // Microtask Queue

console.log('4. End of script');
```

### 🟢 **Output**
```
1. Start
4. End of script
3. Promise resolved
2. setTimeout callback
```

### 🔍 **Why This Order?**
- `console.log('1. Start')` and `console.log('4. End of script')` run immediately (sync code).  
- The **Promise** gets resolved before `setTimeout` because **microtasks (Promises)** are prioritized over the **task queue (setTimeout, I/O callbacks, etc.)**.

---

## 🔬 **In a Real Example (DB Query)**
Imagine this Express route:

```javascript
app.get('/user/:id', async (req, res) => {
    console.log('1. Starting request...');

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);

    console.log('2. Query finished...');
    res.json(result.rows);

    console.log('3. Response sent...');
});
```

### 🟢 **Execution Flow**
1️⃣ **Request received** → `console.log('1. Starting request...')` runs immediately.  
2️⃣ The `.query()` call is sent to **Libuv** (non-blocking I/O).  
3️⃣ **Node.js continues processing other requests.**  
4️⃣ When the DB query completes, the resolved Promise is queued in the **microtask queue**.  
5️⃣ The event loop picks the resolved Promise right after finishing the current task.  
6️⃣ **`console.log('2. Query finished...')`** runs, followed by sending the response.

---

## 🔥 **Key Differences (Callback vs. `async/await`)

| Feature              | Callback               | `async/await` (Promise) |
|----------------------|------------------------|-------------------------|
| Syntax Complexity      | More complex, nesting issues (callback hell) | Cleaner, linear code flow |
| Error Handling         | Requires `.catch()` or error-first callback logic | Uses `try...catch` for simpler error handling |
| Execution Priority     | Handled in the **Task Queue** (lower priority) | Handled in the **Microtask Queue** (higher priority) |
| Performance Impact     | Good for simple logic, but can get messy in complex flows | Better suited for cleaner code in large projects |

---

## 🔑 **Key Takeaways**
✅ `async/await` doesn’t block the entire Node.js server; it pauses **only the current function**.  
✅ Promises are added to the **microtask queue**, which runs faster than normal callbacks.  
✅ Node.js’s event loop ensures non-blocking behavior by continuing to handle other requests even when awaiting async tasks.  
✅ `async/await` leads to cleaner, more maintainable code while still leveraging Node.js's non-blocking nature.  

---

# Database Operations in Node.js with PostgreSQL

## 1. Callback-Based DB Operation

Using callbacks was the traditional way of handling asynchronous operations in Node.js, but it can lead to callback hell and unmanageable code.

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

pool.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.error('Query error', err.stack);
  } else {
    console.log(res.rows);
  }
});
```

### Pros:
- Works without additional libraries.
- Simple for small operations.

### Cons:
- Leads to callback hell in complex operations.
- Harder to manage and debug.

## 2. Promise-Based DB Operation

Using Promises makes the code cleaner and avoids deeply nested callbacks.

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

pool.query('SELECT * FROM users')
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => {
    console.error('Error', err.stack);
  });
```

### Pros:
- Better readability than callbacks.
- Easier to handle errors.

### Cons:
- Still can become complex with multiple queries.

## 3. Async/Await DB Operation

The `async/await` syntax simplifies asynchronous code and improves readability.

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'testdb',
  password: 'password',
  port: 5432,
});

async function fetchUsers() {
  try {
    const res = await pool.query('SELECT * FROM users');
    console.log(res.rows);
  } catch (err) {
    console.error('Error', err.stack);
  }
}

fetchUsers();
```

### Pros:
- Cleaner syntax and better readability.
- Avoids promise chaining.
- Easier error handling with try/catch.

### Cons:
- If not used carefully, `await` can cause performance issues in parallel operations.

## 4. When `await` is Inefficient

Using `await` inside loops can be inefficient when multiple queries need to be executed concurrently. Example of inefficient usage:

```javascript
async function fetchUsersByIds(userIds) {
  for (let id of userIds) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    console.log(res.rows);
  }
}
```

This runs queries sequentially, waiting for each to complete before executing the next, which is slow.

### Best Practice: Using `Promise.all()`

To execute queries in parallel, use `Promise.all()`:

```javascript
async function fetchUsersByIds(userIds) {
  const queries = userIds.map(id => pool.query('SELECT * FROM users WHERE id = $1', [id]));
  const results = await Promise.all(queries);
  results.forEach(res => console.log(res.rows));
}
```

### When to Use Which Approach:
- **Use async/await** for sequential logic or when order matters.
- **Use Promise.all()** for parallel execution when order doesn't matter.
- **Use streaming** for large datasets to avoid memory overload.

By choosing the right approach, you can optimize database performance in your Node.js applications.

