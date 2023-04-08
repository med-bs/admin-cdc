export function formatConnectorData(cdc) {
    const config = {
        "connector.class": cdc.connector_class,
        "tasks.max": cdc.tasks_max,
        "database.hostname": cdc.database_hostname,
        "database.port": cdc.database_port,
        "database.user": cdc.database_user,
        "database.password": cdc.database_password,
        "database.server.id": cdc.database_server_id,
        "topic.prefix": cdc.topic_prefix,
        "database.include.list": cdc.database_include_list,
        "schema.history.internal.kafka.bootstrap.servers": cdc.schema_history_internal_kafka_bootstrap_servers,
        "schema.history.internal.kafka.topic": cdc.schema_history_internal_kafka_topic
    };

    const result = {
        name: cdc.name,
        kafka_topic: cdc.kafka_topic,
        status: cdc.status,
        config: config
    };
    return result;
}


export function formatConnectorTable(cdc) {

    const result = {
        name: cdc.name,
        kafka_topic: cdc.kafka_topic,
        status: cdc.status,
        connector_class: cdc.config["connector.class"],
        tasks_max: cdc.config["tasks.max"],
        database_hostname: cdc.config["database.hostname"],
        database_port: cdc.config["database.port"],
        database_user: cdc.config["database.user"],
        database_password: cdc.config["database.password"],
        database_server_id: cdc.config["database.server.id"],
        topic_prefix: cdc.config["topic.prefix"],
        database_include_list: cdc.config["database.include.list"],
        schema_history_internal_kafka_bootstrap_servers: cdc.config["schema.history.internal.kafka.topic"],
        schema_history_internal_kafka_topic: cdc.config["schema.history.internal.kafka.bootstrap.servers"]
    };
    return result;
}

export function ConnectorTableData(cdc) {
    const result = cdc.map((conector) => formatConnectorTable(conector));
    return result;
}

export function ConnectorKafkaData(cdc) {
    const config = {
        "connector.class": cdc.config["connector.class"],
        "tasks.max": cdc.config["tasks.max"],
        "database.hostname": cdc.config["database.hostname"],
        "database.port": cdc.config["database.port"],
        "database.user": cdc.config["database.user"],
        "database.password": cdc.config["database.password"],
        "database.server.id": cdc.config["database.server.id"],
        "database.server.name": cdc.config["topic.prefix"],
        "database.whitelist": cdc.config["database.include.list"],
        "database.history.kafka.bootstrap.servers": cdc.config["schema.history.internal.kafka.topic"],
        "database.history.kafka.topic": cdc.config["schema.history.internal.kafka.bootstrap.servers"]
    };

    const result = {
        name: cdc.name,
        config: config
    };

    return result;
}
