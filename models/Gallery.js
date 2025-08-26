const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  caption: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;