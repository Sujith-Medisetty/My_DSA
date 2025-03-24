# Difference Between Node.js, Express.js, React.js, and npm

## 1. Node.js
- **Definition**: A runtime environment that allows you to run JavaScript outside the browser.
- **Purpose**: Used for backend development, handling server-side logic, and building scalable network applications.
- **Key Features**:
  - Uses **V8 engine** to execute JavaScript.
  - **Asynchronous and event-driven**.
  - Can handle **file system operations**, **HTTP requests**, and **database connections**.
- **Example Usage**:
  ```js
  const http = require('http');
  const server = http.createServer((req, res) => {
      res.write('Hello from Node.js Server!');
      res.end();
  });
  server.listen(3000);
  ```

## 2. Express.js
- **Definition**: A **lightweight web framework** for Node.js that simplifies building APIs and web applications.
- **Purpose**: Helps manage routes, middleware, and request handling in a clean way.
- **Key Features**:
  - Simplifies **routing** and **middleware integration**.
  - Supports **RESTful APIs**.
  - Allows **middleware-based request handling**.
- **Example Usage**:
  ```js
  const express = require('express');
  const app = express();
  
  app.get('/', (req, res) => {
      res.send('Hello from Express!');
  });
  
  app.listen(3000, () => console.log('Server running on port 3000'));
  ```

## 3. React.js
- **Definition**: A JavaScript library for building **interactive UI components**.
- **Purpose**: Used for frontend development to create dynamic and fast-loading web applications.
- **Key Features**:
  - Uses a **component-based architecture**.
  - Employs a **virtual DOM** for efficient rendering.
  - Supports **hooks** for state and lifecycle management.
- **Example Usage**:
  ```jsx
  import React, { useState } from 'react';
  
  function App() {
      const [count, setCount] = useState(0);
      return (
          <div>
              <h1>Counter: {count}</h1>
              <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
      );
  }
  
  export default App;
  ```

## 4. npm (Node Package Manager)
- **Definition**: A package manager for JavaScript that helps install, manage, and update dependencies.
- **Purpose**: Used to manage third-party libraries and tools for both frontend and backend development.
- **Key Features**:
  - Provides access to **open-source packages**.
  - Manages project dependencies via `package.json`.
  - Allows **version control** for libraries.
- **Example Commands**:
  ```sh
  # Initialize a project
  npm init -y
  
  # Install a package
  npm install express
  
  # Install dependencies from package.json
  npm install
  ```

## Summary Table
| Feature   | Node.js | Express.js | React.js | npm |
|-----------|--------|------------|----------|-----|
| **Type**  | Runtime Environment | Web Framework | UI Library | Package Manager |
| **Usage** | Backend | Web APIs | Frontend | Dependency Management |
| **Language** | JavaScript | JavaScript | JavaScript | Command-line tool |
| **Key Benefit** | Runs JS outside browser | Simplifies backend development | Efficient UI rendering | Manages JS packages |

Now this fully covers the differences between Node.js, Express.js, React.js, and npm in `.md` format. 🚀

# Node.js Server Code

```js
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello, World! This is a basic Node.js server.');
    res.end();
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

## Explanation

### 1. **Importing the HTTP Module**
```js
const http = require('http');
```
- Node.js provides a built-in `http` module that allows us to create and manage an HTTP server.

### 2. **Creating the Server**
```js
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello, World! This is a basic Node.js server.');
    res.end();
});
```
- The `http.createServer()` method is used to create an HTTP server.
- It takes a callback function that executes when a request is received.
- The `req` parameter represents the request object, which contains details about the incoming request.
- The `res` parameter represents the response object, which is used to send data back to the client.
- `res.writeHead(200, { 'Content-Type': 'text/plain' })` sets the HTTP status code to **200** (OK) and specifies that the response will be **plain text**.
- `res.write('Hello, World! This is a basic Node.js server.')` writes the response body.
- `res.end()` signals that the response is complete, closing the connection.

### 3. **Starting the Server**
```js
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```
- The `server.listen(3000, callback)` function starts the server on **port 3000**.
- The callback function logs a message indicating that the server is running.
- When a client accesses `http://localhost:3000`, the server responds with "Hello, World! This is a basic Node.js server.".

### 4. **Running the Server**
1. Save the file as `server.js`.
2. Open the terminal and run:
   ```sh
   node server.js
   ```
3. Open a browser and visit `http://localhost:3000`.
4. You should see the output:
   ```
   Hello, World! This is a basic Node.js server.
   ```

# Understanding How Node.js Works Internally

Node.js is a **single-threaded, event-driven runtime** that efficiently handles asynchronous operations using its **Event Loop** and the **libuv** library. Despite being single-threaded, Node.js can handle multiple concurrent tasks without blocking the main execution thread.

## 📌 Node.js Application Lifecycle
Whenever a Node.js program runs, it follows these phases:

### 1️⃣ Initialization Phase
- Loads required modules using `require()`.
- Registers event listeners (e.g., `setTimeout`, `fs.readFile`).
- Executes synchronous top-level code.

### 2️⃣ Event Loop Execution (Main Phase)
- Runs indefinitely, handling **asynchronous operations** (HTTP requests, database queries, file operations, timers).
- Ensures **non-blocking execution**.

### 3️⃣ Shutdown Phase
- When no pending operations remain, Node.js exits gracefully.

---

## 🌀 Understanding the Node.js Event Loop
The **Event Loop** is the heart of Node.js. It continuously checks for pending tasks and executes them in different phases.

### 🔄 How the Event Loop Works?
When you execute a Node.js program, this is what happens:

1️⃣ **Synchronous code runs first** (line-by-line execution).
2️⃣ **Async tasks (e.g., `setTimeout`, file reading, API calls) are delegated** to **libuv**, which manages them using **system-level threads or OS async APIs**.
3️⃣ **Once async tasks complete**, their callbacks are queued in the Event Loop.
4️⃣ The Event Loop continuously executes queued tasks in cycles (phases).

### Phases & Execution Order in Node.js Event Loop

| **Execution Order** | **What Happens Here?** |
|----------------|------------------------|
| **1️⃣ Synchronous Code** | Runs first (top-to-bottom execution). |
| **2️⃣ Microtasks Queue** | Executes `Promise.then()` and `process.nextTick()`. |
| **3️⃣ Timers Phase** | Executes `setTimeout()` and `setInterval()`. |
| **4️⃣ I/O Callbacks Phase** | Executes disk/network operations (`fs.readFile()`). |
| **5️⃣ Idle, Prepare Phase** | (Used internally by Node.js, usually ignored). |
| **6️⃣ Poll Phase** | Waits for new I/O tasks or executes ready callbacks. |
| **7️⃣ Check Phase** | Executes `setImmediate()` callbacks. |
| **8️⃣ Close Phase** | Handles cleanup (`socket.on('close', …)`). |
---

## 📌 Example: Event Loop in Action

```js
console.log('Start');

setTimeout(() => {
    console.log('Inside setTimeout');
}, 0);

setImmediate(() => {
    console.log('Inside setImmediate');
});

Promise.resolve().then(() => console.log('Inside Promise'));

console.log('End');
```

### 🛠 Expected Output:
```
Start  
End  
Inside Promise  
Inside setTimeout  
Inside setImmediate  
```

### 🧐 Why This Order?
1️⃣ Synchronous code runs first → "Start" and "End" print immediately.
2️⃣ **Microtasks (like Promises)** execute next, before normal async callbacks.
3️⃣ **setTimeout()** (Timers Phase) runs next.
4️⃣ **setImmediate()** (Check Phase) runs last.

---

## 🌍 How Node.js Handles Asynchronous Tasks?
Whenever an async operation occurs (like an API call, file reading, or DB query), **Node.js delegates it to libuv**, which does the following:

✔ Uses a **thread pool** for CPU-intensive tasks (like hashing, file system operations).
✔ Uses **OS-level async features** for networking tasks.
✔ Once done, the **callback is pushed into the Event Loop** and executed in the correct phase.

### 🔥 Example: API Call
```js
console.log("Start API call");

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(data => console.log("API Response:", data))
  .catch(error => console.log("Error:", error));

console.log("End API call");
```

### 🛠 Expected Output:
```
Start API call  
End API call  
API Response: { userId: 1, id: 1, title: "delectus aut autem", completed: false }
```

### 🚀 Why is the API Response Queued?
- The `fetch()` request is sent to the OS and **does not block** execution.
- "End API call" prints immediately (sync code runs first).
- When the response arrives, its callback is **queued in the microtask queue**.
- The Event Loop **executes microtasks (like Promises) before async callbacks**.

---

## 🔄 Event Loop vs. libuv vs. OS: Who Does What?

| Component | Role |
|-----------|------|
| **Event Loop 🌀** | Manages execution order of JavaScript code, async tasks, and queued callbacks. |
| **libuv ⚙️** | Handles async operations (file I/O, timers, TCP) and provides a thread pool. |
| **Operating System (OS) 🖥️** | Handles low-level system operations like networking, file system access, and database communication. |

### 📌 How Node.js Executes Sync & Async Code?

#### ✅ **Sync Code (Executed by Event Loop)**
```js
console.log("Hello");
console.log("World");
```
**Output:**
```
Hello  
World  
```
(Runs line-by-line, no delays.)

#### ✅ **Async Tasks (Delegated to libuv & OS)**
```js
const fs = require('fs');

console.log("Start reading file");

fs.readFile("file.txt", "utf-8", (err, data) => {
    if (err) console.error(err);
    console.log("File Content:", data);
});

console.log("End of script");
```
**Expected Output:**
```
Start reading file  
End of script  
File Content: <content of file.txt>
```

### 🔬 Why This Order?
1️⃣ **Sync code executes first** → "Start reading file" prints immediately.
2️⃣ **fs.readFile() is delegated to libuv** (uses a thread for file reading).
3️⃣ **"End of script" prints** (Node.js doesn't wait for file reading to finish).
4️⃣ Once reading is done, **callback is queued in the Event Loop** and executed.

---

## 🔥 Final Takeaways
✅ **Node.js is single-threaded but handles multiple tasks via async operations.**
✅ **The Event Loop ensures smooth execution without blocking the main thread.**
✅ **Async tasks are managed using libuv and OS features.**
✅ **Microtasks (like Promises) execute before async callbacks.**
✅ **Understanding the Event Loop helps write efficient, non-blocking code.**

---

# Node.js: Request Handling & Core Concepts

## 🚀 Routing Requests
Routing in Node.js determines how an application responds to different URLs and HTTP methods.

### 📌 Example: Basic Routing with HTTP Module
```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Home Page');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 🔄 Redirecting Requests
Redirects are used to send users from one URL to another.

### 📌 Example: Redirecting to Another Page
```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/old-route') {
        res.writeHead(301, { 'Location': '/new-route' });
        res.end();
    } else if (req.url === '/new-route') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('New Route');
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

---

## 📩 Parsing Request Bodies
When handling POST or PUT requests, we need to parse the incoming data.

### 📌 Example: Parsing JSON Request Body
```js
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Data received', data: parsedData }));
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));
```
***

- `req.on('end', callback)` registers a listener for the `'end'` event.
- The callback function is associated with the `'end'` event but does not execute immediately.
- Once all data has arrived, Node.js (via OS or internal mechanisms) emits the `'end'` event.
- The registered callback is then pushed into the event loop's callback queue.
- The event loop executes the callback when the call stack is free.
- **Key takeaway:** `req.on('end', callback)` registers an event listener; the callback executes later when the `'end'` event is emitted.

***
---

## ⚡ Understanding Event-Driven Execution
Node.js is event-driven, meaning that it listens for events and executes callbacks accordingly.

### 📌 Example: Event Emitter
```js
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

eventEmitter.emit('greet', 'Alice');
```

### Step-by-Step Execution Flow

| Step | Code Execution | What Happens Internally? |
|------|---------------|--------------------------|
| 1️⃣  | `require('events')` | Loads the `events` module into memory |
| 2️⃣  | `new EventEmitter()` | Creates an instance of `EventEmitter` |
| 3️⃣  | `eventEmitter.on('greet', callback)` | Registers an event listener for "greet" |
| 4️⃣  | `eventEmitter.emit('greet', 'Alice')` | Triggers "greet" event and executes its callback |
| 5️⃣  | `console.log("Hello, Alice!")` | The callback runs synchronously and prints to the console |

### 🔹 Final Output:
```
Hello, Alice!
```

---

### 📌 Understanding "Registration" and "Execution"

#### **1️⃣ Registration**
- The `eventEmitter.on('greet', callback)` registers an event listener.
- This means that whenever the "greet" event is emitted, the provided function will run.

#### **2️⃣ Execution**
- When `eventEmitter.emit('greet', 'Alice')` is called, it triggers the event, executing all registered listeners for "greet".
- The listener function receives `'Alice'` as an argument and prints `Hello, Alice!`.

---

### 📌 How the Event System Works Internally

#### **Registering Listeners (`on` method)**
- The `on` method stores event listeners in an **internal event registry**.
- When an event is emitted, Node.js **looks up all registered listeners** and executes them.

#### **Emitting an Event (`emit` method)**
- The `emit` method **synchronously** executes all callbacks for that event.
- It passes the provided arguments (`'Alice'`) to the callback function.

---

## 🚀 Blocking vs Non-Blocking Code

### 🔴 Blocking Code (Synchronous)
Blocks execution until a task is completed.
```js
const fs = require('fs');
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
console.log('This runs after file reading is done.');
```

### 🟢 Non-Blocking Code (Asynchronous)
Executes other code while waiting for a task to complete.
```js
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
console.log('This runs before file reading is done.');
```

---

## 📦 Node.js Module System
Node.js follows a modular approach using CommonJS modules.

### 📌 Exporting a Module
```js
// math.js
module.exports.add = (a, b) => a + b;
```

### 📌 Importing a Module
```js
const math = require('./math');
console.log(math.add(5, 3));
```

---

## 📁 FS Module: File System Operations
The `fs` module provides methods for working with files.

### 📌 Writing to a File
```js
fs.writeFile('test.txt', 'Hello, Node.js!', (err) => {
    if (err) throw err;
    console.log('File created!');
});
```

### 📌 Reading a File
```js
fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### 📌 Appending to a File
```js
fs.appendFile('test.txt', '\nAppended Content', (err) => {
    if (err) throw err;
    console.log('Content added!');
});
```

### 📌 Deleting a File
```js
fs.unlink('test.txt', (err) => {
    if (err) throw err;
    console.log('File deleted!');
});
```

---

## 🔄 Understanding Request Streams (`req.on` and `res` Methods)
Node.js handles HTTP requests as streams.

### 📌 Handling Request Chunks
```js
const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Received: ${body}`);
    });
});

server.listen(3000);
```

### 📌 Most Used `res` Methods
| Method | Description |
|--------|-------------|
| `res.writeHead(statusCode, headers)` | Sets response status and headers. |
| `res.write(data)` | Writes data to response body. |
| `res.end([data])` | Ends response, optionally sending data. |
| `res.setHeader(name, value)` | Sets an HTTP response header. |
| `res.getHeader(name)` | Retrieves an HTTP header value. |
| `res.statusCode = code` | Sets the status code manually. |

### 📌 Example: Sending JSON Response
```js
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello, JSON!' }));
});

server.listen(3000);
```

---

### 🎯 Conclusion
Node.js efficiently handles HTTP requests using an **event-driven, non-blocking model**. Its module system, file system operations, and request handling make it ideal for building scalable applications.

# Express.js Overview

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It simplifies building web servers by providing a straightforward API for handling routes, middleware, and request processing.

## How Express.js Works

Express.js operates by:
1. Creating an instance of an Express application.
2. Defining middleware to process requests.
3. Setting up routes to handle different HTTP methods.
4. Listening on a specified port to serve requests.

## Middleware in Express.js

Middleware functions are functions that have access to the request (`req`), response (`res`), and the `next` function in the application’s request-response cycle. Middleware can:
- Execute code.
- Modify the request and response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

### Example Middleware:
```javascript
const express = require('express');
const app = express();

// Middleware function
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next(); // Pass control to the next handler
});
```

## Handling Different Routes

Express allows handling different routes using `app.get()`, `app.post()`, `app.put()`, `app.delete()`, etc.

### Example Route Handling:
```javascript
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});
```

## Parsing Incoming Requests

Express provides middleware such as `express.json()` and `express.urlencoded()` to parse incoming request bodies.

### Example of Parsing JSON:
```javascript
app.use(express.json());

app.post('/data', (req, res) => {
    console.log(req.body); // Access parsed JSON data
    res.send('Data received');
});
```

### Example of Parsing URL Encoded Data:
```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
    console.log(req.body); // Access form data
    res.send('Form data received');
});
```

## Handling GET and POST Requests

### Handling GET Request:
```javascript
app.get('/users', (req, res) => {
    res.json({ message: 'List of users' });
});
```

### Handling POST Request:
```javascript
app.post('/users', (req, res) => {
    const user = req.body;
    res.json({ message: 'User added', user });
});
```

## Running the Express Server

Finally, start the Express server using:
```javascript
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

This will start a web server on port `3000`, and it will be ready to handle incoming requests.
