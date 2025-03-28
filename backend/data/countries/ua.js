// Ukraine (UA) country data
const ua = {
  name: 'Ukraine',
  code: 'UA',
  rank: 81,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: '5-10% proposed (previously 18% + 1.5% military tax)',
  capitalGainsTaxShort: '5-10%',
  wealthTax: '0%',
  incomeTax: '18% + 1.5% military tax',
  corporateTax: '18% + 1.5% military tax',

  // Residency details
  residencyInvestment: 'Limited options',
  residencyPhysicalPresence: 'Continuous legal residence',
  residencyProcessingTime: 'Weeks to months',
  residencyDocumentation: 'Passport, visa, proof of investment/funds, family documents',
  
  // Citizenship details
  citizenshipYears: '5 years continuous residence (2 years if married to Ukrainian)',
  citizenshipExceptions: 'Reduced to 2 years if married to Ukrainian',
  citizenshipLanguage: 'Ukrainian proficiency',
  citizenshipProcessing: 'Several months to years',
  
  // Financial infrastructure
  financialServices: 'Unstable',
  cryptoFriendlyBanks: 'Revolut, Wirex',
  institutionalCustody: 'Fireblocks, BitGo',
  defiIntegration: 'FATF compliance by 2025',
  
  // Economic factors
  economicStability: 'Uncertain due to ongoing war',
  inflationRate: '4.2% (IMF, 2024)',
  politicalEnvironment: 'Volatile due to conflict',
  bankingReliability: 'Compromised by conflict',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: 'Lower than US',
  housingCost: 'UAH 15,000-25,000/month ($400-$660) in Kyiv',
  mealCost: 'UAH 150-300 ($4-$8)',
  
  // Risk factors
  futureRisks: 'Regulatory volatility',
  regulatoryClarity: 'Improving but uncertain',
  cryptoLegalStatus: 'Legal but heavily regulated',
  taxEnforcement: 'Moderate with increasing focus',
  
  // Resources
  taxAuthorityWebsite: 'www.tax.gov.ua',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'https://www.fiuindia.gov.in/',
  
  // Detailed description
  description: 'Ukraine\'s crypto tax framework is undergoing significant reforms. A draft bill aims to tax crypto gains at 5-10% (Bitget News, March 2025; Binance Square, Dec 2024), replacing earlier discussions of a 23% rate (18% income tax + 5% military levy). Prior to 2025, crypto gains were taxed at 6.5% (5% personal income tax + 1.5% military tax). Taxable events include selling crypto for UAH, crypto-to-crypto swaps (if deemed business activity), and mining/staking rewards. The draft law (scheduled for parliamentary review by March 2025) proposes lower 5-10% rates to incentivize compliance and boost wartime revenue, while adopting EU MiCA standards requiring exchanges to register with the National Securities and Stock Market Commission (NSSMC). Traditional banks like PrivatBank and Oschadbank block crypto transactions under AML/CFT policies. Users rely on WhiteBIT and Kuna (local exchanges operating under interim regulations) and Binance P2P for UAH liquidity. Revolut supports UAH↔crypto via SEPA and Wirex offers crypto-linked debit cards for spending. Ukraine lacks regulated domestic custodians, with users turning to global options like Fireblocks (SOC 2-certified) and BitGo (insured cold storage). DeFi protocols must comply with FATF guidelines by 2025, with yield farming rewards taxed as ordinary income (5-10% if passed). Ukraine imposes no wealth tax on crypto holdings. The country\'s tech hub, Diia City, is exploring blockchain for public services. The economy shows 5.4% GDP growth with 4.2% inflation, with crypto-specific risks including draft law delays extending tax uncertainty into 2026 and EU sanctions restricting crypto platform access.'
};

module.exports = ua;