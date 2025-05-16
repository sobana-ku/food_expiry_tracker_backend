const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  category: { type: String, required: true },
  }, { timestamps: true });

const fooditems = mongoose.model('fooditems', foodItemSchema);

module.exports = fooditems;
