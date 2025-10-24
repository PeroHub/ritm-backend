const Application = require('../models/Application');

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const addApplication = async (req, res) => {
  try {
    const { applicantName, email, phone, program} = req.body;
    if ( !applicantName || !email || !phone || !program) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const newApplication = new Application({
      applicantName,
      email,
      phone,
      program
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);

  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error' });
  }
}

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      res.status(404).json({ message: 'Application not found' });
    } 
    res.json({ message: 'Application removed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getApplications, deleteApplication, addApplication };