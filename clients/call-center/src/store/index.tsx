import {configureStore} from "@reduxjs/toolkit";
import callReceiptReducer from "./reducers/callReceiptSlice";

export const store = configureStore({
    reducer: {
        callReceipt: callReceiptReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;