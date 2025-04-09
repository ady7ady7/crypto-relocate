// backend/routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getCountries, 
  getCountryById, 
  getCountryByCode,
  getCountryDetails 
} = require('../controllers/countryController');

// GET route for country details by code
router.route('/details/:code').get(getCountryDetails);

// GET route for country by code - needs to come before the :id route to avoid conflict
router.route('/code/:code').get(getCountryByCode);

// Standard routes
router.route('/').get(getCountries);
router.route('/:id').get(getCountryById);

module.exports = router;