const express = require('express');
const cors = require('cors');
const router = express.Router();
const validation = require('../helpers/validation');

const shoppingListController = require('../controllers/shopping-list')

router.use(cors());

router.get('/', shoppingListController.getAll)

router.get('/:id', shoppingListController.getSingle)

router.post('/', validation.saveListItem, shoppingListController.addItem)

router.put('/:id', validation.saveListItem, shoppingListController.updateItem)

router.delete('/:id', shoppingListController.deleteItem)

module.exports = router;