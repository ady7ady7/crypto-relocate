// Austria (AT) country data
const at = {
  name: 'Austria',
  code: 'AT',
  rank: 64,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '27.5% flat rate',
  capitalGainsTaxShort: '27.5%',
  wealthTax: '0%',
  incomeTax: '0-55% progressive',
  corporateTax: '24%',
  
  // Residency details
  residencyInvestment: '€100k+ business',
  residencyPhysicalPresence: '5 years for permanent residency',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Passport, proof of income, health insurance',
  
  // Citizenship details
  citizenshipYears: '10 years (6 in some cases)',
  citizenshipExceptions: 'EU spouses: reduced timeline',
  citizenshipLanguage: 'German proficiency (B2)',
  citizenshipProcessing: '12-18 months',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'Bitpanda (MiCA-compliant)',
  institutionalCustody: 'Fireblocks, Bitpanda Custody',
  defiIntegration: 'Limited by MiCAR compliance requirements',
  
  // Economic factors
  economicStability: 'Stable with high GDP per capita',
  inflationRate: '2.9% in 2024, projected to stabilize at 2%',
  politicalEnvironment: 'Stable',
  bankingReliability: 'Strong, well-regulated',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: '1.1% lower than US',
  housingCost: '€1,200-1,800/month for one-bedroom in Vienna',
  mealCost: '€15-30 at restaurant',
  
  // Risk factors
  futureRisks: 'MiCAR\'s KYC mandates for DeFi',
  regulatoryClarity: 'High with MiCAR compliance',
  cryptoLegalStatus: 'Legal with clear taxation framework',
  taxEnforcement: '€79M collected in 2024 audits',
  
  // Resources
  taxAuthorityWebsite: 'https://www.finanzonline.gv.at/',
  residencyWebsite: 'https://www.migration.gv.at/en/',
  cryptoRegulatorWebsite: 'https://www.fma.gv.at/en/',
  
  // Detailed description
  description: 'Austria imposes a 27.5% flat tax on cryptocurrency gains, effective since March 1, 2022, with no distinction between short-term and long-term holdings for assets acquired after March 2021. Assets acquired before March 1, 2021 ("Altbestand") can still be sold tax-free after a 1-year holding period, while newer acquisitions ("Neubestand") are taxed at 27.5% regardless of holding duration. Taxable events include selling crypto for euros, crypto-to-crypto swaps (excluding stablecoins), and mining/staking rewards. Losses can offset gains from other capital assets like stocks, and stablecoin swaps defer taxation until fiat conversion. Traditional banks like Raiffeisen and Erste Bank block direct crypto transactions under AML policies, while Bitpanda holds full MiCA licensing for trading, staking, and custody. Institutional custody is available through providers like Fireblocks (SOC 2-certified) and Bitpanda Custody. DeFi protocols must implement KYC/AML verification by June 2026 under MiCAR compliance, with Security Token Offerings (STOs) becoming more regulated. There is no formal Golden Visa program, though economic contribution of €10M+ in Austrian businesses or government bonds can establish residency, processed in 24-36 months. Citizenship requires 10+ continuous years of residency (reduced for EU spouses), B2 German proficiency, and renunciation of original citizenship unless permitted. The economy is stable with inflation at 2.9% in 2024, projected to reach 2% by the target date. The cost of living is slightly lower than in the United States (1.1%), with substantial expenses for housing in Vienna (€1,200-1,800 monthly).'
};

module.exports = at;