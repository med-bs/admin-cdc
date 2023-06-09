import axios from "axios";
import { ConnectorKafkaData } from "../API_utils";

const API_URL = "/connectors/";


// get all kafka connect
const getAllKafkaConnect = async () => {

    const response = await axios.get(API_URL);
    return response.data;
};

// get kafka connect
const getKafkaConnect = async (connectorName) => {

  const response = await axios.get(API_URL+connectorName);
  return response.data;
};

// save kafka Connector
const saveKafkaConnect = async (data) => {

    const config = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };

    const postData = ConnectorKafkaData(data);

    const response = await axios.post(API_URL , postData, config);

    return response.data;
};

// delete kafka connect
const deleteKafkaConnect = async (connectorName) => {

  const response = await axios.delete(API_URL+connectorName);
  return response.data;
};

const kafkaService = {
    getAllKafkaConnect,
    getKafkaConnect,
    deleteKafkaConnect,
    saveKafkaConnect
};

export default kafkaService;