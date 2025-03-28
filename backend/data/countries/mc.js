// Monaco (MC) country data
const mc = {
  name: 'Monaco',
  code: 'MC',
  rank: 13,
  category: 'Favorable',
  
  // Tax information
  capitalGainsTax: '0%',
  capitalGainsTaxShort: '0%',
  wealthTax: '0%',
  incomeTax: '0%',
  corporateTax: '0% (domestic), 33.33% (foreign revenue >25%)',

  // Residency details
  residencyInvestment: '€500k+ bank funds',
  residencyPhysicalPresence: 'Regular presence, no specific minimum',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Proof of accommodation, financial means, police clearance',
  
  // Citizenship details
  citizenshipYears: '10 years of residence',
  citizenshipLanguage: 'French proficiency',
  citizenshipProcessing: 'Multiple years',
  citizenshipRenunciation: 'Must renounce other citizenship',
  
  // Financial infrastructure
  financialServices: 'Robust',
  cryptoFriendlyBanks: 'Limited, Revolut and similar platforms used',
  institutionalCustody: 'Global providers accessible',
  defiIntegration: 'Limited local, global platforms accessible',
  
  // Economic factors
  economicStability: 'Very strong with diverse economy',
  inflationRate: '2-3%',
  politicalEnvironment: 'Stable constitutional monarchy',
  bankingReliability: 'Highly reliable with strict oversight',
  
  // Living considerations
  costOfLivingIndex: 'Very high',
  costOfLivingVsUS: '114.4% higher than US',
  housingCost: '€3,000-€5,000/month for rent',
  mealCost: '€20-€30',
  
  // Risk factors
  futureRisks: 'International pressure',
  regulatoryClarity: 'Moderate with Law 1.528 (July 2022)',
  cryptoLegalStatus: 'Legal with regulatory framework',
  taxEnforcement: 'Low with zero taxation',
  
  // Resources
  taxAuthorityWebsite: 'https://en.gouv.mc/Government-Institutions/The-Government/Ministry-of-Finance-and-Economy/Department-of-Tax-Services',
  residencyWebsite: 'https://en.gouv.mc/Gouvernement-et-Institutions/Le-Gouvernement/Departement-de-l-Interieur/Direction-de-la-Surete-Publique',
  regulatoryAuthority: 'Commission de Contrôle des Activités Financières (CCAF)',
  
  // Detailed description
  description: 'Monaco does not impose capital gains tax on cryptocurrency transactions, irrespective of holding period, with no distinction between long-term and short-term gains. There is also no wealth tax, income tax, or inheritance tax. Residency requires proof of financial capacity, typically by depositing €500,000 in a Monaco bank or forming a Monaco company, with regular physical presence (no specific minimum) and processing taking several months. Citizenship requires 10 years of continuous residence, French language proficiency, and renunciation of other citizenships, taking multiple years to process. Traditional banks are cautious with crypto, with users relying on fintech platforms like Revolut for services. Law 1.528 (July 7, 2022) regulates crypto asset service providers, requiring prior authorization for activities including custody. The economy is stable with low inflation (around 2-3%) and a highly reliable banking system. The cost of living is 114.4% higher than the US, with a family of four spending around €6,640 monthly without rent, and rent at €3,000-€5,000 for a city-center apartment.'
};

module.exports = mc;