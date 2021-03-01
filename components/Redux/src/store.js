import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { FetchWithThunk } from '../../../HelperFunctions/lib/fetchMainDataThunk';

import {
  aqi_request,
  aqi_success,
  mainDataReducer,
  testReducer,
  testAdd,
} from './dataSlices';
import { SetActiveSubstanceMiddleware } from './middlewares/setActiveSubstanceMiddleware';

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

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    data: mainDataReducer,
    test: testReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(SetActiveSubstanceMiddleware),
});

store.subscribe(() => {
  console.log(store.getState(), '|||||||||||||||  subscribed');
});

store.dispatch(testAdd('testing slice'));

// store.dispatch(todoAdded('smth'));
