import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getConnectors, reset } from "../../api/cdc/connectorSlice";
import { tokens } from "../../theme";

import { IconButton } from '@mui/material';

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

    const onAdd = (data) => {
        dispatch(createKafkaConnector(data));
    }

    useEffect(() => {

        dispatch(getAllKafkaConnectors());

        dispatch(getConnectors());

    }, [dispatch])

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
                field: "kafka_connect",
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
                    <DataGrid
                        rows={connectors}
                        columns={columns}
                        getRowId={(row) => row?.name}
                        components={{ Toolbar: GridToolbar }}
                        pageSize={10}
                    />
                </Box>
            </Box>
        );
    }
};

export default Connectors;