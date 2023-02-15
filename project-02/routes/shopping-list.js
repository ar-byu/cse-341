const express = require('express');
const cors = require('cors');
const router = express.Router();

const shoppingListController = require('../controllers/shopping-list')

router.use(cors())

router.get('/', shoppingListController.getAll)