import { configureStore } from "@reduxjs/toolkit";

import DashboardReducer from "./dashboard";
import SidebarReducer from "./sidebar";

const store = configureStore({
  reducer: { dashboard: DashboardReducer, sidebar: SidebarReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
