// Finland (FI) country data
const fi = {
  name: 'Finland',
  code: 'FI',
  rank: 63,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '30-34% (income-based)',
  capitalGainsTaxShort: '30-34%',
  wealthTax: '0%',
  incomeTax: '30-34% for capital income',
  corporateTax: '20%',
  
  // Residency details
  residencyInvestment: '€1M+ business',
  residencyPhysicalPresence: '4 years of continuous residence',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Passport, evidence of means of support',
  
  // Citizenship details
  citizenshipYears: '8 years residence (or 5 with language skills)',
  citizenshipExceptions: 'Nordics: 5 years, spouses: 3-4 years',
  citizenshipLanguage: 'Finnish or Swedish proficiency',
  citizenshipProcessing: 'Variable processing time',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'Blofin, Uphold (MiCA-compliant)',
  institutionalCustody: 'ChainUp Custody, Fireblocks',
  defiIntegration: 'Limited by MiCA KYC mandates',
  
  // Economic factors
  economicStability: 'Stable with high GDP per capita',
  inflationRate: 'Expected at 3% in 2025',
  politicalEnvironment: 'Stable',
  bankingReliability: 'Strong, well-regulated',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: '6.5% lower than US',
  housingCost: '€1,200-1,800/month for one-bedroom in Helsinki',
  mealCost: '€15-30 at restaurant',
  
  // Risk factors
  futureRisks: 'MiCA\'s DAC8 reporting burden',
  regulatoryClarity: 'High with MiCA compliance',
  cryptoLegalStatus: 'Legal with clear taxation framework',
  taxEnforcement: '€79M collected in 2024 audits',
  
  // Resources
  taxAuthorityWebsite: 'https://www.vero.fi/en/',
  residencyWebsite: 'https://migri.fi/en',
  cryptoRegulatorWebsite: 'https://www.finanssivalvonta.fi/en/',
  
  // Detailed description
  description: 'Finland imposes a progressive capital income tax on crypto disposals, with rates of 30% on gains ≤€30,000 and 34% on amounts >€30,000. Gains below €1,000 annually are tax-exempt. Crypto transactions including selling for euros, crypto-to-crypto swaps, and spending crypto are all taxable events. Mining and staking are treated as earned income, taxed at higher rates up to 44% based on municipal rates. The Finnish Supreme Administrative Court mandated the FIFO method for cost basis calculation in November 2024, while the "deemed acquisition cost" rule allows deducting 20% (if held <10 years) or 40% (≥10 years) of the sale price when original purchase data is unavailable. Traditional banks block crypto transactions under AML directives, though MiCA-compliant platforms like Blofin (offering 394+ cryptos with 150x leverage) and Uphold (supporting EUR deposits via SEPA/Apple Pay) provide alternatives. Revolut and Wirex offer in-app trading for 30+ cryptocurrencies. Institutional custody is available through global providers like ChainUp (SOC 2/ISO 27001 certified) and Fireblocks. DeFi protocols must implement KYC verification by June 2026 under MiCA compliance. Finland has no investment-based residency program, though business entrepreneurs may qualify with sufficient investment (typically €1M+). Citizenship requires 8 years of residence (reduced to 5 with sufficient language skills), Finnish or Swedish proficiency, and an adequate means of support. The cost of living is 6.5% lower than in the United States, with substantial monthly expenses for housing (€1,200-1,800 in Helsinki) and utilities (€150-250).'
};

module.exports = fi;