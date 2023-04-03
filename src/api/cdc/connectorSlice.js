import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ConnectorService from "./connectorService";

const initialState = {
  connectors: [],
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
/*
// get page Connectors
export const getPageConnectors = createAsyncThunk(
  "connector/getpage",
  async (pageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await ConnectorService.getPageConnectors(pageData, token)
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
*/

// get page Connectors
export const getConnectors = createAsyncThunk(
  "connector/getall",
  async (pageData, thunkAPI) => {
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

// get Connector Status getConnectors
export const getConnectorStatus = createAsyncThunk(
  "connector/getstatus",
  async (containerName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;

      return await ConnectorService.getConnectorStatus(containerName, token)
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

// Run Connector
export const runConnector = createAsyncThunk(
  "connector/run",
  async (connectorData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await ConnectorService.runConnector(connectorData, token)
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

// Stop Connector
export const stopConnector = createAsyncThunk(
  "connector/stop",
  async (containerName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await ConnectorService.stopConnector(containerName, token)
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
      /*
            .addCase(getPageConnectors.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(getPageConnectors.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.connectors = action.payload;
            })
            .addCase(getPageConnectors.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
            })
      */

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

      .addCase(getConnectorStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnectorStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.connectors = state.connectors.map((connector) => {
          if (connector.name === action.payload.name) {
            return { ...connector, status: action.payload.status }
          }
          return connector;
        }
        );

      })
      .addCase(getConnectorStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(runConnector.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(runConnector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connectors = state.connectors.map((connector) => {
          if (connector.name === action.payload.name) {
            return { ...connector, status: action.payload.status }
          }
          return connector;
        }
        );
      })
      .addCase(runConnector.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(stopConnector.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(stopConnector.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.connectors = state.connectors.map((connector) => {
          if (connector.name === action.payload.name) {
            return { ...connector, status: action.payload.status }
          }
          return connector;
        }
        );
      })
      .addCase(stopConnector.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = connectorSlice.actions;
export default connectorSlice.reducer;