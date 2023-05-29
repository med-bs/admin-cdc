import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import connectorReducer from "./cdc/connectorSlice";
import kafkaReducer from "./cdc/kafkaSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,

        cdc: connectorReducer,
        kafka: kafkaReducer,
    },
});