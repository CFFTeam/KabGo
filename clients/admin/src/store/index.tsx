import { configureStore } from '@reduxjs/toolkit';

import dashboardReducer from './dashboard';

const store = configureStore({
  reducer: { dashboard: dashboardReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
