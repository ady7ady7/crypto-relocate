// Venezuela (VE) country data
const ve = {
  name: 'Venezuela',
  code: 'VE',
  rank: 70,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '3% transaction tax + 6-34% income',
  capitalGainsTaxShort: '3%+6-34%',
  wealthTax: '0%',
  incomeTax: '6-34%',
  corporateTax: '15-34%',

  // Residency details
  residencyInvestment: '$100k business + 20% ownership',
  residencyPhysicalPresence: 'No specific initial requirement',
  residencyProcessingTime: '6-12 months',
  residencyDocumentation: 'Passport, police clearance, proof of income (≥$500/month)',
  
  // Citizenship details
  citizenshipYears: '10+ continuous years',
  citizenshipExceptions: 'Reduced for spouses of citizens',
  citizenshipLanguage: 'Basic Spanish proficiency',
  citizenshipProcessing: '18-24 months post-application',
  
  // Financial infrastructure
  financialServices: 'Collapsed',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'Limited',
  
  // Economic factors
  economicStability: 'Unstable',
  inflationRate: '4.2% (down from extreme hyperinflation)',
  politicalEnvironment: 'Unstable',
  bankingReliability: 'Unreliable with restricted services',
  
  // Living considerations
  costOfLivingIndex: 'Unstable',
  costOfLivingVsUS: 'Lower but highly variable',
  housingCost: '$300-$600/month (30-50% premium for expats)',
  mealCost: '$5-$15',
  
  // Risk factors
  futureRisks: 'Hyperinflation',
  regulatoryClarity: 'Low with conflicting IGTF interpretations',
  cryptoLegalStatus: 'Legal but restricted',
  taxEnforcement: 'Inconsistent with increasing oversight',
  
  // Resources
  taxAuthorityWebsite: 'www.seniat.gob.ve',
  residencyWebsite: 'https://www.migracion.gob.ve/',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Venezuela does not impose a traditional capital gains tax. However, cryptocurrency transactions are subject to the Financial Transactions Tax (IGTF) under reforms enacted in 2022 and updated in 2025. IGTF rates include 0-2% for transactions in bolívares (VES), 2-8% for crypto/fiat transactions via Venezuelan banks, and 2-20% for crypto/fiat transactions outside the banking system (e.g., P2P platforms like Binance). Transactions using the state-issued Petro (PTR) are tax-exempt. Mining/staking is treated as business income, taxed at corporate rates (15-34%). No Venezuelan banks offer crypto services, with traditional banks blocking direct crypto transactions under AML/CFT policies. Users rely on government-approved Patria Platform for Petro transactions or Binance P2P (unregulated) for USD/VES liquidity. Third-party platforms like Binance, Bybit, and LocalBitcoins facilitate VES↔crypto conversions, with risk of penalties under Monetary Code Article 12. The country lacks domestic custodians, with international solutions accessible via unregulated accounts. There are no DeFi-specific laws, with transactions falling under IGTF rules. The economy shows inflation at 4.2% (down from 686% in 2022) and GDP growth of 1.3% (oil sector recovery and crypto mining). Crypto-specific risks include regulatory volatility, banking instability from reliance on P2P platforms, and tax enforcement ($85M collected in 2024 audits).'
};

module.exports = ve;