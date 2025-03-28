// Chile (CL) country data
const cl = {
  name: 'Chile',
  code: 'CL',
  rank: 34,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '25% (individuals), 20% (corporate)',
  capitalGainsTaxShort: '25%/20%',
  wealthTax: '0%',
  incomeTax: '0-40% progressive',
  corporateTax: '27%',
  
  // Residency details
  residencyInvestment: '$1,500 monthly income or $125,000 lump sum',
  residencyPhysicalPresence: '24 months for permanent residency',
  residencyProcessingTime: 'Weeks to months',
  residencyDocumentation: 'Passport, criminal record, proof of income',
  
  // Citizenship details
  citizenshipYears: '5 years of residence',
  citizenshipExceptions: 'None',
  citizenshipLanguage: 'Spanish proficiency required',
  citizenshipProcessing: 'About 2 years',
  
  // Financial infrastructure
  financialServices: 'Strong',
  cryptoFriendlyBanks: 'Bci Bank, some banks block crypto transfers',
  institutionalCustody: 'Regulated, possible providers like Prosegur Crypto',
  defiIntegration: 'Early stage, growing interest',
  
  // Economic factors
  economicStability: 'Growing at 2.3% in 2025',
  inflationRate: '4.7% (Feb 2025), expected to decrease to 3%',
  politicalEnvironment: 'Stable democracy, elections in November 2025',
  bankingReliability: 'Strong under regulation, some hesitancy with crypto',
  
  // Living considerations
  costOfLivingIndex: '87-98% of world average',
  costOfLivingVsUS: 'Lower than US',
  housingCost: '$450 monthly rent for one-bedroom in city center',
  mealCost: '$8 at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'Political shifts with elections',
  regulatoryClarity: 'Improving with Fintech Law (2023)',
  cryptoLegalStatus: 'Legal and regulated under Financial Market Commission',
  taxEnforcement: 'Medium, increasing scrutiny',
  
  // Resources
  taxAuthorityWebsite: 'https://www.sii.cl/',
  residencyWebsite: 'https://serviciomigraciones.cl/en/',
  cryptoRegulatorWebsite: 'https://www.cmfchile.cl/portal/principal/613/w3-channel.html',
  
  // Detailed description
  description: 'Chile does not have a separate capital gains tax; instead, capital gains are integrated into the general income tax system. For individuals, the income tax rate ranges from 0% to 40%, with crypto gains taxed at 25%, while for companies, it is 27% for general income and 20% for crypto gains. There is no wealth tax despite past proposals. In the banking sector, Bci Bank stands out for accepting crypto exchanges as clients, implementing a protocol inspired by FATF recommendations, though some banks remain cautious. Chile\'s Fintech Law, enacted in January 2023, regulates crypto assets under the Financial Market Commission. Residency requires financial means (e.g., $1,500 monthly income or $125,000 lump sum) with 24 months of physical presence for permanent status. Citizenship needs five years\' residence, knowledge of Spanish, and takes about two years. The economy is expected to grow by 2.3% in 2025, with inflation at 4.7% in February, projected to decrease to 3% by early 2026.'
};

module.exports = cl;