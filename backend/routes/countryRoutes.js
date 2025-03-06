const express = require('express');
const router = express.Router();
const { getCountries, getCountryById } = require('../controllers/countryController');

router.route('/').get(getCountries);
router.route('/:id').get(getCountryById);

module.exports = router;