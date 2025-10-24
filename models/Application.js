const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: {type: String, required: true},
  program: { type: String, required: true },
}, { timestamps: true }); // `createdAt` will act as 'submittedOn'

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;