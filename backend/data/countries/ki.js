// Kiribati (KI) country data
const ki = {
  name: 'Kiribati',
  code: 'KI',
  rank: 73,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '0% (no regulations)',
  capitalGainsTaxShort: '0% (de facto)',
  wealthTax: '0%',
  incomeTax: '25-35%',
  corporateTax: '30%',

  // Residency details
  residencyInvestment: 'Employment-based only',
  residencyPhysicalPresence: 'Valid reason for staying required',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Passport, proof of address, employment contract',
  
  // Citizenship details
  citizenshipYears: '7+ years of residence',
  citizenshipExceptions: 'None specified',
  citizenshipLanguage: 'Local language proficiency',
  citizenshipProcessing: 'Several years',
  
  // Financial infrastructure
  financialServices: 'Minimal',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'None',
  
  // Economic factors
  economicStability: 'Low with foreign aid dependency',
  inflationRate: '6% in 2023, falling to 3% expected',
  politicalEnvironment: 'Stable democracy with occasional tensions',
  bankingReliability: 'Limited',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: 'Much lower than US',
  housingCost: 'AUD 228-423/month',
  mealCost: 'AUD 3.49-20.30',
  
  // Risk factors
  futureRisks: 'International pressure',
  regulatoryClarity: 'Low with conflicting tax interpretations',
  cryptoLegalStatus: 'Not explicitly regulated',
  taxEnforcement: 'Low with limited infrastructure',
  
  // Resources
  taxAuthorityWebsite: 'Ministry of Finance, no dedicated website',
  residencyWebsite: 'https://www.mfa.gov.ki/immigration/',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Kiribati does not impose specific capital gains taxes on cryptocurrency. World Bank data shows taxes on income, profits, and capital gains accounted for 37.81% of total tax revenue (29.1 million Kiribati dollars), suggesting general income tax may apply to crypto gains. However, Voronoi (Feb 2025) lists Kiribati among countries with no crypto-specific taxation. If crypto is classified as non-business income, gains may be untaxed under existing laws, while crypto gains could fall under general income tax if deemed business activity. No local banks (e.g., Development Bank of Kiribati) offer crypto services, forcing users to rely on third-party platforms like EasyEquities (top broker in Kiribati, offering 62+ cryptos, low fees) and Interactive Brokers (limited to 4 cryptos but regulated). Kiribati lacks licensed crypto custody providers, with users turning to global options like ChainUp Custody and Fireblocks. No DeFi-specific laws exist, with transactions falling under general financial regulations. Kiribati imposes no wealth tax on crypto holdings. Temporary residency is granted for employment, study, or family reunification, requiring valid passport, police clearance, and proof of income (≥AUD 500/month), with processing taking 60-90 days. Citizenship requires 7+ continuous years of residency, basic English proficiency (24.2% speak English), and mandatory renunciation of other citizenships.'
};

module.exports = ki;