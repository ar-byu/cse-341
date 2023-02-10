const express = require('express');
const cors = require('cors');
const router = express.Router();
const validation = require('../helpers/validation');

const recipesController = require('../controllers/recipes');

router.use(cors());

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', validation.saveRecipe, recipesController.addRecipe);

router.put('/:id', validation.saveRecipe, recipesController.updateRecipe);

router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;