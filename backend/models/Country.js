const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String, 
    required: true,
    unique: true
  },
  rank: {
    type: Number,
    required: true
  },
  capitalGainsTax: {
    type: String,
    required: true
  },
  capitalGainsTaxShort: {
    type: String,
    required: false
  },
  wealthTax: {
    type: String,
    required: true
  },
  residencyInvestment: {
    type: String,
    required: true
  },
  financialServices: {
    type: String,
    required: true
  },
  costOfLivingIndex: {
    type: String,
    required: true
  },
  futureRisks: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Country', CountrySchema);