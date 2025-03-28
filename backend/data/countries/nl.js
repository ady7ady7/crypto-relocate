// Netherlands (NL) country data
const nl = {
  name: 'Netherlands',
  code: 'NL',
  rank: 56,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '31% (Box 3 wealth tax)',
  capitalGainsTaxShort: '31%',
  wealthTax: 'Included in Box 3 tax',
  incomeTax: '36.93% on deemed returns',
  corporateTax: '25.8%',
  
  // Residency details
  residencyInvestment: '€1.25M (Golden Visa)',
  residencyPhysicalPresence: '183 days per calendar year for tax residency',
  residencyProcessingTime: '6-12 months',
  residencyDocumentation: 'Passport, proof of address, financial resources',
  
  // Citizenship details
  citizenshipYears: '5 years of residency',
  citizenshipExceptions: '3 years for EU spouses',
  citizenshipLanguage: 'Dutch proficiency required (B1)',
  citizenshipProcessing: '12-18 months',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'MoonPay, BitStaete, ZBD, Hidden Road, Socios.com',
  institutionalCustody: 'Fireblocks, Zodia Custody',
  defiIntegration: 'Limited by MiCA KYC mandates',
  
  // Economic factors
  economicStability: 'Growing at 1.3% in 2025',
  inflationRate: '3% (above ECB\'s 2% target)',
  politicalEnvironment: 'Stable',
  bankingReliability: 'Strong, unemployment 4.1%',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: 'N/A',
  housingCost: '€1,800-2,500/month for one-bedroom in Amsterdam',
  mealCost: '€15-30 at restaurant',
  
  // Risk factors
  futureRisks: 'MiCA\'s DAC8 reporting burden',
  regulatoryClarity: 'High with MiCA compliance',
  cryptoLegalStatus: 'Legal with clear taxation framework',
  taxEnforcement: '€79M collected in 2024 audits',
  
  // Resources
  taxAuthorityWebsite: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/home/home',
  residencyWebsite: 'https://ind.nl/en/residence-permits',
  cryptoRegulatorWebsite: 'https://www.afm.nl/en',
  
  // Detailed description
  description: 'The Netherlands does not impose a traditional capital gains tax; instead, assets (including crypto) are taxed under Box 3 as part of annual wealth calculations. Net assets above the exemption threshold (€57,000 for individuals, €114,000 for couples) are subject to a deemed return of 2.9% in 2025, taxed at 31%. For example, a €200,000 portfolio would incur tax on €143,000 (€200k – €57k), with deemed return = €143k × 2.9% = €4,147, resulting in tax of €1,285. Crypto holdings are valued at January 1 market rates for Box 3 calculations. As of March 2025, five firms (MoonPay, BitStaete, ZBD, Hidden Road, Socios.com) have secured MiCA licenses, enabling EUR/crypto conversions. Traditional banks like ABN AMRO, ING, and Rabobank restrict direct crypto transactions due to AML/CFT risks. For institutional investors, Fireblocks and Copper operate under MiCA via EU subsidiaries, while Talos and Zodia Custody provide MPC wallets and transaction monitoring. DeFi platforms must implement identity verification by June 2026 under MiCA compliance mandates. The Golden Visa program requires €1.25M investment in Dutch startups/venture funds with 10+ jobs created. Digital Nomad Visa requires €3,500/month income (€4,200 with dependents). Citizenship requires 5+ continuous years of residency (3+ for EU spouses), B1 Dutch proficiency, and renunciation of original citizenship unless permitted. The economy is growing at 1.3% in 2025, with 3% inflation above the ECB\'s 2% target.'
};

module.exports = nl;