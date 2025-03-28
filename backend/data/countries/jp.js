// Japan (JP) country data
const jp = {
  name: 'Japan',
  code: 'JP',
  rank: 36,
  category: 'Moderate',
  
  // Tax information
  capitalGainsTax: '15-55% (current), 20% flat (proposed)',
  capitalGainsTaxShort: '15-55%',
  wealthTax: '0%',
  incomeTax: '5-45% progressive',
  corporateTax: '29.74% (national + local)',
  
  // Residency details
  residencyInvestment: '¥5M ($34k) business',
  residencyPhysicalPresence: '10 years typically, 1-3 years for skilled professionals',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Passport, visa application, proof of income/assets',
  
  // Citizenship details
  citizenshipYears: '5 years of residency',
  citizenshipExceptions: 'Renunciation of prior nationality required',
  citizenshipLanguage: 'Japanese proficiency required',
  citizenshipProcessing: 'Up to 18 months',
  
  // Financial infrastructure
  financialServices: 'Advanced',
  cryptoFriendlyBanks: 'SBI Sumishin Net Bank, Revolut',
  institutionalCustody: 'Available via Komainu (Nomura JV)',
  defiIntegration: 'Limited, access to global platforms',
  
  // Economic factors
  economicStability: 'Growth above trend at 1.2% in 2025',
  inflationRate: 'Core inflation at 2%',
  politicalEnvironment: 'Unstable due to ruling coalition\'s loss of majority',
  bankingReliability: 'Stable, BoJ rate hikes to 1% by 2025',
  
  // Living considerations
  costOfLivingIndex: 'N/A',
  costOfLivingVsUS: '26.2% lower than US',
  housingCost: '¥84,000 ($559) monthly for one-bedroom in city center',
  mealCost: '¥1,000 ($6.70) at inexpensive restaurant',
  
  // Risk factors
  futureRisks: 'U.S. tariffs and China\'s economic slowdown',
  regulatoryClarity: 'Improving with potential tax reforms',
  cryptoLegalStatus: 'Legal and regulated by FSA',
  taxEnforcement: 'High with detailed reporting requirements',
  
  // Resources
  taxAuthorityWebsite: 'https://www.nta.go.jp/english/',
  residencyWebsite: 'https://www.moj.go.jp/isa/applications/procedures/index.html',
  cryptoRegulatorWebsite: 'https://www.fsa.go.jp/en/',
  
  // Detailed description
  description: 'Japan currently taxes cryptocurrency gains at 15-55% as miscellaneous income, though reforms proposing a reduced 20% flat rate by April 2025 are underway, aligning with traditional financial assets. There is no wealth tax. Banking options include SBI Sumishin Net Bank offering crypto trading and yield products, while Revolut provides a fintech option for crypto transactions. Traditional banks are generally cautious. Institutional custody is available through Komainu, a joint venture between Nomura, Ledger, and CoinShares. DeFi integration is still developing, with no prominent local platforms but access to global services. Residency typically requires 10 years, though skilled professionals can qualify in 1-3 years with high points on the evaluation system. Citizenship via naturalization takes 5 years, requires renouncing prior nationality, and has high approval rates around 99%. The economy is expected to grow at 1.2% in 2025, with core inflation at 2% and a virtuous cycle of wages and inflation. Political instability exists due to the ruling coalition\'s loss of majority, potentially leading to legislative deadlock.'
};

module.exports = jp;