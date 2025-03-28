// Estonia (EE) country data
const ee = {
  name: 'Estonia',
  code: 'EE',
  rank: 16,
  category: 'Favorable',
  
  // Tax information
  capitalGainsTax: '0% (individuals), 20% (corporate)',
  capitalGainsTaxShort: '0%/20%',
  wealthTax: '0%',
  incomeTax: '22% flat rate from 2025',
  corporateTax: '20% (on distributed profits only)',

  // Residency details
  residencyInvestment: '€65k business',
  residencyPhysicalPresence: 'No minimum for e-Residency, physical presence for temporary residence',
  residencyProcessingTime: 'Few months',
  residencyDocumentation: 'Business plan, proof of funds, health insurance for physical residency',
  
  // Citizenship details
  citizenshipYears: '8 years (5 years permanent)',
  citizenshipLanguage: 'Estonian language proficiency',
  citizenshipProcessing: 'Several months',
  citizenshipRenunciation: 'Must renounce other citizenship',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'LHV Bank, Coop Pank',
  institutionalCustody: 'Global providers via partnerships',
  defiIntegration: 'Growing with local projects like Voy Finance',
  
  // Economic factors
  economicStability: 'Strong digital economy',
  inflationRate: 'Above 3.5% (2025)',
  politicalEnvironment: 'Stable with digital focus',
  bankingReliability: 'Reliable with e-services',
  
  // Living considerations
  costOfLivingIndex: 'Moderate',
  costOfLivingVsUS: 'Lower than US',
  housingCost: '€480-€520/month for one-bedroom',
  mealCost: '€10-€15',
  
  // Risk factors
  futureRisks: 'EU regulatory alignment',
  regulatoryClarity: 'High with FIU oversight',
  cryptoLegalStatus: 'Legal with comprehensive framework',
  taxEnforcement: 'Moderate with digital reporting',
  
  // Resources
  taxAuthorityWebsite: 'https://www.emta.ee/en',
  eresidencyWebsite: 'https://www.e-resident.gov.ee/',
  cryptoRegulatorWebsite: 'https://www.fi.ee/en',
  
  // Detailed description
  description: 'Estonia does not tax capital gains on cryptocurrencies for individuals, but corporate entities face a 20% tax on distributed profits. From 2025, the personal income tax rate will increase to 22% on cryptocurrency transactions, with an investment account option for cryptocurrencies purchased via regulated providers. There is no wealth tax. Estonia\'s e-Residency program costs €100 with no physical presence required, while physical residency options include temporary residence permits requiring a €65,000 business investment or meeting other criteria such as employment or education. Citizenship requires 8 years of legal residence (with the last 5 on a permanent basis), Estonian language proficiency, and renunciation of previous citizenship, taking several months to process. Banks like LHV Bank (with its Cuber Wallet) and Coop Pank offer crypto-friendly services. The Financial Intelligence Unit (FIU) oversees crypto service providers under the country\'s progressive regulatory framework. The economy is projected to grow 1-2% in 2025, with inflation above 3.5%. The cost of living is moderate, with monthly expenses for a single person around €800-1000 without rent. Estonia is developing a groundbreaking e-CryptoTax platform to streamline cryptocurrency taxation.'
};

module.exports = ee;