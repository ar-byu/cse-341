const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const app = express();
const port = process.env.PORT || 8080;

app
    .use('/api-doc', swaggerUi.serve, swaggerUi.setup('swaggerFile'))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, 2-Key'
        )
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
