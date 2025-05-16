// const express = require('express');
// const router = express.Router();
// const { addItem, getItems,getItemById, deleteItem } = require('../controllers/itemController');
// router.post('/add', addItem);
// router.get('/items', getItems);
// router.get('/items/:id', getItemById);
// router.delete('/item/:id', deleteItem);

// module.exports = router;





const express = require('express');
const router = express.Router();
const { addItem, getItems, searchItemByName, deleteItem } = require('../controllers/itemController');


router.post('/add', addItem);

router.get('/items', getItems);


router.get('/search', searchItemByName);

router.delete('/item/:id', deleteItem);

module.exports = router;
