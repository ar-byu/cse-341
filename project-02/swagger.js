const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

const doc = {
    info: {
      title: 'Project 2',
      description: 'CSE 341 Project 2',
    },
    //host: 'localhost:8080',
    //schemes: ['http']
    host: 'cse-341-project-02.onrender.com',
    schemes: ['https']
  };

swaggerAutogen(outputFile, endpointsFiles, doc)