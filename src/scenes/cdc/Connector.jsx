import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from '@mui/material';
import { tokens } from "../../theme";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Header from "../../components/Header";
import CircularProgressBar from "../../components/CircularProgressBar";
import ErrorBar from "../../components/ErrorBar";
import TextBox from "../../components/TextBox";
import { getConnector } from "../../api/cdc/connectorSlice";
import { createKafkaConnector, deleteKafkaConnector, getKafkaConnector } from "../../api/cdc/kafkaSlice";

const Connector = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    let { connectorName } = useParams();


    const { connector, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.cdc
    );

    const { kafkaConnector, kafkaIsLoading, KafkaIsSuccess, kafkaIsError, kafkaMessage } = useSelector(
        (state) => state.kafka
    );

    useEffect(() => {

        dispatch(getConnector(connectorName));

        dispatch(getKafkaConnector(connectorName));

    }, [connectorName, dispatch])

    const onRemove = (values) => {
        dispatch(deleteKafkaConnector(values));
    };

    const onDelete = (values) => {
console.log(values);
    };


    const onAdd = (values) => {
        dispatch(createKafkaConnector(values));
    };

    if (isLoading || kafkaIsLoading) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        return (
            <Box m="20px">
                {/* HEADER */}
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Header title="CONNECTOR" subtitle="View Details" />
                </Box>

                <ErrorBar isOpen={isError} title={"Connector Details"} message={message} />
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="80px"
                    gap="20px"
                    padding="10px"
                >

                    <TextBox title="Name" subtitle={connector?.name} sx_gridColumn={"span 4"} />
                    <TextBox title="Kafka Topic" subtitle={connector?.kafka_topic} sx_gridColumn={"span 8"} />

                    <TextBox title="Connector Class" subtitle={connector?.config["connector.class"]} sx_gridColumn={"span 12"} />

                    <TextBox title="Database Hostname" subtitle={connector?.config["database.hostname"]} sx_gridColumn={"span 4"} />
                    <TextBox title="Database Port" subtitle={connector?.config["database.port"]} sx_gridColumn={"span 4"} />
                    <TextBox title="Database User" subtitle={connector?.config["database.user"]} sx_gridColumn={"span 4"} />

                    <TextBox title="Database" subtitle={connector?.config["database.include.list"]} sx_gridColumn={"span 4"} />
                    <TextBox title="Kafka Bootstrap Servers" subtitle={connector?.config["schema.history.internal.kafka.bootstrap.servers"]} sx_gridColumn={"span 8"} />

                    {kafkaConnector == null ? (
                        <Box
                            display="flex"
                            backgroundColor={colors.blueAccent[700]}
                            sx={{ gridColumn: "span 6" }}
                            alignItems="center"
                            justifyContent="space-evenly"
                            borderRadius={"10px"}
                        >
                            <IconButton onClick={() => onAdd(connector)}>
                                <AddCircleOutlineOutlinedIcon color={colors.grey[100]} />
                            </IconButton>
                        </Box>
                    )
                        :
                        (
                            <Box
                                display="flex"
                                backgroundColor={colors.greenAccent[700]}
                                sx={{ gridColumn: "span 6" }}
                                alignItems="center"
                                justifyContent="space-evenly"
                                borderRadius={"10px"}
                            >
                                <IconButton>
                                    <VerifiedOutlinedIcon color={colors.grey[100]} />
                                </IconButton>
                            </Box>
                        )
                    }


                    <Box
                        display="flex"
                        backgroundColor={colors.redAccent[700]}
                        sx={{ gridColumn: "span 6" }}
                        alignItems="center"
                        justifyContent="space-evenly"
                        borderRadius={"10px"}
                    >
                        <IconButton onClick={() => onRemove(connectorName)} disabled={kafkaConnector == null}>
                            <RemoveCircleOutlineOutlinedIcon color={colors.grey[100]} />
                        </IconButton>
                    </Box>

                    <Box
                        display="flex"
                        backgroundColor={colors.redAccent[700]}
                        sx={{ gridColumn: "span 12" }}
                        alignItems="center"
                        justifyContent="space-evenly"
                        borderRadius={"10px"}
                    >
                        <IconButton onClick={() => onDelete(connectorName)}>
                            <DeleteForeverOutlinedIcon color={colors.grey[100]} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        );
    }

}

export default Connector;