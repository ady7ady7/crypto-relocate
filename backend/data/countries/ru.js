// Russia (RU) country data
const ru = {
  name: 'Russia',
  code: 'RU',
  rank: 79,
  category: 'Not favorable',
  
  // Tax information
  capitalGainsTax: '13% on gains ≤2.4M RUB/year; 15% on excess',
  capitalGainsTaxShort: '13-15%',
  wealthTax: '0%',
  incomeTax: '13-15%',
  corporateTax: '20-25%',

  // Residency details
  residencyInvestment: 'Complex',
  residencyPhysicalPresence: 'Continuous legal residence',
  residencyProcessingTime: 'Weeks to months',
  residencyDocumentation: 'Passport, visa, proof of investment/funds, family documents',
  
  // Citizenship details
  citizenshipYears: '5 years continuous residence',
  citizenshipExceptions: '2 years if married to Russian citizen',
  citizenshipLanguage: 'Russian proficiency',
  citizenshipProcessing: 'Several months to years',
  
  // Financial infrastructure
  financialServices: 'Restricted',
  cryptoFriendlyBanks: 'None officially',
  institutionalCustody: 'NSD (National Settlement Depository)',
  defiIntegration: 'DeFi protocols under AML/KYC rules',
  
  // Economic factors
  economicStability: 'Uncertain due to ongoing war',
  inflationRate: '6.8% (National Bank of Russia, 2024)',
  politicalEnvironment: 'Volatile due to conflict',
  bankingReliability: 'Compromised by conflict',
  
  // Living considerations
  costOfLivingIndex: 'Moderate',
  costOfLivingVsUS: 'Lower than US',
  housingCost: '60,000-100,000 RUB/month ($600-1,000) in Moscow',
  mealCost: '500-1,000 RUB ($5-10)',
  
  // Risk factors
  futureRisks: 'Sanctions',
  regulatoryClarity: 'Improving but uncertain',
  cryptoLegalStatus: 'Legal but heavily regulated',
  taxEnforcement: 'Increasing with 40K RUB fines for non-compliance',
  
  // Resources
  taxAuthorityWebsite: 'https://www.nalog.gov.ru/en/',
  residencyWebsite: 'Not available online',
  cryptoRegulatorWebsite: 'N/A',
  
  // Detailed description
  description: 'Russia\'s cryptocurrency tax regime, effective January 1, 2025, is defined by Federal Law No. 418FZ. Individuals pay 13% on crypto gains up to 2.4M RUB/year and 15% on amounts exceeding this threshold. Taxable events include selling crypto for RUB, crypto-to-crypto swaps, and mining/staking rewards (treated as ordinary income). FIFO methodology is mandatory, and losses from crypto cannot offset gains from other assets. Corporations pay 25% on mining (market value at receipt) and 20-25% on sales profits. The 2025 law creates a single tax base combining crypto and securities gains (Article 210.6) with penalties of 40K RUB for non-compliance. The Central Bank prohibits RUB transactions via crypto except for the CBDC pilot for cross-border trade. No Russian banks provide crypto services, forcing users to rely on Binance P2P (requiring VPNs due to EU sanctions) and domestic exchanges Bynex/Whitebird operating under tax exemptions. The High-Technology Park (HTP) provides a tax haven for registered entities, avoiding VAT and corporate tax. Institutional custody is managed by the National Settlement Depository (NSD) under Central Bank oversight. DeFi protocols must adhere to AML/KYC rules under FATF guidelines. Russia imposes no wealth tax, with crypto holdings taxed only upon disposal. Work visas require employment contracts with minimum 70K RUB/month salary. The economy shows 1.5% GDP growth with 6.8% inflation, while crypto faces risks from EU sanctions limiting access to global liquidity.'
};

module.exports = ru;