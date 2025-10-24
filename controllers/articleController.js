const Article = require('../models/Article');
const { cloudinary } = require('../middleware/uploadMiddleware');

const getArticles = async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: -1 });
  res.status(200).json(articles);
};


const addArticle = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  if (!req.cloudinaryResult) {
    return res.status(400).json({ message: 'Article image is required' });
  }

  const article = new Article({
    title,
    content,
    articleImage: {
      public_id: req.cloudinaryResult.public_id,
      url: req.cloudinaryResult.secure_url,
    },
  });

  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
};


const deleteArticle = async (req, res) => {
  try {
    // Find the article by ID and delete it from MongoDB in one step
    const article = await Article.findByIdAndDelete(req.params.id);

    // If no article was found with that ID
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // If the article was found and deleted, now delete its image from Cloudinary
    // The 'article' variable holds the document data as it was before deletion
    await cloudinary.uploader.destroy(article.articleImage.public_id);

    // Send the final success response
    res.json({ message: 'Article and associated image removed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getArticles, addArticle, deleteArticle };