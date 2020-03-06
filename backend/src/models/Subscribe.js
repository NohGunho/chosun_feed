/**
 * Representação da tabela do BD em formato de um objeto JavaScript (abstração).
 */

const mongoose = require('mongoose');

const SubscribeSchema = new mongoose.Schema({
  "site": String,
  "first_depth_name": String,
  "first_depth_code": String,
  "second_depth_name": String,
  "second_depth_code": String,
  "third_depth_name": String,
  "third_depth_code": String,
});

module.exports = mongoose.model('section-info', SubscribeSchema);