// Zimbabwe (ZW) country data
const zw = {
  name: 'Zimbabwe',
  code: 'ZW',
  rank: 88,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: '20% CGT + 2% transaction tax',
  capitalGainsTaxShort: '20%+2%',
  wealthTax: '1% on residential property over $250,000',
  incomeTax: '0-40%',
  corporateTax: '24.72%',

  // Residency details
  residencyInvestment: '$100,000 for investor permit',
  residencyPhysicalPresence: 'Not specified initially',
  residencyProcessingTime: 'Several weeks to months',
  residencyDocumentation: 'Valid passport, investment proof, police clearance, medical certificate',
  
  // Citizenship details
  citizenshipYears: '5 years residence on a permit',
  citizenshipExceptions: 'Case-by-case for deserving investors',
  citizenshipLanguage: 'Not specified',
  citizenshipProcessing: 'Several months to a year',
  
  // Financial infrastructure
  financialServices: 'Restricted',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'None',
  
  // Economic factors
  economicStability: 'Improving but volatile',
  inflationRate: '57.5% in April 2024',
  politicalEnvironment: 'Disputed election, increasing isolation',
  bankingReliability: 'Strained, multicurrency system',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: 'Much lower than US',
  housingCost: '$250/month for 1-bedroom in city center',
  mealCost: '$0.50-5 per meal',
  
  // Risk factors
  futureRisks: 'Hyperinflation',
  regulatoryClarity: 'Low with conflicting positions',
  cryptoLegalStatus: 'Banned for banks since 2018',
  taxEnforcement: 'ZIMRA requires tax payments despite banking ban',
  
  // Resources
  taxAuthorityWebsite: 'https://www.zimra.co.zw/',
  residencyWebsite: 'https://zimimmigration.gov.zw/',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Zimbabwe imposes a Capital Gains Tax (CGT) on the disposal of specified assets at varying rates: 20% for immovable property and unlisted securities (5% if acquired before February 2009), and 1% for listed securities. There\'s an additional 2% Financial Transaction Tax on all transactions. For cryptocurrency, there are no specific tax rules, as it is banned under Reserve Bank of Zimbabwe (RBZ) directives, creating a regulatory conflict: the ban prohibits transactions, yet the Zimbabwe Revenue Authority (ZIMRA) requires crypto traders to declare and pay taxes on gains. Since 2018, the RBZ has prohibited financial institutions from trading, holding, or transacting in virtual currencies, ordering banks to terminate relationships with crypto exchanges. No Zimbabwean banks offer crypto services, forcing users to rely on offshore platforms like Binance P2P, Bybit, and KuCoin through VPNs. There are no crypto-friendly banks, institutional custody solutions, or DeFi integration available in Zimbabwe. The country introduced a wealth tax in 2024 on residential property exceeding USD 250,000 (excluding primary residence) at 1% per annum, capped at USD 50,000. For residency, the Investor Residence Permit requires an investment of at least USD 100,000 in a joint venture with a local partner or USD 1,000,000 for larger investments. Citizenship requires living in Zimbabwe for five years on a residence permit, with no formal citizenship-by-investment program, though "deserving investors" may be granted citizenship on a case-by-case basis according to 2022 government statements. Dual citizenship is allowed for citizens by birth but not for those who acquire citizenship by registration or descent.'
};

module.exports = zw;