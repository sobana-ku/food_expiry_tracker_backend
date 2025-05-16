
const FoodItem = require('../models/FoodItem');

const addItem = async (req, res) => {
  const { name, quantity, expiryDate, category } = req.body;
  if (!name || !quantity || !expiryDate || !category) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }
  try {
    const newItem = new FoodItem({ name, quantity, expiryDate, category });
    await newItem.save();
    res.status(201).json({ message: 'Food item added', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding item' });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await FoodItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};


const searchItemByName = async (req, res) => {
  const { name } = req.query;
  try {
    const items = await FoodItem.find({
      name: { $regex: new RegExp(name, 'i') } 
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error searching item by name' });
  }
};


const deleteItem = async (req, res) => {
  try {
    const deleted = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};

module.exports = { addItem, getItems, searchItemByName, deleteItem };
