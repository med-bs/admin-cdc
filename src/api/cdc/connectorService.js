import axios from "axios";
import { formatConnectorData } from "../API_utils";

const API_URL = "http://localhost:8096/api/v1";

// get page Connectors
const getPageConnectors = async (pageData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "/watcherspage", { params: { page: pageData.page, size: pageData.size } }, config);
    return response.data;
};

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

// Create new Connector
const createConnector = async (connectorData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/addwatcher", formatConnectorData(connectorData), config);

    return response.data;
};

// Run Connector
const runConnector = async (connectorData , token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response =await axios.post(API_URL + "/runwatcher", connectorData, config);
    return response.data;
};

// Stop Connector
const stopConnector = async (connectorName, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'text/plain',
        },
    };



    const response = await axios.put(API_URL + "/stopwatcher", connectorName, config);

    return response.data;
};

// Get Connector Status
const getConnectorStatus = async (conectorName, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    const response = await axios.get(API_URL + "/watcherstatus/" + conectorName, config);

    return response.data;
};

const ConnectorService = {
    getPageConnectors,
    getConnectorStatus,
    getConnectors,
    createConnector,
    runConnector,
    stopConnector
};

export default ConnectorService;