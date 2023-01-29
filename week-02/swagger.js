const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
      title: 'My Contacts API',
      description: 'an API and contacts list',
    },
    // host: 'localhost:8080',
    host: 'https://cse-341-project.onrender.com',
    schemes: ['http'],
  };

swaggerAutogen(outputFile, endpointsFiles, doc)