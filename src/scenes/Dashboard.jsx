const Dashboard = () => {

    const kibanaURL = process.env.REACT_APP_KIBANA_URL;

    return (
        <iframe
          src={kibanaURL}
          width="100%"
          height="90%"
          title="Kibana Dashboard"
        ></iframe>

    );
  };
  
  export default Dashboard;