const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const countryRoutes = require('./routes/countryRoutes');
const Country = require('./models/Country');
const countries = require('./data/countries');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/countries', countryRoutes);

// Seed data route - for development only
app.get('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await Country.deleteMany({});
    
    // Insert new data
    await Country.insertMany(countries);
    
    res.json({ message: 'Data seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Simple health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});