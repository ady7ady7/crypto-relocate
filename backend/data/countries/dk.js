// Denmark (DK) country data
const dk = {
  name: 'Denmark',
  code: 'DK',
  rank: 72,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '42% progressive',
  capitalGainsTaxShort: '42-52%',
  wealthTax: '0%',
  incomeTax: '35-56%',
  corporateTax: '22%',

  // Residency details
  residencyInvestment: 'No formal investment visa',
  residencyPhysicalPresence: 'Varies by visa type',
  residencyProcessingTime: '6-12 months',
  residencyDocumentation: 'Passport, proof of income (≥DKK 20,000/month), accommodation',
  
  // Citizenship details
  citizenshipYears: '9+ continuous years (8 for Nordic citizens)',
  citizenshipExceptions: 'Reduced for Nordic citizens',
  citizenshipLanguage: 'Danish proficiency (PD3 exam)',
  citizenshipProcessing: '12-18 months post-application',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'Revolut (in-app trading for 30+ cryptos)',
  institutionalCustody: 'Global custodians only',
  defiIntegration: 'Regulated under MiCA',
  
  // Economic factors
  economicStability: 'Strong',
  inflationRate: '2.1% (ECB target)',
  politicalEnvironment: 'Stable democracy',
  bankingReliability: 'Highly reliable but restrictive for crypto',
  
  // Living considerations
  costOfLivingIndex: 'High',
  costOfLivingVsUS: 'Higher than US',
  housingCost: 'DKK 12,000-18,000/month ($1,750-$2,600) in Copenhagen',
  mealCost: 'DKK 150-300 ($22-$44)',
  
  // Risk factors
  futureRisks: 'Tax increases',
  regulatoryClarity: 'High with EU MiCA compliance',
  cryptoLegalStatus: 'Legal but heavily regulated',
  taxEnforcement: 'High with proposed 42% tax on unrealized gains',
  
  // Resources
  taxAuthorityWebsite: 'www.skat.dk',
  residencyWebsite: 'https://nyidanmark.dk/',
  cryptoRegulatorWebsite: 'https://www.nationalbanken.dk/',
  
  // Detailed description
  description: 'Denmark taxes cryptocurrency gains under capital income tax rules at a 42% flat rate for individuals. Taxable events include selling crypto for DKK, crypto-to-crypto swaps (excluding stablecoins), mining/staking rewards, and NFT sales. Losses can offset gains from other capital assets but not ordinary income. A draft legislation from October 2024 proposes taxing unrealized gains annually at 42% for all crypto holdings, retroactive to Bitcoin\'s inception (2009) if passed, with potential implementation by January 1, 2026. Traditional banks like Danske Bank, Nordea, and Jyske Bank block crypto transactions under AML policies, forcing users to rely on platforms like Revolut for DKK↔crypto conversions and Binance P2P for liquidity. Licensed exchanges like Coinbase and Bitstamp are expected to operate under EU\'s MiCA regulation by June 2025. Denmark lacks domestic custodians, requiring institutional investors to use global options like ChainUp Custody and Fireblocks. The country is exploring a Digital Krone CBDC pilot phase for blockchain interoperability. Denmark imposes no wealth tax, but crypto holdings are taxed upon disposal. Residency requires proof of income (≥DKK 20,000/month) and accommodation, with processing times of 6-12 months.'
};

module.exports = dk;