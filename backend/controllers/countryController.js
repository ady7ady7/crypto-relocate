// backend/controllers/countryController.js
const Country = require('../models/Country');
const fs = require('fs');
const path = require('path');

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

// @desc    Get detailed country data by code
// @route   GET /api/countries/details/:code
// @access  Public
const getCountryDetails = async (req, res) => {
  try {
    const code = req.params.code.toLowerCase();
    
    // First, try to find the basic country info
    const country = await Country.findOne({ 
      $or: [
        { code: code.toUpperCase() },
        { code: code.toLowerCase() }
      ] 
    });
    
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    
    // Try to load the detailed country file
    try {
      // Path to the country file
      const filePath = path.resolve(__dirname, `../data/countries/${code}.js`);

      // Check if file exists
      if (fs.existsSync(filePath)) {
        // Import the country file (this is safe since we control these files)
        const countryDetails = require(filePath);
        
        // Merge with basic information if needed
        // We're using the detailed data as the primary source, but could add missing fields from the MongoDB document
        
        res.json(countryDetails);
      } else {
        // If the detailed file doesn't exist, just return the basic data
        res.json(country);
      }
    } catch (fileError) {
      console.error('Error loading country details file:', fileError);
      // If there's any error loading the file, fall back to basic data
      res.json(country);
    }
  } catch (error) {
    console.error('Error in getCountryDetails:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  getCountryByCode,
  getCountryDetails
};