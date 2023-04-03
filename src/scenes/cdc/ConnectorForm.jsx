import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createConnector } from "../../api/cdc/connectorSlice";
import CircularProgressBar from "../../components/CircularProgressBar";

const ConnectorForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError,isLoading, isSuccess, message } = useSelector(
    (state) => state.cdc
  );

  useEffect(() => {

    if (isError) {
      console.log("create connector isError " + message + " end");
    }

  }, [isError, isSuccess, message, dispatch])

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    dispatch(createConnector(values));
    navigate('/connectors');
  };

  if (isLoading) {
    return (
      <Box m="20px" justifyContent="center" display="flex">
        <CircularProgressBar />
      </Box>
    );
  } else {

    return (
      <Box m="20px">
        <Header title="CONNECTOR" subtitle="Create & Save New Connector" />

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Connector Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Kafka Topic"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.kafka_topic}
                  name="kafka_topic"
                  error={!!touched.kafka_topic && !!errors.kafka_topic}
                  helperText={touched.kafka_topic && errors.kafka_topic}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Config Connector Class"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.connector_class}
                  name="connector_class"
                  error={!!touched.connector_class && !!errors.connector_class}
                  helperText={touched.connector_class && errors.connector_class}
                  sx={{ gridColumn: "span 3" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Tasks Max"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tasks_max}
                  name="tasks_max"
                  error={!!touched.tasks_max && !!errors.tasks_max}
                  helperText={touched.tasks_max && errors.tasks_max}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Database Hostname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.database_hostname}
                  name="database_hostname"
                  error={!!touched.database_hostname && !!errors.database_hostname}
                  helperText={touched.database_hostname && errors.database_hostname}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Database User"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.database_user}
                  name="database_user"
                  error={!!touched.database_user && !!errors.database_user}
                  helperText={touched.database_user && errors.database_user}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Database Port"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.database_port}
                  name="database_port"
                  error={!!touched.database_port && !!errors.database_port}
                  helperText={touched.database_port && errors.database_port}
                  sx={{ gridColumn: "span 1" }}
                />


                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Database Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.database_password}
                  name="database_password"
                  error={!!touched.database_password && !!errors.database_password}
                  helperText={touched.database_password && errors.database_password}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Database Server Id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.database_server_id}
                  name="database_server_id"
                  error={!!touched.database_server_id && !!errors.database_server_id}
                  helperText={touched.database_server_id && errors.database_server_id}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Topic Prefix"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.topic_prefix}
                  name="topic_prefix"
                  error={!!touched.topic_prefix && !!errors.topic_prefix}
                  helperText={touched.topic_prefix && errors.topic_prefix}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Database Include List"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.database_include_list}
                  name="database_include_list"
                  error={!!touched.database_include_list && !!errors.database_include_list}
                  helperText={touched.database_include_list && errors.database_include_list}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Schema History Internal Kafka Bootstrap Servers"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.schema_history_internal_kafka_bootstrap_servers}
                  name="schema_history_internal_kafka_bootstrap_servers"
                  error={!!touched.schema_history_internal_kafka_bootstrap_servers && !!errors.schema_history_internal_kafka_bootstrap_servers}
                  helperText={touched.schema_history_internal_kafka_bootstrap_servers && errors.schema_history_internal_kafka_bootstrap_servers}
                  sx={{ gridColumn: "span 1" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Schema History Internal Kafka Topic"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.schema_history_internal_kafka_topic}
                  name="schema_history_internal_kafka_topic"
                  error={!!touched.schema_history_internal_kafka_topic && !!errors.schema_history_internal_kafka_topic}
                  helperText={touched.schema_history_internal_kafka_topic && errors.schema_history_internal_kafka_topic}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="20px" >
                <Button type="submit" color="secondary" variant="contained">
                  Create New Connector
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  }

}

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  kafka_topic: yup.string().required("required"),
  connector_class: yup.string().required("required"),
  tasks_max: yup.number("must be integer")
    .integer("must be integer")
    .positive("must be positive").required("required"),
  database_hostname: yup.string().required("required"),
  database_port: yup.number("port must be integer")
    .integer("port must be integer")
    .positive("port must be positive")
    .required("required"),
  database_user: yup.string().required("required"),
  database_password: yup.string().required("required"),
  database_server_id: yup.number("id must be integer")
    .integer("id must be integer")
    .positive("id must be positive").required("required"),
  topic_prefix: yup.string().required("required"),
  database_include_list: yup.string().required("required"),
  schema_history_internal_kafka_bootstrap_servers: yup.string()
    .matches(/^kafka:\d+$/, {
      message: "Must be in the format 'kafka:xxxx', where xxxx is kafka port number",
      excludeEmptyString: true,
    })
    .required("required"),
  schema_history_internal_kafka_topic: yup.string().required("required"),
});

const initialValues = {
  name: "inventory-connector",
  kafka_topic: "dbserver1.inventory.customers",
  connector_class: "io.debezium.connector.mysql.MySqlConnector",
  tasks_max: "1",
  database_hostname: "mysql",
  database_port: "3306",
  database_user: "root",
  database_password: "root",
  database_server_id: "184054",
  topic_prefix: "dbserver1",
  database_include_list: "inventory",
  schema_history_internal_kafka_bootstrap_servers: "kafka:9092",
  schema_history_internal_kafka_topic: "schema-changes.inventory"
};

export default ConnectorForm;