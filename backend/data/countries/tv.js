// Tuvalu (TV) country data
const tv = {
  name: 'Tuvalu',
  code: 'TV',
  rank: 75,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '0% (supports blockchain)',
  capitalGainsTaxShort: '0% (de facto)',
  wealthTax: '0%',
  incomeTax: '30% flat rate',
  corporateTax: '30% (40% for nonresidents)',

  // Residency details
  residencyInvestment: 'No formal program',
  residencyPhysicalPresence: 'Valid reason for staying required',
  residencyProcessingTime: '60-90 days (estimated)',
  residencyDocumentation: 'Passport, police clearance, proof of income (≥AUD 500/month)',
  
  // Citizenship details
  citizenshipYears: '5+ continuous years',
  citizenshipExceptions: 'None specified',
  citizenshipLanguage: 'Basic English proficiency (24.2% speak English)',
  citizenshipProcessing: '12-18 months post-application',
  
  // Financial infrastructure
  financialServices: 'Minimal',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'None',
  
  // Economic factors
  economicStability: 'Vulnerable to external shocks',
  inflationRate: 'Data unavailable; regional average 4%',
  politicalEnvironment: 'Stable democracy',
  bankingReliability: 'Basic but reliable for standard services',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: '60% lower than global average',
  housingCost: 'AUD 228-423/month',
  mealCost: 'AUD 3.49-20.30',
  
  // Risk factors
  futureRisks: 'Climate change',
  regulatoryClarity: 'Low with no crypto-specific laws',
  cryptoLegalStatus: 'Not explicitly regulated',
  taxEnforcement: 'Low with limited oversight',
  
  // Resources
  taxAuthorityWebsite: 'www.finance.gov.tv (no crypto-specific portal)',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Tuvalu does not impose a capital gains tax on individuals or corporations, including cryptocurrency transactions. This is explicitly confirmed by Incorporations.io (2024), which states a 0% capital gains tax rate for both individuals and businesses. While the National ICT Policy 2024 focuses on digital transformation, it does not mention crypto-specific taxation. No mandatory crypto tax forms exist; general income tax applies only if crypto is classified as business income (unlikely given lack of enforcement precedents). Traditional banks (e.g., Tuvalu Telecommunications Corporation) do not offer crypto services, with reliance on cash economies persisting and only one ATM nationwide. Users must turn to third-party platforms like Interactive Brokers, MultiBank (offering 23 cryptos), and Pursa (enabling anonymous BTC↔AUD conversions via bank transfers). The country lacks domestic custodians, with global options like Fireblocks and ChainUp Custody accessible via international accounts. Tuvalu\'s most significant initiative is the Tuvalu National Digital Ledger (TNDL), a blockchain-based system for governance and cultural preservation, launched in partnership with nChain (2022) and BSV Blockchain (2023). The government is also exploring digital currency options as it works to preserve its digital sovereignty in the face of rising sea levels. Citizenship requires 5+ continuous years of residency, basic English proficiency, and mandatory renunciation of other citizenships unless permitted by origin country.'
};

module.exports = tv;