// Kazakhstan (KZ) country data
const kz = {
  name: 'Kazakhstan',
  code: 'KZ',
  rank: 61,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '10% mining tax, 20% corporate',
  capitalGainsTaxShort: '10/20%',
  wealthTax: '0%',
  incomeTax: '10% for individuals, 20% for crypto',
  corporateTax: '20%',
  
  // Residency details
  residencyInvestment: '$500k priority sectors',
  residencyPhysicalPresence: 'Required for application',
  residencyProcessingTime: 'Up to 45 calendar days',
  residencyDocumentation: 'Passport, housing agreement, medical certificate',
  
  // Citizenship details
  citizenshipYears: '5 years of legal residence',
  citizenshipExceptions: '3 years if married to Kazakh citizen',
  citizenshipLanguage: 'Kazakh language proficiency',
  citizenshipProcessing: 'Several months to a year',
  
  // Financial infrastructure
  financialServices: 'Limited',
  cryptoFriendlyBanks: '0% corporate tax for AIFC crypto firms',
  institutionalCustody: 'Fireblocks/Coinbase via AIFC subsidiaries',
  defiIntegration: 'Limited, no DeFi-specific laws',
  
  // Economic factors
  economicStability: 'Growth at 4.7% in 2025',
  inflationRate: 'Expected to remain above 5% until late 2026',
  politicalEnvironment: 'Recent political transitions pose risks',
  bankingReliability: 'Reliable but cautions with crypto',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: '57.0% lower than US',
  housingCost: '$400-600/month for one-bedroom in Almaty',
  mealCost: '$6-8 at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'Energy shortages for mining operations',
  regulatoryClarity: 'Moderate within AIFC, low outside',
  cryptoLegalStatus: 'Legal with clear framework in AIFC',
  taxEnforcement: 'Moderate, increasing scrutiny',
  
  // Resources
  taxAuthorityWebsite: 'https://kgd.gov.kz/en',
  residencyWebsite: 'https://egov.kz/cms/en/articles/vid_na_jitelstvo',
  cryptoRegulatorWebsite: 'https://aifc.kz/en/',
  
  // Detailed description
  description: 'Kazakhstan imposes a corporate income tax of 20% on profits from cryptocurrency transactions for registered entities. Securities are subject to 15% on disposals unless exempt, while real estate is not taxed if proceeds are reinvested within 2 years. For individuals, cryptocurrency gains are taxed at 10% for foreign-issued digital assets or 15% for other crypto disposals, treated as capital gains. Mining operations face a KZT 1 ($0.0023) per kWh energy tax, with mining rewards taxed as corporate income (20%) or individual income (10-15%). The Astana International Financial Center (AIFC) offers a significant advantage with 0% corporate tax for licensed crypto firms, allowing exchanges like Binance, Bybit, and Bitfinex to operate under AIFC licenses. Traditional banks prohibit direct crypto transactions under AML policies, though AIFC entities enable compliant AMD↔crypto conversions. There are no domestic custody providers, but Fireblocks and Coinbase are accessible via AIFC subsidiaries. Kazakhstan ranks second globally in Bitcoin mining, contributing 18% of the global hashrate as of 2023, with energy subsidies for registered miners. Residency requires an AIFC Business License with $100 share capital and a mandatory office in the AIFC, or standard residency requiring 183+ days/year for tax purposes. Citizenship requires 5+ years of continuous residence, basic Kazakh proficiency, and renunciation of prior citizenship unless permitted. The economy is projected to grow by 4.7% in 2025, with inflation expected to remain above the 5% target until late 2026.'
};

module.exports = kz;