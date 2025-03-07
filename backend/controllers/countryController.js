const Country = require('../models/Country');

// @desc    Get all countries
// @route   GET /api/countries
// @access  Public
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ rank: 1 });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single country by ID
// @route   GET /api/countries/:id
// @access  Public
const getCountryById = async (req, res) => {
  try {
    // First try to find by MongoDB ID
    let country;
    
    try {
      country = await Country.findById(req.params.id);
    } catch (err) {
      // If error trying to parse as MongoDB ID, it's likely not a valid ObjectId
      country = null;
    }
    
    // If not found by ID, try to find by code (uppercase)
    if (!country) {
      country = await Country.findOne({ 
        $or: [
          { code: req.params.id.toUpperCase() },
          { code: req.params.id.toLowerCase() }
        ] 
      });
    }
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single country by code
// @route   GET /api/countries/code/:code
// @access  Public
const getCountryByCode = async (req, res) => {
  try {
    // Try to find by code (both uppercase and lowercase)
    const country = await Country.findOne({ 
      $or: [
        { code: req.params.code.toUpperCase() },
        { code: req.params.code.toLowerCase() }
      ] 
    });
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  getCountryByCode
};