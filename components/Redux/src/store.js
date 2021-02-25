import { configureStore, createSlice } from '@reduxjs/toolkit';

import {
  aqi_request,
  aqi_success,
  mainDataReducer,
  testReducer,
  testAdd,
} from './dataSlices';

const initialState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      state.push(action.payload);
    },
  },
});

export const { todoAdded } = todoSlice.actions;

const testMiddleware = (store) => (next) => (action) => {
  console.log(typeof action, ' <<<< action from middleware');

  if (typeof action === 'function') {
  }

  next(action);
};

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    data: mainDataReducer,
    test: testReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState(), '|||||||||||||||  subscribed');
});

store.dispatch(testAdd('testing slice'));

// store.dispatch(todoAdded('smth'));
