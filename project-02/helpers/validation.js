const { check } = require('express-validator');
 
exports.saveRecipe = [
    check('title', 'Title is required').not().isEmpty(),
    check('course', 'Course is required').not().isEmpty(),
    check('region', 'Region is required').not().isEmpty(),
    check('difficulty', 'Difficulty is required').not().isEmpty(),
    check('cookTime', 'Cook time is required').not().isEmpty(),
    check('source', 'Source is required').not().isEmpty(),
    check('rating', 'Rating is required').not().isEmpty(),
    
]

exports.saveListItem = [
    check('item', 'Item name is required').not().isEmpty(),
    check('amount', 'Amount is required').not().isEmpty(),
]