const Application = require('../models/Application');

const getApplications = async (req, res) => {
  const applications = await Application.find({}).sort({ createdAt: -1 });
  res.json(applications);
};

const deleteApplication = async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (application) {
    await application.remove();
    res.json({ message: 'Application removed' });
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};

module.exports = { getApplications, deleteApplication };