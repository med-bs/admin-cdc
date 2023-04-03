import axios from "axios";

const API_URL = "/connectors/";


// get all kafka connect
const getAllKafkaConnect = async () => {

    const response = await axios.get(API_URL);
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

    const postData = {...data, kafka_topic:undefined, status:undefined};

    const response = await axios.post(API_URL , postData, config);

    return response.data;
};

const kafkaService = {
    getAllKafkaConnect,
    saveKafkaConnect
};

export default kafkaService;