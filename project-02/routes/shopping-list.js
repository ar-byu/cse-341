const express = require('express');
const cors = require('cors');
const router = express.Router();
const validation = require('../helpers/validation');
const {requiresAuth} = require('express-openid-connect')

const shoppingListController = require('../controllers/shopping-list')

router.use(cors());

router.get('/', shoppingListController.getAll)

router.get('/:id', shoppingListController.getSingle)

router.post('/', validation.saveListItem, requiresAuth(), shoppingListController.addItem)

router.put('/:id', validation.saveListItem, requiresAuth(), shoppingListController.updateItem)

router.delete('/:id', requiresAuth(), shoppingListController.deleteItem)

module.exports = router;