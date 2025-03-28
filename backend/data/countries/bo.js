// Bolivia (BO) country data
const bo = {
  name: 'Bolivia',
  code: 'BO',
  rank: 71,
  category: 'Restrictive',
  
  // Tax information
  capitalGainsTax: '13% business income',
  capitalGainsTaxShort: '13%',
  wealthTax: '0.5-1.5% on net worth over $100k',
  incomeTax: '0-13% individuals, 25% corporate',
  corporateTax: '25%',

  // Residency details
  residencyInvestment: 'Employment/family ties only',
  residencyPhysicalPresence: '5 years for permanent residency',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Passport, criminal record, financial means ($300/month)',
  
  // Citizenship details
  citizenshipYears: '5+ years of residence',
  citizenshipExceptions: 'None specified',
  citizenshipLanguage: 'Spanish proficiency',
  citizenshipProcessing: 'Several years',
  
  // Financial infrastructure
  financialServices: 'Underdeveloped',
  cryptoFriendlyBanks: 'Banco Bisa (sole regulated bank offering USDT custody)',
  institutionalCustody: 'Limited',
  defiIntegration: 'Minimal',
  
  // Economic factors
  economicStability: 'Volatile',
  inflationRate: '4.2%',
  politicalEnvironment: 'Unstable with frequent changes',
  bankingReliability: 'Moderate',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: '60.4% lower than US',
  housingCost: 'BOB 3,000-5,000/month ($430-$720) in La Paz',
  mealCost: 'BOB 50-150 ($7-$21)',
  
  // Risk factors
  futureRisks: 'Continued prohibition',
  regulatoryClarity: 'Low with conflicting interpretations',
  cryptoLegalStatus: 'Legal since ban lifting in June 2024',
  taxEnforcement: 'Low with limited oversight',
  
  // Resources
  taxAuthorityWebsite: 'www.seniat.gob.bo',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Bolivia does not impose a traditional capital gains tax on individuals. However, profits from asset disposals (including cryptocurrencies) may be taxed as ordinary income if deemed part of a business activity, with progressive income tax rates of 0-13% for individuals and 25% corporate tax for businesses. Individual crypto gains are taxed at 13% if classified as capital gains, while business crypto income is taxed at 25%. The 2025 State Budget allows crypto for fuel imports but doesn\'t clarify tax treatment, and a draft legislation from 2024 proposed a 5% flat tax on non-business crypto gains (pending parliamentary approval). The Banco Central de Bolivia (BCB) lifted the crypto ban in June 2024, allowing financial institutions to handle crypto transactions. Banco Bisa is the sole regulated bank offering USDT custody, while Binance P2P dominates BOB liquidity in the unregulated market. Bolivia\'s wealth tax applies to fortunes over BOB 30MM (USD 4.3MM) at rates between 1.4% and 2.4%, including foreign assets. Citizenship requires 5+ years of continuous residence, good character, Spanish proficiency, and mandatory renunciation of other citizenships unless permitted by origin country. The economy shows GDP growth of 1.3% with inflation at 4.2%.'
};

module.exports = bo;