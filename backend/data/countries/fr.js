// France (FR) country data
const fr = {
  name: 'France',
  code: 'FR',
  rank: 42,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '30% flat',
  capitalGainsTaxShort: '30%',
  wealthTax: '1.5% (€1.3M+, real estate only)',
  incomeTax: '0-45% progressive',
  corporateTax: '25%',
  
  // Residency details
  residencyInvestment: '€300k business',
  residencyPhysicalPresence: '5 years for permanent residency',
  residencyProcessingTime: 'Several months to a year',
  residencyDocumentation: 'Proof of identity, residence permit, address, financial resources',
  
  // Citizenship details
  citizenshipYears: '5 years residency (4 years if married to French citizen)',
  citizenshipExceptions: 'Dual citizenship allowed',
  citizenshipLanguage: 'French proficiency required',
  citizenshipProcessing: '18 months',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'Revolut, N26, Banque Delubac & Cie',
  institutionalCustody: 'CACEIS, Hex Trust, global providers',
  defiIntegration: 'Developing, access to global platforms',
  
  // Economic factors
  economicStability: 'Projected growth 0.8% in 2025',
  inflationRate: '1.8% by early 2025',
  politicalEnvironment: 'Stable under President Macron',
  bankingReliability: 'Strong, among Europe\'s most stable',
  
  // Living considerations
  costOfLivingIndex: '63.7',
  costOfLivingVsUS: '5.5% lower than US',
  housingCost: '€1,200-1,500/month for one-bedroom apartment in Paris',
  mealCost: '€15-20 per person at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'Possible "unproductive wealth tax" on crypto',
  regulatoryClarity: 'High with EU MiCA implementation',
  cryptoLegalStatus: 'Legal and regulated',
  taxEnforcement: 'Moderate, increasing with EU directives',
  
  // Resources
  taxAuthorityWebsite: 'https://www.impots.gouv.fr/',
  residencyWebsite: 'https://www.service-public.fr/particuliers/vosdroits/F39?lang=en',
  cryptoRegulatorWebsite: 'https://www.amf-france.org/en',
  
  // Detailed description
  description: 'France taxes capital gains on securities, including cryptocurrencies, at a flat rate of 30% (PFU), which includes 12.8% income tax and 17.2% social levies. There is a tax-free allowance of up to €305 per year for capital gains from crypto assets, and no distinction is made between long-term and short-term holdings. Crypto-to-crypto trades are not taxable, providing flexibility for traders, but selling for fiat or using crypto to purchase goods/services triggers taxation. The wealth tax (IFI) applies only to real estate assets over €1.3M, not cryptocurrencies. Traditional banks like BNP Paribas and Société Générale have restrictions on crypto transactions, but fintechs like Revolut and N26, and banks like Banque Delubac & Cie, offer crypto-friendly services. Institutional custody is available via CACEIS (Credit Agricole subsidiary) and Hex Trust. DeFi integration is still developing, with no prominent local platforms but growing community interest. Residency typically requires 5 years for permanent status, while citizenship takes 5 years (4 if married to a French citizen), requiring language proficiency and an 18-month processing time. The economy is projected to grow by 0.8% in 2025, with inflation at 1.8%.'
};

module.exports = fr;