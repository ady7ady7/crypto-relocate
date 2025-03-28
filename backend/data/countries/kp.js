// North Korea (KP) country data
const kp = {
  name: 'North Korea',
  code: 'KP',
  rank: 84,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: 'Illicit gains',
  capitalGainsTaxShort: 'N/A',
  wealthTax: '0%',
  incomeTax: 'State-controlled',
  corporateTax: 'State-controlled',

  // Residency details
  residencyInvestment: 'No formal programs',
  residencyPhysicalPresence: 'N/A',
  residencyDocumentation: 'N/A for foreigners; internal travel requires government approval',
  residencyProcessingTime: 'N/A',
  
  // Citizenship details
  citizenshipYears: 'Exclusively hereditary',
  citizenshipExceptions: 'None',
  citizenshipLanguage: 'Fluency in Korean (Pyongyang dialect) mandatory',
  citizenshipProcessing: 'N/A',
  
  // Financial infrastructure
  financialServices: 'None',
  cryptoFriendlyBanks: 'None',
  institutionalCustody: 'None',
  defiIntegration: 'Exploitation over innovation',
  
  // Economic factors
  economicStability: 'Secretive; estimated GDP $30B (2024)',
  inflationRate: 'Hyperinflation; food prices rose 300% since 2020',
  politicalEnvironment: 'Authoritarian',
  bankingReliability: 'Unreliable, state-controlled',
  
  // Living considerations
  costOfLivingIndex: 'Extremely low',
  costOfLivingVsUS: 'Not applicable',
  housingCost: '$50-100/month (state-subsidized)',
  mealCost: '$10-30 (black market)',
  
  // Risk factors
  futureRisks: 'OFAC/UAE joint operations',
  regulatoryClarity: 'None, legal vacuum',
  cryptoLegalStatus: 'State-sponsored hacking, illegal for citizens',
  taxEnforcement: 'Not applicable',
  
  // Resources
  taxAuthorityWebsite: 'No public website',
  residencyWebsite: 'N/A',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'North Korea does not impose formal capital gains taxes, as its cryptocurrency activities are primarily illicit and state-sponsored. Crypto assets acquired via hacking (e.g., $1.5B Bybit heist in March 2025) fund military/nuclear programs, bypassing international sanctions. There is no domestic tax reporting for stolen crypto, which is laundered through decentralized exchanges (DEXs) and mixers like Tornado Cash. According to the UN Security Council (2024), 40% of North Korea\'s WMD programs are funded by stolen crypto, with over $3B stolen since 2017 according to Chainalysis. The country uses state-sponsored hacking via the Lazarus Group to target exchanges (Bybit, KuCoin) and DeFi protocols, with funds converted via DEXs (e.g., Pintu, Uniswap) and OTC brokers in UAE/China. Money laundering is facilitated through Tornado Cash (which mixed $300M+ from the Bybit hack) and privacy coins (Monero, Zcash). No North Korean banks offer crypto services, with crypto assets controlled by the state. North Korea imposes no wealth tax, with crypto holdings treated as state-controlled assets. Foreign residency/citizenship is prohibited, with only regime elites and hackers having crypto access while ordinary citizens face strict travel bans. Citizenship is exclusively hereditary and granted only to ethnic Koreans. The economy faces hyperinflation with food prices rising 300% since 2020. Crypto-specific risks include OFAC/UAE joint operations targeting laundering networks, energy dependency with coal-powered mining facing outages, and market volatility impacting the liquidity of stolen assets.'
};

module.exports = kp;