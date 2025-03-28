// Azerbaijan (AZ) country data
const az = {
  name: 'Azerbaijan',
  code: 'AZ',
  rank: 62,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '14% individuals, 20% corporate',
  capitalGainsTaxShort: '14%/20%',
  wealthTax: '0%',
  incomeTax: '14% flat rate',
  corporateTax: '18-22%',
  
  // Residency details
  residencyInvestment: '$500,000 minimum',
  residencyPhysicalPresence: 'Required for application',
  residencyProcessingTime: 'Up to 45 calendar days',
  residencyDocumentation: 'Passport, housing agreement, medical certificate',
  
  // Citizenship details
  citizenshipYears: '5 years of residency',
  citizenshipExceptions: '3 years if married to Azerbaijani citizen',
  citizenshipLanguage: 'Azerbaijani proficiency',
  citizenshipProcessing: 'Several months to a year',
  
  // Financial infrastructure
  financialServices: 'Limited',
  cryptoFriendlyBanks: 'Fluyez (Peru-based)',
  institutionalCustody: 'No domestic providers',
  defiIntegration: 'Limited',
  
  // Economic factors
  economicStability: 'Growth at 2.5% in 2024',
  inflationRate: '7.5% in January 2025',
  politicalEnvironment: 'Stable',
  bankingReliability: 'Reliable but cautions with crypto',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: '57.0% lower than US',
  housingCost: '$400-600/month for one-bedroom in Baku',
  mealCost: '$6-8 at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'Regulatory development',
  regulatoryClarity: 'Low',
  cryptoLegalStatus: 'Legal but unregulated',
  taxEnforcement: 'Moderate',
  
  // Resources
  taxAuthorityWebsite: 'https://taxes.gov.az/en',
  residencyWebsite: 'https://egov.az/en/articles/vid_na_jitelstvo',
  cryptoRegulatorWebsite: 'https://www.fimsa.az/en/',
  
  // Detailed description
  description: 'Azerbaijan taxes capital gains as ordinary income under the Tax Code, with no distinction between short-term and long-term holdings. For individuals, gains are taxed at 14% on net gains from asset disposals, including cryptocurrencies. Corporations face an 18-22% corporate tax rate on profits from crypto transactions. Taxable events include selling crypto for fiat AZN, crypto-to-crypto swaps, and mining/staking rewards, with mining treated as business income and taxed at corporate rates (18-22%). Draft legislation from September 2024 proposes stricter AML/CFT compliance for crypto businesses but leaves tax rates unchanged, with potential inclusion of crypto in "undisclosed income" category, subject to 60% penalties if discovered during audits. Central Bank restrictions prevent traditional banks like Kapital Bank from offering direct crypto transactions under AML/CFT policies, though platforms like Bit2Me support AZN↔crypto conversions via SEPA transfers (AFM-licensed). Institutional custody is underdeveloped, with no domestic providers and reliance on global options like Bit2Me Custody (insured up to €150M) and Coinbase Institutional via EU subsidiaries. Azerbaijan has no DeFi-specific laws, though general AML rules apply. Temporary residency can be granted for employment, study, or family reunification, requiring documentation including passport, police clearance, and proof of income (≥AZN 1,500/month), with processing taking 60-90 days. Citizenship requires 5+ continuous years of residency, basic Azerbaijani language proficiency (A2 CERF level), and renunciation of original citizenship unless permitted. The economy is projected to grow by 2.5% in 2024, with inflation at 7.5% in January 2025.'
};

module.exports = az;