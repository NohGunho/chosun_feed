/**
 * Representação da tabela do BD em formato de um objeto JavaScript (abstração).
 */

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  site: String,
  name: String,
  title: String,
  contents: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);