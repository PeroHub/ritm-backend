const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  articleImage: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;