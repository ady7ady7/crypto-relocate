const countries = [
    {
      name: 'Switzerland',
      code: 'CH',
      rank: 1,
      capitalGainsTax: '0% (1 year+)',
      wealthTax: '0.2-0.9%',
      residencyInvestment: 'CHF 450k/year',
      financialServices: 'Advanced',
      costOfLivingIndex: '103.8 (Zurich)',
      futureRisks: 'MiCA compliance',
      description: 'Switzerland offers 0% capital gains tax on crypto held over 1 year, with a wealth tax of 0.2-0.9% applied to holdings. The Distributed Ledger Technology (DLT) Act provides legal clarity for crypto businesses, while FINMA oversees AML compliance. Residency is available through lump-sum taxation with a minimum of CHF 450,000/year.'
    },
    {
      name: 'United Arab Emirates',
      code: 'AE',
      rank: 2,
      capitalGainsTax: '0%',
      wealthTax: '0%',
      residencyInvestment: 'AED 10M',
      financialServices: 'Advanced',
      costOfLivingIndex: '73.6 (Dubai)',
      futureRisks: 'Global CARF',
      description: 'The UAE offers 0% personal and corporate taxes on crypto transactions. The Dubai Virtual Assets Regulatory Authority (VARA) licenses exchanges while maintaining AML/CFT compliance. Residency is available through the Golden Visa program with an AED 10M investment, convertible from crypto.'
    },
    {
      name: 'Malta',
      code: 'MT',
      rank: 3,
      capitalGainsTax: '0% (1 year+)',
      wealthTax: '0%',
      residencyInvestment: '€500k',
      financialServices: 'Moderate',
      costOfLivingIndex: '75 (Valletta)',
      futureRisks: 'EU oversight',
      description: 'Malta has 0% capital gains tax on crypto assets held over 1 year and reduces corporate tax to 5% for foreign investors via refunds. The Virtual Financial Assets Act (VFAA) mandates exchange licensing. The Malta Permanent Residence Programme requires a €150,000 donation plus property investment.'
    },
    {
      name: 'Portugal',
      code: 'PT',
      rank: 4,
      capitalGainsTax: '28% (<1 year)',
      wealthTax: '0%',
      residencyInvestment: '€500k',
      financialServices: 'Moderate',
      costOfLivingIndex: '50.3 (Lisbon)',
      futureRisks: 'MiCA adoption',
      description: 'Portugal maintains 0% tax on crypto held over 1 year but applies 28% tax on short-term gains. The country will align with MiCA from 2025, mandating KYC for exchanges. The Golden Visa program requires a €500,000 investment, with crypto accepted after conversion.'
    },
    {
      name: 'Singapore',
      code: 'SG',
      rank: 5,
      capitalGainsTax: '0%',
      wealthTax: '0%',
      residencyInvestment: 'S$2.5M',
      financialServices: 'Advanced',
      costOfLivingIndex: '79.1 (Singapore)',
      futureRisks: 'FATF Travel Rule',
      description: 'Singapore has 0% capital gains tax with a corporate tax rate of 17%. The Payment Services Act (2020) mandates licensing for exchanges. The Global Investor Programme requires a S$2.5M investment, which is crypto-convertible. DBS Bank offers integrated crypto trading and custody services.'
    },
    {
      name: 'Germany',
      code: 'DE',
      rank: 6,
      capitalGainsTax: '0% (1 year+)',
      wealthTax: 'Yes',
      residencyInvestment: 'N/A',
      financialServices: 'Advanced',
      costOfLivingIndex: '66.5 (Berlin)',
      futureRisks: 'EU directives',
      description: 'Germany offers 0% tax on crypto held over 1 year but taxes short-term gains up to 45%. MiCA compliance will be required from 2025, with BaFin overseeing AML regulations. While there is no crypto-specific residency pathway, a freelancer visa is available.'
    },
    {
      name: 'El Salvador',
      code: 'SV',
      rank: 7,
      capitalGainsTax: '0%',
      wealthTax: '0%',
      residencyInvestment: '$1M BTC',
      financialServices: 'Limited',
      costOfLivingIndex: '42.3 (San Salvador)',
      futureRisks: 'IMF instability',
      description: 'El Salvador offers 0% taxes on all crypto transactions with minimal oversight. Bitcoin has been legal tender since 2021. Citizenship-by-investment is available for $1M in BTC, though financial infrastructure is limited with heavy reliance on the Chivo Wallet.'
    }
  ];
  
  module.exports = countries;