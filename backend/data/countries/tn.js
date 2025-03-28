// Tunisia (TN) country data
const tn = {
  name: 'Tunisia',
  code: 'TN',
  rank: 89,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: '20% CGT + de facto bans',
  capitalGainsTaxShort: 'N/A',
  wealthTax: 'Applies to property over TND 3 million',
  incomeTax: 'Progressive up to 35%',
  corporateTax: '15-25%',

  // Residency details
  residencyInvestment: '$100k+ in sectors like agriculture or manufacturing',
  residencyPhysicalPresence: 'Required to apply, but no specific duration mandated',
  residencyProcessingTime: '6-12 months',
  residencyDocumentation: 'Proof of income or employment, proof of accommodation, passport',
  
  // Citizenship details
  citizenshipYears: '5 years residence',
  citizenshipExceptions: 'None specified',
  citizenshipLanguage: 'Arabic (and potentially French)',
  citizenshipProcessing: 'Several months to years',
  
  // Financial infrastructure
  financialServices: 'Moderate',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'None',
  
  // Economic factors
  economicStability: 'Low',
  inflationRate: '7.1% in 2024, expected to fall to 6.7% in 2025',
  politicalEnvironment: 'Threats to democracy and civil rights',
  bankingReliability: 'State-dominated and inefficient',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: '60.8% lower than US',
  housingCost: '$110/month for 1-bedroom in city center',
  mealCost: '$0.50-$1.50 for basic items',
  
  // Risk factors
  futureRisks: 'Economic instability',
  regulatoryClarity: 'Low with contradictory frameworks',
  cryptoLegalStatus: 'Prohibited but regulatory framework evolving',
  taxEnforcement: 'Limited for crypto due to prohibition',
  
  // Resources
  taxAuthorityWebsite: 'http://www.finances.gov.tn/fr',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Tunisia technically has no capital gains tax for residents if assets are held for at least two years, encouraging investment. However, cryptocurrency is prohibited since 2018, creating a contradictory framework: gains from crypto investments are treated like other financial instruments for tax purposes, but transactions are restricted. Non-residents might face different tax rules, though enforcement is unclear due to the prohibition. The Central Bank of Tunisia has not issued guidelines supporting crypto transactions, and local banks do not support such activities. Due to the 2018 ban, there are no banking services specifically for crypto, crypto-friendly banks, institutional custody solutions, or advanced DeFi integration. Tunisia introduced an "immovable property wealth tax" in 2023, applicable to individuals holding real estate with a net value exceeding TND 3 million (approximately USD 950,000). Given cryptocurrency\'s illegal status, it is not considered under this wealth tax framework. Residency can be obtained through various permits, with no specific investment required for general residency. Documentation includes proof of income or employment, proof of accommodation, passport, and other supporting documents. Citizenship is obtained through birth to a Tunisian parent or naturalization after five years of residence, with no citizenship-by-investment program. Requirements include knowledge of Arabic (and potentially French) and proof of integration into Tunisian society. Dual citizenship is recognized for citizens by birth but not for those acquiring through naturalization.'
};

module.exports = tn;