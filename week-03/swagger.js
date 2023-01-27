const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/index.js']

const doc = {
    info: {
      title: 'My API',
      description: 'Temple API',
    },
    host: 'localhost:8080',
    schemes: ['http'],
  };

swaggerAutogen(outputFile, endpointsFiles, doc)