import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import connectorReucer from "./cdc/connectorSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cdc: connectorReucer,
    },
});