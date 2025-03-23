# React App with Cart and Auth Features using Context API and `useReducer`

This guide covers implementing a React app with **Cart** and **Auth** functionality using **Context API** and **`useReducer`**.

---
## Project Overview
- **Cart Features:** Add, remove, update, and read items.
- **Auth Features:** Login and logout functionality.
- **State Management:** Using Context API for sharing state and `useReducer` for deriving new state effectively.

---
## Step 1: Create Contexts

### CartContext.js
```jsx
import React, { createContext, useReducer, useContext } from 'react';

// Create Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);
        case 'UPDATE_ITEM':
            return state.map(item => item.id === action.payload.id ? action.payload : item);
        case 'READ_ITEMS':
            return state;
        default:
            return state;
    }
};

// Cart Provider
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook for Easy Access
export const useCart = () => useContext(CartContext);
```

---
### AuthContext.js
```jsx
import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Easy Access
export const useAuth = () => useContext(AuthContext);
```

---
## Step 2: Implement Components

### Cart Component
```jsx
import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
    const { cart, dispatch } = useCart();

    return (
        <div>
            <h2>Cart Items</h2>
            {cart.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}

            <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Item A' }})}>
                Add Item
            </button>

            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: 1 })}>
                Remove Item
            </button>
        </div>
    );
};

export default Cart;
```

---
### Auth Component
```jsx
import React from 'react';
import { useAuth } from './AuthContext';

const Auth = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <div>
            <h2>{isAuthenticated ? 'Logged In' : 'Logged Out'}</h2>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Auth;
```

---
## Step 3: Combine Everything in `App.js`

### App.js
```jsx
import React from 'react';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import Cart from './Cart';
import Auth from './Auth';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Cart />
                <Auth />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
```

---
## Step 4: Key Takeaways
✅ **`useReducer`** effectively handles complex state logic like cart operations.
✅ **Context API** efficiently shares state across components, reducing prop drilling.
✅ For small to medium apps, this pattern keeps code clean and simple.

# React App with Cart and Auth Features using Redux (With Out Redux ToolKit)

This guide covers implementing the **Cart** and **Auth** functionality using **Redux** without Redux Toolkit.

---
# Same above Scenario With Redux (Without Redux Toolkit)

## Step 1: Install Redux Dependencies

Run the following command to install Redux and React-Redux:
```bash
npm install redux react-redux
```

---
## Step 2: Create Redux Store

### store.js
```jsx
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;
```

---
## Step 3: Create Reducers

### cartReducer.js
```jsx
const initialState = [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload);
        case 'UPDATE_ITEM':
            return state.map(item => item.id === action.payload.id ? action.payload : item);
        case 'READ_ITEMS':
            return state;
        default:
            return state;
    }
};

export default cartReducer;
```

---
### authReducer.js
```jsx
const initialState = {
    isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false };
        default:
            return state;
    }
};

export default authReducer;
```

---
### reducers/index.js
```jsx
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

// Root Reducer
const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer
});

export default rootReducer;
```

---
## Step 4: Create Action Creators

### cartActions.js
```jsx
export const addItem = (item) => ({ type: 'ADD_ITEM', payload: item });
export const removeItem = (id) => ({ type: 'REMOVE_ITEM', payload: id });
export const updateItem = (item) => ({ type: 'UPDATE_ITEM', payload: item });
export const readItems = () => ({ type: 'READ_ITEMS' });
```

---
### authActions.js
```jsx
export const login = () => ({ type: 'LOGIN' });
export const logout = () => ({ type: 'LOGOUT' });
```

---
## Step 5: Implement Components

### Cart Component
```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './actions/cartActions';

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Cart Items</h2>
            {cart.map(item => (
                <p key={item.id}>{item.name}</p>
            ))}

            <button onClick={() => dispatch(addItem({ id: 1, name: 'Item A' }))}>
                Add Item
            </button>

            <button onClick={() => dispatch(removeItem(1))}>
                Remove Item
            </button>
        </div>
    );
};

export default Cart;
```

---
### Auth Component
```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './actions/authActions';

const Auth = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>{isAuthenticated ? 'Logged In' : 'Logged Out'}</h2>
            <button onClick={() => dispatch(login())}>Login</button>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
};

export default Auth;
```

---
## Step 6: Combine Everything in `App.js`

### App.js
```jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './Cart';
import Auth from './Auth';

function App() {
    return (
        <Provider store={store}>
            <Cart />
            <Auth />
        </Provider>
    );
}

export default App;
```

---
## Step 7: Key Concepts & Flow
1. **Store**: Centralizes state for the entire application.
2. **Reducer**: Pure functions that determine how state changes based on actions.
3. **Actions**: Define the type of state change and hold relevant data.
4. **Provider**: Provides the Redux store to the application tree.
5. **`useSelector`**: Retrieves the required part of the state from the Redux store.
6. **`useDispatch`**: Dispatches actions to update the state.

---
✅ This version effectively handles **multiple states** with independent reducers.
✅ Each state has dedicated logic and clear action flows for better scalability.

# React App with Cart and Auth Features using Redux Toolkit

This guide covers implementing the **Cart** and **Auth** functionality using **Redux Toolkit** with improved structure, simplicity, and best practices.

---
## Step 1: Install Redux Toolkit

Run the following command to install Redux Toolkit and React-Redux:
```bash
npm install @reduxjs/toolkit react-redux
```

---
## Step 2: Create Redux Store

### store.js
```jsx
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer
    }
});

export default store;
```

---
## Step 3: Create Slices

### cartSlice.js
```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            return state.map(item => 
                item.id === action.payload.id ? action.payload : item
            );
        },
        readItems: (state) => state
    }
});

export const { addItem, removeItem, updateItem, readItems } = cartSlice.actions;
export default cartSlice.reducer;
```

---
### authSlice.js
```jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

---
## Step 4: Implement Components

### Cart Component
```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from './features/cartSlice';

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>Cart Items</h2>
            {cart.map(item => (
                <p key={item.id}>{item.name}</p>
            ))}

            <button onClick={() => dispatch(addItem({ id: 1, name: 'Item A' }))}>
                Add Item
            </button>

            <button onClick={() => dispatch(removeItem(1))}>
                Remove Item
            </button>
        </div>
    );
};

export default Cart;
```

---
### Auth Component
```jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './features/authSlice';

const Auth = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>{isAuthenticated ? 'Logged In' : 'Logged Out'}</h2>
            <button onClick={() => dispatch(login())}>Login</button>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
    );
};

export default Auth;
```

---
## Step 5: Combine Everything in `App.js`

### App.js
```jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './Cart';
import Auth from './Auth';

function App() {
    return (
        <Provider store={store}>
            <Cart />
            <Auth />
        </Provider>
    );
}

export default App;
```

---
## Step 6: Key Concepts & Flow
1. **`configureStore()`**: Simplifies store creation with better defaults.
2. **Slices**: Combines action creators and reducers into a single unit.
3. **Immer** (built-in): Allows safe state mutations within reducers.
4. **`useSelector`**: Retrieves the required part of the state from the Redux store.
5. **`useDispatch`**: Dispatches actions to update the state.

---
## Step 7: Key Benefits of Redux Toolkit Over Traditional Redux
✅ Reduces boilerplate code by combining reducers and actions into slices.
✅ Provides improved performance with built-in optimizations.
✅ Uses Immer library internally, making state updates safer and easier.
✅ Enforces best practices by default for scalability and maintainability.

