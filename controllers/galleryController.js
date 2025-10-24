const Gallery = require('../models/Gallery');
const { cloudinary } = require('../middleware/uploadMiddleware');


const getGalleryImages = async (req, res) => {
  const images = await Gallery.find({}).sort({ createdAt: -1 });
  res.status(200).json(images);
};


const addGalleryImage = async (req, res) => {
  const { caption } = req.body;

  if (!caption) {
    return res.status(400).json({ message: 'Image caption is required' });
  }
  if (!req.cloudinaryResult) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const galleryImage = new Gallery({
    caption,
    image: {
      public_id: req.cloudinaryResult.public_id,
      url: req.cloudinaryResult.secure_url,
    },
  });

  const createdImage = await galleryImage.save();
  res.status(201).json(createdImage);
};


const deleteGalleryImage = async (req, res) => {
  try {
    // Find the gallery record by ID and delete it from MongoDB in one go
    const galleryImage = await Gallery.findByIdAndDelete(req.params.id);

    // If no record was found with that ID, return a 404 error
    if (!galleryImage) {
      return res.status(404).json({ message: 'Image not found in gallery' });
    }

    // If the database record was deleted, now delete the actual image file from Cloudinary
    await cloudinary.uploader.destroy(galleryImage.image.public_id);

    // Send the final success response
    res.json({ message: 'Image removed from gallery successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getGalleryImages, addGalleryImage, deleteGalleryImage };