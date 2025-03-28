// Australia (AU) country data
const au = {
  name: 'Australia',
  code: 'AU',
  rank: 41,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '0-45% (50% discount if held 1 year)',
  capitalGainsTaxShort: '0-45%',
  wealthTax: '0%',
  incomeTax: '0-45% progressive',
  corporateTax: '30%',
  
  // Residency details
  residencyInvestment: 'AUD 2.5M ($1.6M)',
  residencyPhysicalPresence: '4 years presence for citizenship',
  residencyProcessingTime: 'Several months to over a year',
  residencyDocumentation: 'Proof of identity, residency status, character references',
  
  // Citizenship details
  citizenshipYears: '4 years of residency',
  citizenshipExceptions: 'Fast-track for ADF enlistees from US, UK, Canada',
  citizenshipLanguage: 'English proficiency',
  citizenshipProcessing: '10-11 months',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'ING Australia, Revolut, smaller banks like BOQ',
  institutionalCustody: 'Kraken Custody, Coinbase Custody, Shillings',
  defiIntegration: 'Developing, access to global platforms',
  
  // Economic factors
  economicStability: 'Projected growth 1.8% in 2025',
  inflationRate: 'Expected return to 2-3% target range in 2025',
  politicalEnvironment: 'Stable',
  bankingReliability: 'Strong, RBA maintaining financial stability',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: '4.9% lower than US',
  housingCost: '$2,000/month for two-bedroom apartment in city center',
  mealCost: 'N/A',
  
  // Risk factors
  futureRisks: 'Softer-than-expected demand',
  regulatoryClarity: 'Moderate, ATO increasing scrutiny',
  cryptoLegalStatus: 'Legal, subject to capital gains and income tax',
  taxEnforcement: 'High, ATO targeting crypto investors',
  
  // Resources
  taxAuthorityWebsite: 'https://www.ato.gov.au/',
  residencyWebsite: 'https://immi.homeaffairs.gov.au/visas/permanent-resident',
  cryptoRegulatorWebsite: 'https://asic.gov.au/',
  
  // Detailed description
  description: 'Australia taxes capital gains as part of personal income, with rates from 0% to 45% based on income brackets for 2024-2025. For cryptocurrencies, a significant tax advantage applies to assets held for over 12 months, with a 50% discount on capital gains, reducing the effective tax rate substantially. There is no wealth tax. Major banks like Commonwealth Bank restrict crypto transactions, but ING Australia and fintechs like Revolut offer more support. Institutional custody is available through Kraken Custody, which expanded to Australia offering custody for Bitcoin, Ethereum, and USD Coin, and global providers like Coinbase Custody. DeFi integration is still developing, with no prominent local platforms but access to global services like Uniswap, Aave, and Compound. Residency typically requires skilled worker qualifications or substantial investment, with a points-based system for permanent residency. Citizenship via naturalization requires 4 years of residency, including 12 months as a permanent resident, with physical presence requirements and passing a citizenship test. The economy is expected to recover gradually in 2025, with modest growth after a slow 2024, projected at around 1.8%.'
};

module.exports = au;