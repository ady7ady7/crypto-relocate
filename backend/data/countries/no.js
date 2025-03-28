// Norway (NO) country data
const no = {
  name: 'Norway',
  code: 'NO',
  rank: 57,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '22%',
  capitalGainsTaxShort: '22%',
  wealthTax: '0.85% (NOK 1.7M+)',
  incomeTax: '22% flat rate for crypto',
  corporateTax: '22%',
  
  // Residency details
  residencyInvestment: 'No formal program',
  residencyPhysicalPresence: '183 days per year for tax residency',
  residencyProcessingTime: '3-6 months',
  residencyDocumentation: 'Passport, proof of income, accommodation',
  
  // Citizenship details
  citizenshipYears: '7 years (5 for Nordic citizens)',
  citizenshipExceptions: 'Marriage to Norwegian requires 3 years',
  citizenshipLanguage: 'Norwegian proficiency (B1)',
  citizenshipProcessing: '12-18 months',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'NBX (regulated exchange)',
  institutionalCustody: 'Global providers accessible',
  defiIntegration: 'Limited, global platforms accessible',
  
  // Economic factors
  economicStability: 'Growth at 1.2% in 2025',
  inflationRate: '3% in 2025',
  politicalEnvironment: 'Stable',
  bankingReliability: 'Strong, 3.8% unemployment',
  
  // Living considerations
  costOfLivingIndex: '101.4',
  costOfLivingVsUS: '14.6% higher than US',
  housingCost: 'NOK 12,000-16,000/month one-bedroom in Oslo',
  mealCost: 'NOK 150-300 at mid-range restaurant',
  
  // Risk factors
  futureRisks: 'MiCA\'s DAC8 reporting burden',
  regulatoryClarity: 'High with clear taxation framework',
  cryptoLegalStatus: 'Legal with detailed regulations',
  taxEnforcement: 'NOK 1.2B collected in 2024 crypto audits',
  
  // Resources
  taxAuthorityWebsite: 'https://www.skatteetaten.no/en/person/',
  residencyWebsite: 'https://www.udi.no/en/want-to-apply/permanent-residence/',
  cryptoRegulatorWebsite: 'https://www.finanstilsynet.no/en/',
  
  // Detailed description
  description: 'Norway taxes cryptocurrency gains at a flat rate of 22%, with no distinction between long-term and short-term holdings. Reporting is required on Form RF1159 by April 30 annually, using the FIFO method for cost basis calculation. Additionally, a wealth tax of 0.85% applies to net wealth exceeding NOK 1.7 million for individuals (NOK 3.4 million for couples), with crypto assets assessed at their January 1 market rates. Traditional banks like DNB and Nordea block direct crypto transactions due to AML concerns, though Norwegian Block Exchange (NBX) is regulated by Finanstilsynet and offers NOK↔crypto conversions. Institutional custody services are accessible through global providers like BitGo and Fireblocks, as Norway lacks domestic custodians. DeFi protocols must implement KYC/AML verification by June 2026 under MiCA compliance, impacting anonymous wallet transactions. Norway has no formal investment-based residency program, but standard residency requires a work visa with employment contract and minimum salary of NOK 246,136 annually. Citizenship requires 7+ continuous years of residence (reduced to 5 for Nordic citizens), B1 Norwegian language proficiency, and renunciation of original citizenship unless dual citizenship is permitted. The economy is growing at 1.2% in 2025, with 3% inflation and 3.8% unemployment. The cost of living is 14.6% higher than the United States, with Oslo among Europe\'s most expensive cities.'
};

module.exports = no;