import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getConnectorStatus, getConnectors, reset, runConnector, stopConnector } from "../../api/cdc/connectorSlice";
import { tokens } from "../../theme";

import { IconButton } from '@mui/material';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import CircularProgressBar from "../../components/CircularProgressBar";
import ErrorBar from "../../components/ErrorBar";
import { createKafkaConnector, getAllKafkaConnectors } from "../../api/cdc/kafkaSlice";

const Connectors = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();

    const { connectors, isLoading, isError, message } = useSelector(
        (state) => state.cdc
    );

    const { kafkaConnectors, kafkaIsLoading, kafkaIsError, kafkaMessage } = useSelector(
        (state) => state.kafka
    );

    const onRefrech = (name) => {
        dispatch(getConnectorStatus(name));
    }

    const onPlay = (name, table) => {
        const connectorData = {
            containerName: name,
            topicName: table
        }
        dispatch(runConnector(connectorData));
    }

    const onStop = (name) => {
        dispatch(stopConnector(name));
    }

    const onAdd = (data) => {
        dispatch(createKafkaConnector(data));
    }

    useEffect(() => {

        dispatch(getAllKafkaConnectors());

        dispatch(getConnectors());

        if (!isError) {
            dispatch(reset());
        }

    }, [isError, message, dispatch])

    if (isLoading || kafkaIsLoading) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        const columns = [
            { field: "name", headerName: "Name", flex: 1 },
            { field: "kafka_topic", headerName: "Kafka Topic", flex: 1 },
            {
                field: "status",
                headerName: "Status",
                headerAlign: "center",
                flex: 1,
                renderCell: ({ row: { status } }) => {
                    return (
                        <Box

                            width="60%"
                            m="0 auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                status === "not found"
                                    ? colors.redAccent[700]
                                    : status === "running"
                                        ? colors.greenAccent[700]
                                        : colors.blueAccent[700]
                            }
                            borderRadius="4px"
                        >
                            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                                {status}
                            </Typography>
                        </Box>
                    );
                },
            },
            {
                field: "name1",
                headerName: "Start Connector",
                headerAlign: "center",
                flex: 1,
                renderCell: (row) => {
                    return (
                        <Box
                            width="80%"
                            m="0 auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={
                                row.row.status === "not found"
                                    ? colors.redAccent[700]
                                    : row.row.status === "running"
                                        ? colors.greenAccent[700]
                                        : colors.blueAccent[700]
                            }
                            borderRadius="4px"
                        >
                            <IconButton onClick={() => onPlay(row.row.name, row.row.kafka_topic)} disabled={row.row.status === "running"}><PlayCircleOutlineOutlinedIcon color={colors.grey[100]} /></IconButton>
                            <IconButton onClick={() => onStop(row.row.name)} disabled={row.row.status !== "running"}><StopCircleOutlinedIcon color={colors.grey[100]} /></IconButton>
                            <IconButton onClick={() => onRefrech(row.row.name)}><AutorenewIcon color={colors.grey[100]} /></IconButton>

                        </Box>
                    );
                },
            },

            {
                field: "name2",
                headerName: "Kafka Connect",
                headerAlign: "center",
                flex: 1,
                renderCell: (row) => {

                    return (
                        kafkaConnectors.includes(row.row.name) ?
                            (
                                <Box
                                    width="80%"
                                    m="0 auto"
                                    p="5px"
                                    display="flex"
                                    justifyContent="center"
                                    backgroundColor={colors.greenAccent[700]}
                                    borderRadius="4px"
                                >
                                    <IconButton>
                                        <VerifiedOutlinedIcon color={colors.grey[100]} />
                                    </IconButton>
                                </Box>
                            ) : (
                                <Box
                                    width="80%"
                                    m="0 auto"
                                    p="5px"
                                    display="flex"
                                    justifyContent="center"
                                    backgroundColor={colors.redAccent[700]}
                                    borderRadius="4px"
                                >
                                    <IconButton onClick={() => onAdd(row.row)}>
                                        <AddCircleOutlineOutlinedIcon color={colors.grey[100]} />
                                    </IconButton>
                                </Box>
                            )
                    );
                },
            },
        ];


        return (

            <Box m="20px">
                <Header
                    title="CONNECTORS"
                    subtitle="List of Connectors for Future Processing"
                />
                <ErrorBar isOpen={isError} title={"Connectors List"} message={message} />
                <ErrorBar isOpen={kafkaIsError} title={"Kafka Connectors List"} message={kafkaMessage} />
                <Box
                    m="40px 0 0 0"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                >
                    {
                        connectors.length > 0 ?
                            (
                                <DataGrid
                                    rows={connectors}
                                    columns={columns}
                                    getRowId={(row) => row.name}
                                    components={{ Toolbar: GridToolbar }}
                                    pageSize={10}
                                />
                            ) : (
                                <Header
                                    title=""
                                    subtitle="Empty"
                                />
                            )
                    }

                </Box>
            </Box>
        );
    }
};

export default Connectors;