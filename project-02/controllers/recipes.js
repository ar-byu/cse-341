const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const {body, validationResult} = require('express-validator')

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('recipes').find();
    result.toArray().then((lists) => {
      if (err) {
        res.status(400).json({message: err})
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send("Must use a valid recipe ID to get a recipe.")
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('recipes')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    if (err) {
      res.status(400).json({message: err})
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addRecipe = async (req, res) => {
    const recipe = {
      title: req.body.title,
      course: req.body.course,
      region: req.body.region,
      difficulty: req.body.difficulty,
      cookTime: req.body.cookTime,
      source: req.body.source,
      rating: req.body.rating
    }
    const errors = validationResult(req);
    if (errors.isEmpty())
      {const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'An error occured while trying to create the recipe. Please try again.')
      }
    } else {
      res.status(500).json(errors)
    }
  }

const updateRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send("Must use a valid recipe ID to update a recipe.")
  }

  const recipeId = new ObjectId(req.params.id);
  const recipe = {
    title: req.body.title,
    course: req.body.course,
    region: req.body.region,
    difficulty: req.body.difficulty,
    cookTime: req.body.cookTime,
    source: req.body.source,
    rating: req.body.rating
  }
  const errors = validationResult(req);
  if (errors.isEmpty())
    {const response = await mongodb.getDb().db().collection('recipes').replaceOne({_id: recipeId}, recipe);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occured while trying to update the recipe. Please try again.')
    }
  } else {
    res.status(500).json(errors)
  }
}

const deleteRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send("Must use a valid recipe ID to delete a recipe.")
  }
  const recipeId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('recipes').deleteOne({_id: recipeId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while trying to delete the recipe. Please try again.')
  }
}

module.exports = {getAll, getSingle, addRecipe, updateRecipe, deleteRecipe};