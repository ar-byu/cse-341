const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//const {body, validationResult} = require('express-validator')

export const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('shopping-list').find();
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