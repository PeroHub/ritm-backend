const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  faculty: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Program = mongoose.model('Program', programSchema);
module.exports = Program;