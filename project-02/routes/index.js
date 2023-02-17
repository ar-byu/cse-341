const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipes'));
router.use('/shopping-list', require('./shopping-list'));
router.use('/api-doc', require('./swagger'));

module.exports = router;