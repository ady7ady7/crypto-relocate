// China (CN) country data
const cn = {
  name: 'China',
  code: 'CN',
  rank: 82,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: 'Banned',
  capitalGainsTaxShort: 'N/A',
  wealthTax: '0%',
  incomeTax: '3-45%',
  corporateTax: '25%',

  // Residency details
  residencyInvestment: 'N/A for crypto',
  residencyPhysicalPresence: 'Must apply in person',
  residencyProcessingTime: 'Likely months',
  residencyDocumentation: 'Passport, visa, proof of qualifications, financial statements',
  
  // Citizenship details
  citizenshipYears: 'Long-term residence required',
  citizenshipExceptions: 'Close relatives of Chinese nationals',
  citizenshipLanguage: 'Required',
  citizenshipProcessing: 'Lengthy, likely years',
  
  // Financial infrastructure
  financialServices: 'Prohibited for crypto',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'Banned',
  
  // Economic factors
  economicStability: 'GDP growth projected at 4.5%-5.2%',
  inflationRate: 'Near zero, indicating deflation',
  politicalEnvironment: 'Stable under Communist Party',
  bankingReliability: 'Reliable but under pressure from high debt',
  
  // Living considerations
  costOfLivingIndex: '31.7',
  costOfLivingVsUS: '68.3% cheaper than NYC',
  housingCost: '3,000-10,000 CNY/month in city center',
  mealCost: '30-50 CNY per meal',
  
  // Risk factors
  futureRisks: 'Continued prohibition',
  regulatoryClarity: 'Very clear - cryptocurrencies are banned',
  cryptoLegalStatus: 'Illegal',
  taxEnforcement: 'Strict penalties for violations',
  
  // Resources
  taxAuthorityWebsite: 'https://www.chinatax.gov.cn/eng/',
  residencyWebsite: 'Not available for crypto activities',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'China maintains a strict ban on cryptocurrency transactions as of March 2025. The State Council directive of 2021 prohibits all cryptocurrency transactions, rendering capital gains tax irrelevant in practice. Theoretically, gains from crypto could be taxed as ordinary income (3-45%) if classified as "business income," but enforcement is impossible due to the ban. The People\'s Bank of China (PBOC) prohibits banks and payment institutions from facilitating crypto transactions under the RBF Act 1983 and Exchange Control Act 1950. No Chinese banks offer crypto services, with ICBC and China Construction Bank blocking all crypto-related transactions. Users must rely on VPNs to access platforms like Binance P2P, Bybit, and KuCoin, risking penalties of up to ¥50,000 ($7,000) for trading crypto. The country lacks licensed crypto custodians, though global options like Fireblocks and ChainUp can be accessed via international accounts (illegally under Chinese law). China\'s regulatory focus is on its Digital Yuan (e-CNY), a state-backed CBDC for domestic transactions with no blockchain interoperability with decentralized protocols. The country imposes no wealth tax on crypto holdings. China\'s GDP growth is projected at 4.5% for 2024, with deflationary pressures and weak consumer confidence, particularly in the property sector. Crypto-specific risks include legal penalties (fines, asset seizure, or imprisonment), CBDC competition marginalizing decentralized crypto, and reliance on cash or e-CNY for legal transactions.'
};

module.exports = cn;