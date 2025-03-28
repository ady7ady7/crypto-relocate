// Papua New Guinea (PG) country data
const pg = {
  name: 'Papua New Guinea',
  code: 'PG',
  rank: 69,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '0% (de facto; limited enforcement)',
  capitalGainsTaxShort: '0% (de facto)',
  wealthTax: '0%',
  incomeTax: '0-42% individuals, 30% corporate',
  corporateTax: '30%',

  // Residency details
  residencyInvestment: '$50k+ business',
  residencyPhysicalPresence: '5 years for permanent residency',
  residencyProcessingTime: '3-4 months',
  residencyDocumentation: 'Passport, work permit, police clearance, character references',
  
  // Citizenship details
  citizenshipYears: '8+ years of continuous residence',
  citizenshipExceptions: 'None specified',
  citizenshipLanguage: 'Tok Pisin, Hiri Motu, or local vernacular',
  citizenshipProcessing: 'Several months to years',
  
  // Financial infrastructure
  financialServices: 'Minimal',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'Minimal',
  
  // Economic factors
  economicStability: 'Volatile but growing at 4.6% in 2025',
  inflationRate: '4.8% forecasted for 2025',
  politicalEnvironment: 'Occasional instability',
  bankingReliability: 'Reliable for standard services',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: '60.4% lower than US',
  housingCost: '$300-600/month for 1-bedroom in center',
  mealCost: '$2-5 at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'Future regulation',
  regulatoryClarity: 'Low with limited enforcement',
  cryptoLegalStatus: 'Unregulated',
  taxEnforcement: 'Low with limited oversight',
  
  // Resources
  taxAuthorityWebsite: 'http://www.irc.gov.pg/',
  residencyWebsite: 'https://ica.gov.pg/',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Papua New Guinea does not impose a capital gains tax on individuals or corporations. However, profits from asset disposals (including cryptocurrencies) may be taxed as ordinary income if deemed part of a business activity or profit-making scheme, with progressive income tax rates of 0-42% for individuals and 25% corporate tax for businesses. Mining/staking rewards are treated as business income if conducted commercially. No specific crypto tax forms exist; gains must be declared under general income tax provisions. Traditional banks (e.g., Bank South Pacific) restrict crypto transactions under AML policies, with no PNG-based banks offering crypto services. Users rely on third-party platforms like Binance, Bybit, and KuCoin (unregulated) for crypto transactions. The country lacks domestic custodians, with global options like Fireblocks and ChainUp accessible via international accounts. There is no DeFi-specific regulation, though the Digital Kina CBDC pilot program with Soramitsu and Mitsubishi aims to enhance financial inclusion. PNG imposes no wealth tax on crypto holdings. Residency requirements include valid passport, police clearance, and proof of income, with processing taking 60-90 days via the Immigration and Citizenship Authority (ICA). Citizenship requires 5+ continuous years of residency, basic English or Tok Pisin proficiency, and mandatory renunciation of other citizenships. The economy shows 3.2% GDP growth (driven by tech and CBDC initiatives) with 4.2% inflation.'
};

module.exports = pg;