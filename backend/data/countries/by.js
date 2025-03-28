// Belarus (BY) country data
const by = {
  name: 'Belarus',
  code: 'BY',
  rank: 80,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: '13% income tax',
  capitalGainsTaxShort: '13%',
  wealthTax: '0%',
  incomeTax: '13%',
  corporateTax: '9% for HTP residents; 20-25% for others',

  // Residency details
  residencyInvestment: 'State-approved investment',
  residencyPhysicalPresence: '90 days without registration',
  residencyProcessingTime: 'Several weeks to months',
  residencyDocumentation: 'Valid passport, proof of address, employment contract',
  
  // Citizenship details
  citizenshipYears: '7+ years of residence',
  citizenshipExceptions: 'None specified',
  citizenshipLanguage: 'Belarusian/Russian proficiency',
  citizenshipProcessing: 'Several years',
  
  // Financial infrastructure
  financialServices: 'Restricted',
  cryptoFriendlyBanks: 'HTP Institutions (Dzengi, Finstore.by)',
  institutionalCustody: 'Global providers via HTP',
  defiIntegration: 'Digital Token Arbitration proposed',
  
  // Economic factors
  economicStability: 'Expected growth of 3.6% in 2024, 1.8% in 2025',
  inflationRate: '6.8% (National Bank of Belarus, 2024)',
  politicalEnvironment: 'Unstable with international isolation',
  bankingReliability: 'Under pressure but functional',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: '61% lower than world average',
  housingCost: 'BYN 1,500-2,500/month ($600-1,000) in Minsk',
  mealCost: 'BYN 30-60 ($12-$24)',
  
  // Risk factors
  futureRisks: 'International sanctions',
  regulatoryClarity: 'Improving but uncertain',
  cryptoLegalStatus: 'Legal with tax exemptions until January 1, 2025',
  taxEnforcement: 'Increasing for non-HTP users',
  
  // Resources
  taxAuthorityWebsite: 'http://www.nalog.gov.by/en/',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Belarus has historically offered tax exemptions for cryptocurrency enterprises under Presidential Decree No. 8 (2017), extended until January 1, 2025. HTP-registered businesses and individuals continue to enjoy exemptions from VAT, corporate tax, and personal income tax for mining, trading, and token issuance. However, individuals outside HTP now face a 13% income tax on crypto gains from foreign platforms (e.g., Binance) and peer-to-peer transactions, though gains via HTP-registered platforms (Bynex, Whitebird) remain tax-free. Traditional banks block crypto transactions under AML policies, with EU sanctions banning Belarusians from platforms like Binance and Kraken under Council Regulation 2025/392. Users rely on HTP-registered platforms like Bynex, Whitebird, and Free2Ex for crypto/fiat conversions. HTP-registered entities like Dzengi and Finstore.by offer crypto services under tax exemptions, while institutions use SOC 2-certified global providers like Fireblocks. The Digital Token Arbitration system has been proposed for crypto-related disputes. Belarus imposes no wealth tax on crypto holdings. Work/Study visas require employment contracts or university enrollment, with an HTP business registration offering residency benefits. The economy is expected to grow by 3.6% in 2024 and 1.8% in 2025, driven by consumer spending, fiscal policy, and demand from Russia, though signs of overheating include rapid credit growth and high wage growth. Crypto-specific risks include EU sanctions limiting access to wallets and custody services.'
};

module.exports = by;