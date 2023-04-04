import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import connectorReducer from "./cdc/connectorSlice";
import kafkaReducer from "./cdc/kafkaSlice"
import customerReducer from "./bank/customerSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,

        cdc: connectorReducer,
        kafka: kafkaReducer,

        customers:customerReducer,
    },
});