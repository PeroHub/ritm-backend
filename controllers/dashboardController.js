const Program = require('../models/Program');
const Article = require('../models/Article');
const Gallery = require('../models/Gallery');
const Application = require('../models/Application');


const getStats = async (req, res) => {
  try {
    const totalPrograms = await Program.countDocuments();
    const newsAndEvents = await Article.countDocuments();
    const galleryImages = await Gallery.countDocuments();
    const newApplications = await Application.countDocuments(); // Simplified, can be filtered by date later

    res.status(200).json({
      totalPrograms,
      newsAndEvents,
      galleryImages,
      newApplications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getStats };