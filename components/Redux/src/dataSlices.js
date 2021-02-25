import { createSlice } from '@reduxjs/toolkit';
import { store } from './store';

const initialState = {
  aqi_data: null,
  loading_state: {
    loading: false,
    loaded: false,
    error: false,
  },
  active_station: null,
  active_city: null,
  active_substance: null,
};

const mainDataSlice = createSlice({
  name: 'aqi_data',
  initialState,
  reducers: {
    aqi_request(state, action) {
      state.loading_state.loading = true;
    },
    aqi_success(state, action) {
      state.loading_state = { loading: false, loaded: true, error: false };
      state.aqi_data = action.payload;
    },
    aqi_failure(state, action) {
      state.loading_state = { loading: false, loaded: false, error: true };
    },
    setActiveCity(state, action) {
      state.active_city = action.payload;
    },
    setActiveStation(state, action) {
      state.active_station = action.payload;
    },
    setActiveSubstance(state, action) {
      state.active_substance = action.payload;
    },
  },
});

const testState = [];
const testSlice = createSlice({
  name: 'testSlice',
  initialState: [],
  reducers: {
    testAdd: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (text) => {
        let data = {
          value: text,
          createdAt: new Date().toString(),
        };
        return { payload: data };
      },
    },
  },
});

export const { testAdd } = testSlice.actions;

export const testReducer = testSlice.reducer;

export const {
  aqi_request,
  aqi_success,
  aqi_failure,
  setActiveCity,
  setActiveStation,
  setActiveSubstance,
} = mainDataSlice.actions;

export const mainDataReducer = mainDataSlice.reducer;
