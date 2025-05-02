## Redux vs Redux Toolkit Example (with Thunks and Component Usage)

### Features Covered:
- Basic state for `customers` and `accounts`
- Actions like `addCustomer`, `updateCustomer`, `deposit`, `withdraw`
- Thunks for async operations
- `useSelector` and `useDispatch` in React components

---

## 🧱 Plain Redux Implementation

### `store.js`
```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import customerReducer from './reducers/customerReducer';
import accountReducer from './reducers/accountReducer';

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
```

### `reducers/customerReducer.js`
```js
const initialState = {
  name: '',
  email: '',
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case 'customer/set':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
```

### `reducers/accountReducer.js`
```js
const initialState = {
  balance: 0,
};

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    default:
      return state;
  }
}
```

### `actions/accountActions.js`
```js
export const deposit = (amount) => ({ type: 'account/deposit', payload: amount });
export const withdraw = (amount) => ({ type: 'account/withdraw', payload: amount });

export const asyncDeposit = (amount) => async (dispatch) => {
  await new Promise((res) => setTimeout(res, 1000));
  dispatch(deposit(amount));
};
```

### `actions/customerActions.js`
```js
export const setCustomer = (data) => ({ type: 'customer/set', payload: data });
```

---

## ⚙️ Redux Toolkit Version

### `store.js`
```js
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';
import accountReducer from './slices/accountSlice';

const store = configureStore({
  reducer: {
    customer: customerReducer,
    account: accountReducer,
  },
});

export default store;
```

### `slices/customerSlice.js`
```js
import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    name: '',
    email: '',
  },
  reducers: {
    setCustomer: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
```

### `slices/accountSlice.js`
```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const asyncDeposit = createAsyncThunk('account/asyncDeposit', async (amount, { dispatch }) => {
  await new Promise((res) => setTimeout(res, 1000));
  dispatch(deposit(amount));
});

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    balance: 0,
  },
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
  },
});

export const { deposit, withdraw } = accountSlice.actions;
export default accountSlice.reducer;
```

---

## 🧩 React Component Usage (Same for Both)

```jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, withdraw, asyncDeposit } from './path/to/accountSlice';
import { setCustomer } from './path/to/customerSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.account.balance);
  const name = useSelector((state) => state.customer.name);

  return (
    <div>
      <h2>Welcome, {name}</h2>
      <p>Balance: ${balance}</p>

      <button onClick={() => dispatch(deposit(100))}>Deposit $100</button>
      <button onClick={() => dispatch(withdraw(50))}>Withdraw $50</button>
      <button onClick={() => dispatch(asyncDeposit(200))}>Async Deposit $200</button>
      <button onClick={() => dispatch(setCustomer({ name: 'John Doe', email: 'john@example.com' }))}>
        Set Customer
      </button>
    </div>
  );
}

export default Dashboard;
```

---
