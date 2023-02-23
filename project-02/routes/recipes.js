const express = require('express');
const cors = require('cors');
const router = express.Router();
const validation = require('../helpers/validation');
const {requiresAuth} = require('express-openid-connect');

const recipesController = require('../controllers/recipes');

router.use(cors());

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', validation.saveRecipe, requiresAuth(), recipesController.addRecipe);

router.put('/:id', validation.saveRecipe, requiresAuth(), recipesController.updateRecipe);

router.delete('/:id', requiresAuth(), recipesController.deleteRecipe);

module.exports = router;