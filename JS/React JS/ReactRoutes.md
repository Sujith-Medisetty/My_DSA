# 🧑‍💼 User Management App - React Router v6 Demo

A simple React app demonstrating various features of **React Router v6**.

---

## ✅ App Summary

This app includes:

- A homepage (`/`)
- A list of users (`/users`)
- A user details page (`/users/:id`)
- Query string support (`?showDetails=true`)
- Navigation examples with `Link`, `NavLink`, and `useNavigate`
- Nested and index routes

---

## 1. 🛠️ Setup Routing (`App.js`)

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/users" element={<Users />}>
          <Route index element={<div>Select a user from the list</div>} />
          <Route path=":id" element={<UserDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 2. 🔗 Navbar with `Link` and `NavLink` (`Navbar.js`)

```jsx
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink> |{" "}
      <NavLink to="/users">Users</NavLink>
    </nav>
  );
}
```

---

## 3. 🏠 Home Page (`Home.js`)

```jsx
export default function Home() {
  return <h1>Welcome to the User Management App</h1>;
}
```

---

## 4. 👥 Users Page with Nested Routes and Links (`Users.js`)

```jsx
import { Link, Outlet } from "react-router-dom";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export default function Users() {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`${user.id}?showDetails=true`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
```

---

## 5. 🔍 User Details with URL and Query Params (`UserDetails.js`)

```jsx
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UserDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const show = searchParams.get("showDetails");
    if (show !== "true") {
      navigate("/users");
    }
  }, [searchParams, navigate]);

  return (
    <div>
      <h3>Details for User ID: {id}</h3>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
```

---

## 📚 What You'll Learn

- **Routes**: Set up with `<Routes>` and `<Route>`
- **Link / NavLink**: Navigation components for route changes
- **Nested Routes**: `UserDetails` rendered within `Users` component
- **Index Routes**: Shows a default message when `/users` is visited directly
- **Dynamic Routes**: `:id` parameter for individual users
- **Query Strings**: Handles `?showDetails=true` using `useSearchParams`
- **Programmatic Navigation**: `useNavigate()` for controlled redirects
- **Browser Navigation**: Back and forward with `navigate(-1)` and `navigate(1)`

