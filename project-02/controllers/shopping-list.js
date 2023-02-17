const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const {body, validationResult} = require('express-validator')

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('shopping-list').find();
    result.toArray().then((lists) => {
      //if (err) {
      //  res.status(400).json({message: err})
      //}
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send("Must use a valid recipe ID to get an ingredient.")
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('shopping-list')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    //if (err) {
    //  res.status(400).json({message: err})
    //}
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addItem = async (req, res) => {
  const item = {
    item: req.body.item,
    amount: req.body.amount,
    recipe: req.body.recipe
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const response = await mongodb.getDb().db().collection('shopping-list').insertOne(item);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'An error occured while trying to add the entry. Please try again.')
    }
  } else {
    res.status(500).json(errors)
  }
}

const updateItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send("Must use a valid item ID to update an item.")
  }

  const itemId = new ObjectId(req.params.id);
  const item = {
    item: req.body.item,
    amount: req.body.amount,
    recipe: req.body.recipe
  }
  const errors = validationResult(req);
  if (errors.isEmpty())
    {const response = await mongodb.getDb().db().collection('shopping-list').replaceOne({_id: itemId}, item);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occured while trying to update the item. Please try again.')
    }
  } else {
    res.status(500).json(errors)
  }
}

const deleteItem = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send("Must use a valid item ID to delete an item.")
  }
  const itemId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('shopping-list').deleteOne({_id: itemId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while trying to delete the item. Please try again.')
  }
}

module.exports = { getAll, getSingle, addItem, updateItem, deleteItem }