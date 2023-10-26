const ENV = {
    dev: {
      API_URL: 'http://192.168.0.200:3000',
    },
    staging: {
      API_URL: 'http://staging.host.com',
    },
    prod: {
      API_URL: 'http://prod.host.com',
    },
  };
  
  const getEnvVars = (env = process.env.NODE_ENV) => {
    if (env === 'production') return ENV.prod;
    if (env === 'staging') return ENV.staging;
    return ENV.dev;
  };
  
  export default getEnvVars;
  