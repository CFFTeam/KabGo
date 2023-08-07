import {configureStore} from "@reduxjs/toolkit";
import callReceiptReducer from "./reducers/callReceiptSlice";
import callReceiptHandlerReducer from "./reducers/callReceiptHandlerSlice";
import sidebarReducer from "./reducers/sidebarSlice";
import { setDefaultHandler } from "workbox-routing";

export const store = configureStore({
    reducer: {
        callReceipt: callReceiptReducer,
        callReceiptHandler: callReceiptHandlerReducer,
        sidebar: sidebarReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;