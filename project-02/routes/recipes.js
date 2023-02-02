const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', recipesController.addRecipe);

module.exports = router;