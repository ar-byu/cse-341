const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const { auth } = require('express-openid-connect')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080;

app
  .use('/api-doc', swaggerUi.serve, swaggerUi.setup('swaggerFile'))
  .use(
    auth({
      authRequired: false,
      auth0Logout: true,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET
    })
  )
  .get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
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
  .use('/', require('./routes'))

  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
