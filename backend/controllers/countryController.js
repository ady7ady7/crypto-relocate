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

// @desc    Get a single country by ID or code
// @route   GET /api/countries/:id
// @access  Public
const getCountryById = async (req, res) => {
  try {
    const id = req.params.id;
    let country;
    
    // First try to find by code (case-insensitive)
    country = await Country.findOne({ 
      code: { $regex: new RegExp('^' + id + '$', 'i') }
    });
    
    // If not found by code, try with MongoDB ID
    if (!country) {
      try {
        // Only attempt to find by ID if it looks like a valid MongoDB ObjectId
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
          country = await Country.findById(id);
        }
      } catch (err) {
        // Not a valid ObjectId, that's okay, we'll handle it below
      }
    }
    
    // If still not found, try to find by name (for flexibility)
    if (!country) {
      country = await Country.findOne({
        name: { $regex: new RegExp(id, 'i') }
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