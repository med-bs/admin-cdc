import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import kafkaService from "./kafkaService";

const initialState = {
    kafkaConnectors: [],
    kafkaConnector: null,
    kafkaIsError: false,
    KafkaIsSuccess: false,
    kafkaIsLoading: false,
    kafkaMessage: "",
};

// Save kafka Connector
export const createKafkaConnector = createAsyncThunk(
    "kafka/connector/save",
    async (connectorData, thunkAPI) => {
        try {
            return await kafkaService.saveKafkaConnect(connectorData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get all kafka Connectors
export const getAllKafkaConnectors = createAsyncThunk(
    "kafka/connector/getall",
    async (_, thunkAPI) => {
        try {
            return await kafkaService.getAllKafkaConnect();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// get kafka Connectors
export const getKafkaConnector = createAsyncThunk(
    "kafka/connector/get",
    async (connectorName, thunkAPI) => {
        try {
            return await kafkaService.getKafkaConnect(connectorName);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// delete kafka Connectors
export const deleteKafkaConnector = createAsyncThunk(
    "kafka/connector/delete",
    async (connectorName, thunkAPI) => {
        try {
            return await kafkaService.deleteKafkaConnect(connectorName);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const kafkaConnectorSlice = createSlice({
    name: "kafka",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(createKafkaConnector.pending, (state) => {
                state.kafkaIsLoading = true;
            })
            .addCase(createKafkaConnector.fulfilled, (state, action) => {
                state.kafkaIsLoading = false;
                state.KafkaIsSuccess = true;
                state.kafkaConnector = action.payload.name
                state.kafkaConnectors.push(action.payload.name);

            })
            .addCase(createKafkaConnector.rejected, (state, action) => {
                state.kafkaIsLoading = false;
                state.kafkaIsError = true;
                state.message = action.payload;
            })


            .addCase(getAllKafkaConnectors.pending, (state) => {
                state.kafkaIsLoading = true;
            })
            .addCase(getAllKafkaConnectors.fulfilled, (state, action) => {
                state.kafkaIsLoading = false;
                state.KafkaIsSuccess = true;
                state.kafkaConnectors = action.payload;
            })
            .addCase(getAllKafkaConnectors.rejected, (state, action) => {
                state.kafkaIsLoading = false;
                state.kafkaIsError = true;
                state.message = action.payload;
            })

            .addCase(deleteKafkaConnector.pending, (state) => {
                state.kafkaIsLoading = true;
            })
            .addCase(deleteKafkaConnector.fulfilled, (state, action) => {
                state.kafkaIsLoading = false;
                state.KafkaIsSuccess = true;
                console.log(action)
                if (action.meta.arg == state.kafkaConnector.name) {
                    state.kafkaConnector = null;
                }
                state.kafkaConnectors = state.kafkaConnectors.filter(
                    (kafkaConnector) => kafkaConnector.name != action.meta.arg
                );
            })
            .addCase(deleteKafkaConnector.rejected, (state, action) => {
                state.kafkaIsLoading = false;
                state.kafkaIsError = true;
                state.message = action.payload;
            })

            .addCase(getKafkaConnector.pending, (state) => {
                state.kafkaIsLoading = true;
            })
            .addCase(getKafkaConnector.fulfilled, (state, action) => {
                state.kafkaIsLoading = false;
                state.KafkaIsSuccess = true;
                state.kafkaConnector = action.payload;
            })
            .addCase(getKafkaConnector.rejected, (state, action) => {
                state.kafkaIsLoading = false;
                state.kafkaIsError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = kafkaConnectorSlice.actions;
export default kafkaConnectorSlice.reducer;