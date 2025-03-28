// Guyana (GY) country data
const gy = {
  name: 'Guyana',
  code: 'GY',
  rank: 78,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '20% (assets held >12 months), 0-33.3% (<12 months)',
  capitalGainsTaxShort: '20%/0-33.3%',
  wealthTax: '0%',
  incomeTax: '0-33.3%',
  corporateTax: '25%',

  // Residency details
  residencyInvestment: '$100k business',
  residencyPhysicalPresence: 'Varies by visa type',
  residencyProcessingTime: 'Several weeks to months',
  residencyDocumentation: 'Valid passport, proof of address, financial means',
  
  // Citizenship details
  citizenshipYears: '5+ years residence',
  citizenshipExceptions: 'Spouses of citizens after qualifying period',
  citizenshipLanguage: 'English proficiency',
  citizenshipProcessing: 'Several years',
  
  // Financial infrastructure
  financialServices: 'Emerging',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'Limited (AndoToken ecosystem)',
  
  // Economic factors
  economicStability: 'Rapidly growing (38% GDP growth in 2023)',
  inflationRate: '4.5% projected for 2025',
  politicalEnvironment: 'Stable, though border disputes with Venezuela noted',
  bankingReliability: 'Reliable for standard services',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: 'Lower than US',
  housingCost: '$300-600/month for 1-bedroom',
  mealCost: '$2-5 at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'Tax implementation',
  regulatoryClarity: 'Low to moderate',
  cryptoLegalStatus: 'Not clearly defined',
  taxEnforcement: 'Low with increasing focus',
  
  // Resources
  taxAuthorityWebsite: 'https://www.gra.gov.gy/',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Guyana imposes a 20% Capital Gains Tax (CGT) on net gains from asset disposals, including cryptocurrencies, under the Capital Gains Tax Act. For assets held over 12 months, a 20% capital gains tax applies, while assets disposed of within 12 months are taxed as ordinary income at rates from 0% to 33.3%. Exemptions include gains under GYD 500,000 ($2,400). The 2025 National Budget reduces income tax rates but does not explicitly address crypto, though IMF recommendations suggest potential alignment with OECD\'s Crypto-Asset Reporting Framework (CARF) by 2027. No Guyanese banks offer crypto services, with the Bank of Guyana blocking crypto transactions under AML/CFT policies. Users rely on platforms like Bit2Me (supports GYD↔crypto via SEPA/credit cards) and EasyEquities (offers 62+ cryptos with low fees). The country lacks domestic custodians, with institutional investors turning to global options like Fireblocks and ChainUp. The localized crypto ecosystem includes AndoToken (blockchain games, NFT marketplace) launched in 2022, though it lacks regulatory oversight. Guyana imposes no wealth tax, including on crypto holdings. Work visas require employment contracts and proof of income (≥GYD 1.56M/year) with processing taking 6-12 months. Citizenship requires 5+ years of continuous residence, English proficiency, and renunciation of other citizenships unless permitted by origin country. The economy is booming with 5.4% GDP growth (oil-driven) and 4.2% inflation, though crypto-specific risks include regulatory volatility and banking instability from reliance on offshore exchanges.'
};

module.exports = gy;