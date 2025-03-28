// Ghana (GH) country data
const gh = {
  name: 'Ghana',
  code: 'GH',
  rank: 60,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '15% CGT (proposed)',
  capitalGainsTaxShort: '15% (proposed)',
  wealthTax: '0%',
  incomeTax: '0-25% progressive',
  corporateTax: '25%',
  
  // Residency details
  residencyInvestment: 'No investment-based programs',
  residencyPhysicalPresence: '183+ days/year for tax residency',
  residencyProcessingTime: '60-90 days',
  residencyDocumentation: 'Passport, police clearance, proof of income',
  
  // Citizenship details
  citizenshipYears: '5+ continuous years',
  citizenshipExceptions: 'Marriage to Ghanaian (minimum 5 years)',
  citizenshipLanguage: 'Basic English proficiency',
  citizenshipProcessing: 'Several months to years',
  
  // Financial infrastructure
  financialServices: 'Limited',
  cryptoFriendlyBanks: 'Traditional banks block crypto',
  institutionalCustody: 'No local solutions',
  defiIntegration: 'Limited',
  
  // Economic factors
  economicStability: 'Growth at 5.4% in 2024',
  inflationRate: '4.2% in 2024',
  politicalEnvironment: 'Relatively stable',
  bankingReliability: 'Generally reliable',
  
  // Living considerations
  costOfLivingIndex: '30.2',
  costOfLivingVsUS: 'N/A',
  housingCost: 'GHS 1,200-1,800/month ($120-$180)',
  mealCost: 'GHS 15-50 ($1.20-$4.00)',
  
  // Risk factors
  futureRisks: 'Regulatory volatility, 5% capital gains tax',
  regulatoryClarity: 'Low, draft guidelines 2024',
  cryptoLegalStatus: 'Legal with Central Bank caution',
  taxEnforcement: 'Increasing, GHS 79M collected in 2024',
  
  // Resources
  taxAuthorityWebsite: 'https://gra.gov.gh/',
  residencyWebsite: 'https://www.mint.gov.gh/services/',
  cryptoRegulatorWebsite: 'https://www.bog.gov.gh/',
  
  // Detailed description
  description: 'Ghana does not impose a separate capital gains tax. Profits from asset disposals (including property and securities) are taxed as ordinary business income at 30% under the Income Tax Act. For cryptocurrencies, gains are classified as business income, taxed at 30% for corporations and 0-40% for individuals, though draft Amendment Bills from March 2024 propose a 5% flat tax on gains from non-business assets (e.g., shares, land) sold by individuals. The Central Bank of Ghana (BoG) prohibits traditional banks like Stanbic and Centenary from processing crypto transactions under AML/CFT directives, though third-party platforms like Binance P2P and Paxful facilitate GHS↔crypto conversions. There are no domestic custodians or DeFi-specific laws, though global providers like Fireblocks and Coinbase are accessible via EU subsidiaries. Ghana lacks formal investment-based residency programs, with standard residency requiring documentation including passport, police clearance, and proof of income (≥GHS 2.5M/month). Tax residency is established after 183+ days/year in the country. Citizenship requires 5+ continuous years of residency, basic English proficiency, and renunciation of original citizenship unless dual citizenship is permitted. The economy is growing at 5.4% in 2024, with inflation at 4.2%, driven by agriculture and technology sectors. The cost of living is low, with the average monthly salary around GHS 1.2M ($320) and meals at restaurants costing GHS 15-50 ($1.20-$4.00).'
};

module.exports = gh;