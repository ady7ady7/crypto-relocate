// United States (US) country data
const us = {
  name: 'United States',
  code: 'US',
  rank: 43,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '0-37% (short-term), 0-20% (long-term)',
  capitalGainsTaxShort: '0-37%/0-20%',
  wealthTax: '0% (federal)',
  incomeTax: '10-37% progressive federal + state',
  corporateTax: '21% federal + state',
  
  // Residency details
  residencyInvestment: 'EB5 $800k',
  residencyPhysicalPresence: 'Permanent residence status',
  residencyProcessingTime: 'Weeks to months',
  residencyDocumentation: 'Permanent address and state ID',
  
  // Citizenship details
  citizenshipYears: '5 years of residency (3 if married to US citizen)',
  citizenshipExceptions: 'Expedited for military members',
  citizenshipLanguage: 'English proficiency and civics test',
  citizenshipProcessing: 'Months to a year',
  
  // Financial infrastructure
  financialServices: 'World-class',
  cryptoFriendlyBanks: 'Revolut, Ally, Wirex, Juno, Chase, Bank of America',
  institutionalCustody: 'Anchorage, Coinbase Custody, BitGo, Gemini, Fireblocks',
  defiIntegration: 'Advanced with over 100 US-based companies',
  
  // Economic factors
  economicStability: 'Projected growth 1.8% in 2025',
  inflationRate: '2-3% expected',
  politicalEnvironment: 'Stable but challenging with polarization',
  bankingReliability: 'Strong with robust regulatory frameworks',
  
  // Living considerations
  costOfLivingIndex: 'Varies widely by state (100 national average)',
  costOfLivingVsUS: 'Baseline',
  housingCost: '$1,500-3,000/month in cities, $800-1,000 in affordable areas',
  mealCost: '$20-30 for dining out',
  
  // Risk factors
  futureRisks: 'Regulatory changes, national debt concerns',
  regulatoryClarity: 'Evolving, IRS and SEC increasing oversight',
  cryptoLegalStatus: 'Legal, regulated as property',
  taxEnforcement: 'High, new Form 1099-DA reporting from 2025',
  
  // Resources
  taxAuthorityWebsite: 'https://www.irs.gov/',
  residencyWebsite: 'https://www.uscis.gov/',
  cryptoRegulatorWebsite: 'https://www.sec.gov/',
  
  // Detailed description
  description: 'The US taxes crypto gains based on holding period: short-term (under one year) at ordinary income rates (10-37%) and long-term (over one year) at preferential capital gains rates (0-20%). There\'s an annual exemption of up to $3,000 for losses exceeding gains, with reporting required on Form 8949 and Schedule D. Starting January 1, 2025, crypto brokers must report users\' digital asset sales to the IRS via Form 1099-DA. There is no federal wealth tax. Major banks like JPMorgan Chase often restrict crypto transactions, while fintechs like Revolut and Ally offer more support. Institutional custody is well-developed with providers like Anchorage, Coinbase Custody, and BitGo. DeFi is growing rapidly with over 100 US-based companies and tokenization of real-world assets projected at $16 trillion by 2030. Residency varies by state, with Texas and Nevada being more flexible for digital nomads. Citizenship requires 5 years of residency (3 if married to a US citizen), English proficiency, and passing a civics test. The economy is projected to grow at 1.8% in 2025, with inflation expected at 2-3%. Cost of living varies dramatically by location, with Hawaii being the most expensive state and Mississippi the least.'
};

module.exports = us;