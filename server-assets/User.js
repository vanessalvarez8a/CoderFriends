var mongoose = require('mongoose');

var User = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  cart: [Carts]
})

module.exports = mongoose.model('User', User);
