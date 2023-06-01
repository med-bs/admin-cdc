import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConnectorService from "./connectorService";

const initialState = {
  connectors: [],
  connector: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Connector
export const createConnector = createAsyncThunk(
  "connector/create",
  async (connectorData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await ConnectorService.createConnector(connectorData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get page Connector
export const getConnector = createAsyncThunk(
  "connector/get",
  async (connectorName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await ConnectorService.getConnector(connectorName, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get page Connectors
export const getConnectors = createAsyncThunk(
  "connector/getall",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await ConnectorService.getConnectors(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const connectorSlice = createSlice({
  name: "connector",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(createConnector.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createConnector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connectors.push(action.payload);

      })
      .addCase(createConnector.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getConnectors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnectors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connectors = action.payload;
      })
      .addCase(getConnectors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getConnector.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connector = action.payload;
      })
      .addCase(getConnector.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

  },
});

export const { reset } = connectorSlice.actions;
export default connectorSlice.reducer;