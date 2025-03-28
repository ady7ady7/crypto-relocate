// India (IN) country data
const in_ = {
  name: 'India',
  code: 'IN',
  rank: 67,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '30% flat tax + 1% TDS',
  capitalGainsTaxShort: '30%+1%',
  wealthTax: '0%',
  incomeTax: '0-30%',
  corporateTax: '25-30%',

  // Residency details
  residencyInvestment: 'No formal investment visa',
  residencyPhysicalPresence: 'Varies by visa type',
  residencyProcessingTime: '6-12 months',
  residencyDocumentation: 'Passport, police clearance, proof of income ≥$500/month',
  
  // Citizenship details
  citizenshipYears: '12+ continuous years',
  citizenshipExceptions: 'Exceptions for spouses/children',
  citizenshipLanguage: 'Basic Hindi/English proficiency',
  citizenshipProcessing: '18-24 months post-application',
  
  // Financial infrastructure
  financialServices: 'Developing',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'Limited',
  defiIntegration: 'Growing ecosystem',
  
  // Economic factors
  economicStability: 'Strong with 6.3% growth',
  inflationRate: '4.5% (RBI target: 4%)',
  politicalEnvironment: 'Stable democracy',
  bankingReliability: 'Reliable but restrictive for crypto',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: 'Much lower than US',
  housingCost: '₹35,000-60,000/month ($420-$720) in Mumbai',
  mealCost: '₹200-500 ($2.40-$6) in Mumbai',
  
  // Risk factors
  futureRisks: 'Regulatory uncertainty',
  regulatoryClarity: 'Moderate with increasing oversight',
  cryptoLegalStatus: 'Legal but heavily regulated',
  taxEnforcement: 'High with 70% retroactive penalties',
  
  // Resources
  taxAuthorityWebsite: 'https://incometaxindia.gov.in/',
  residencyWebsite: 'https://indianvisaonline.gov.in/visa/index.html',
  cryptoRegulatorWebsite: 'https://www.fiuindia.gov.in/',
  
  // Detailed description
  description: 'India imposes a 30% flat tax on capital gains from cryptocurrency transactions under Section 115BBH of the Income Tax Act, with no distinction between long-term and short-term gains. An additional 1% Tax Deducted at Source (TDS) applies to transactions exceeding ₹10,000 (salaried) or ₹50,000 (businesses). Crypto losses cannot offset gains from other assets or carry forward. Mining and staking rewards are treated as business income (30% rate) or miscellaneous income. A 70% penalty applies to undeclared crypto gains from the past 48 months (effective February 2025). No Indian banks offer crypto services, with the Reserve Bank of India (RBI) restricting direct crypto transactions under AML/CFT policies. Users rely on licensed platforms like CoinDCX and WazirX (under FIUIND oversight) or Binance P2P (unregulated). Third-party platforms like Transak and ZebPay offer INR credit card purchases and SEPA transfers. India lacks regulated domestic crypto custodians, with users turning to global options like Fireblocks and Bitbns Insured Custody (covers up to ₹1 crore per user). The economy is growing at 6.3% (driven by tech/startups) with an inflation rate of 4.5% (RBI target: 4%). Crypto-specific risks include regulatory volatility with 70% penalties on retroactive gains, banking instability from dependence on P2P platforms, and stricter tax enforcement (₹722 crore demand from Binance 2024).'
};

module.exports = in_;