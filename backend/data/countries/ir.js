// Iran (IR) country data
const ir = {
  name: 'Iran',
  code: 'IR',
  rank: 83,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: '10-15% on profits from crypto disposals',
  capitalGainsTaxShort: '10-15%',
  wealthTax: '0%',
  incomeTax: '0-35%',
  corporateTax: '25%',

  // Residency details
  residencyInvestment: '$250,000 for five-year permit',
  residencyPhysicalPresence: 'Not explicitly required for investment-based residency',
  residencyProcessingTime: 'Several months',
  residencyDocumentation: 'Investment proof, passport, identity documents',
  
  // Citizenship details
  citizenshipYears: '5+ years residence',
  citizenshipExceptions: 'Marriage to Iranian man grants automatic citizenship to foreign women',
  citizenshipLanguage: 'Basic Persian proficiency',
  citizenshipProcessing: 'Several months to years',
  
  // Financial infrastructure
  financialServices: 'Restricted',
  cryptoFriendlyBanks: 'Coinex, Bybit/KuCoin (via VPNs)',
  institutionalCustody: 'ChainUp Custody (accessed internationally)',
  defiIntegration: 'Regulated under general AML rules',
  
  // Economic factors
  economicStability: '3.1% GDP growth projected for 2025',
  inflationRate: '42% (IMF, 2024)',
  politicalEnvironment: 'Complex with international sanctions',
  bankingReliability: 'Under pressure from sanctions',
  
  // Living considerations
  costOfLivingIndex: 'Low',
  costOfLivingVsUS: '64.8% lower than US',
  housingCost: '500–300 ﷼M/month ($600-$1,000) in Tehran',
  mealCost: '30–10 ﷼M ($2-$6)',
  
  // Risk factors
  futureRisks: 'Regulatory volatility',
  regulatoryClarity: 'Low with ambiguous framework',
  cryptoLegalStatus: 'Legally ambiguous',
  taxEnforcement: 'Inconsistent',
  
  // Resources
  taxAuthorityWebsite: 'https://www.intamedia.ir/en',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Iran\'s cryptocurrency tax regime remains ambiguous but is evolving under new regulations. Current tax framework imposes a 10% flat tax on profits from crypto disposals for individuals (Heavnn University, April 2024) and 15-25% income tax if classified as business income (IranBroker, Nov 2024; EghtesadOnline, July 2024). Draft legislation proposes a 20% flat tax on high-volume traders (Tabnak, Feb 2025), though this remains unenforced as of March 2025. The Central Bank has blocked rial payment gateways for crypto exchanges (CBI Directive, Jan 2025) and requires licensed platforms to comply with AML/CFT rules. No Iranian banks provide crypto services, forcing users to rely on platforms like Coinex, BingX, and Toobit (facilitating crypto-to-rial conversions via third-party processors) and Binance P2P (requiring VPNs due to EU sanctions). Iran lacks regulated domestic custodians, with users turning to global options like ChainUp Custody (MPC-based security with SOC 2/ISO 27001 certification). The country\'s Digital Rial CBDC pilot for cross-border trade is being developed by the CBI. Iran imposes no wealth tax on crypto holdings. Work visas require employment contracts and proof of income (≥$500/month). The economy faces 42% inflation (IMF, 2024) with 2.3% GDP growth driven by oil recovery. Crypto-specific risks include EU/OFAC sanctions limiting access to global exchanges, energy shortages with mining consuming 4% of national electricity, and regulatory volatility with draft tax laws potentially imposing retroactive penalties.'
};

module.exports = ir;