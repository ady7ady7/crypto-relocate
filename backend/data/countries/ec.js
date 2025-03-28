// Ecuador (EC) country data
const ec = {
  name: 'Ecuador',
  code: 'EC',
  rank: 55,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '10% entity transfers, 25-37% income',
  capitalGainsTaxShort: '10%/25-37%',
  wealthTax: '0%',
  incomeTax: '0-35% progressive',
  corporateTax: '25%',
  
  // Residency details
  residencyInvestment: '$42,500 minimum',
  residencyPhysicalPresence: 'No specific initial requirement',
  residencyProcessingTime: '3-4 months',
  residencyDocumentation: 'Passport, criminal record, proof of income/investment',
  
  // Citizenship details
  citizenshipYears: '3 years of residency',
  citizenshipExceptions: 'Marriage to Ecuadorian citizen (2 years)',
  citizenshipLanguage: 'Spanish proficiency',
  citizenshipProcessing: 'Several months',
  
  // Financial infrastructure
  financialServices: 'Developing',
  cryptoFriendlyBanks: 'P2P platforms due to bank restrictions',
  institutionalCustody: 'Global providers accessible',
  defiIntegration: 'Limited, global platforms accessible',
  
  // Economic factors
  economicStability: 'Growth 1.2-2.6% in 2025',
  inflationRate: '2.2% in 2025',
  politicalEnvironment: 'Political instability',
  bankingReliability: 'Reliable for traditional banking',
  
  // Living considerations
  costOfLivingIndex: '55.59',
  costOfLivingVsUS: '54.8% lower than US',
  housingCost: '$400-600/month for one-bedroom in city center',
  mealCost: '$2-3 at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'International tax reporting standards compliance',
  regulatoryClarity: 'Low, no explicit cryptocurrency laws',
  cryptoLegalStatus: 'Legal with monetary use prohibited',
  taxEnforcement: 'Moderate',
  
  // Resources
  taxAuthorityWebsite: 'https://www.sri.gob.ec/',
  residencyWebsite: 'https://www.gob.ec/mremh/tramites/visa-residencia-permanente',
  cryptoRegulatorWebsite: 'https://www.supercias.gob.ec/',
  
  // Detailed description
  description: 'Ecuador does not have a dedicated capital gains tax; instead, capital gains are taxed as part of personal income tax at progressive rates from 0% to 35%. For cryptocurrencies, which are classified as intangible assets, gains are likely subject to a 10% capital gains tax for entity transfers, while individuals may pay income tax rates from 25% to 37%. There is no distinction between long-term and short-term gains. Cryptocurrencies are not legal tender, but private transactions are allowed. Traditional banks like Banco Pichincha do not offer direct cryptocurrency services due to Central Bank restrictions, though bank transfers to P2P platforms like Binance P2P are common workarounds. There are no local institutional custody solutions, so users rely on global providers. Ecuador has no wealth tax. Residency options include the Standard Visa requiring proof of income around $1,350/month or investment of at least $42,500 in real estate or a business, with processing typically taking 3-4 months. Citizenship through naturalization requires at least 3 years of residency, Spanish proficiency, and good character. The economy is projected to grow between 1.2% and 2.6% in 2025, with low inflation at 2.2%, though political instability presents challenges. The cost of living is 54.8% lower than the United States, with monthly expenses for a family of four around $2,058.8 without rent.'
};

module.exports = ec;