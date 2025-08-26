const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); // To parse JSON bodies

// API Routes
app.get('/', (req, res) => {
  res.send('Ritman College API is running...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));