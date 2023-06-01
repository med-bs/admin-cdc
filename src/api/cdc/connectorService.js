import axios from "axios";
import { formatConnectorData } from "../API_utils";

const API_URL = "http://localhost:8096/api/v1";

// get Connectors
const getConnectors = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "/watchers", config);
    return response.data;
};

// get Connector
const getConnector = async (connectorName, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "/watchers/" + connectorName, config);
    return response.data;
};

// Create new Connector
const createConnector = async (connectorData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const data = formatConnectorData(connectorData);

    const response = await axios.post(API_URL + "/addwatcher", data, config);

    return response.data;
};


const ConnectorService = {
    getConnectors,
    getConnector,
    createConnector,
};

export default ConnectorService;