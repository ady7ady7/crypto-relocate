// frontend/src/pages/FAQPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { ScrollReveal, fadeInAnimation } from '../components/animations';
import { TaxIcon, WealthIcon, ResidencyIcon, BankIcon, InfoIcon, PassportIcon, RiskIcon, CryptoIcon } from '../components/illustrations/Icons';
import { Colors } from '../components/styles/Colors';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  // Toggle question expansion
  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  // FAQ categories
  const categories = [
    { id: 'general', label: 'General', icon: InfoIcon, color: Colors.accent },
    { id: 'tax', label: 'Taxation', icon: TaxIcon, color: Colors.success },
    { id: 'residency', label: 'Residency & Citizenship', icon: ResidencyIcon, color: Colors.countryFavorable },
    { id: 'financial', label: 'Financial Services', icon: BankIcon, color: Colors.warning },
    { id: 'using', label: 'Using CryptoRelocate', icon: CryptoIcon, color: Colors.countryExcellent },
  ];
  
  // FAQ items for each category
  const faqItems = {
    general: [
      {
        id: 'general-1',
        title: "What is CryptoRelocate?",
        content: (
          <div>
            <p>
              CryptoRelocate is an interactive platform designed to help cryptocurrency investors, 
              traders, and enthusiasts find the most favorable countries for relocation based on 
              crypto taxation, residency requirements, financial infrastructure, and overall crypto-friendliness.
            </p>
            <p>Our platform provides:</p>
            <ul>
              <li>Comprehensive rankings of countries worldwide</li>
              <li>Detailed country profiles and taxation analysis</li>
              <li>Comparison tools for different jurisdictions</li>
              <li>Visual data representations through maps and charts</li>
              <li>Up-to-date regulatory information</li>
            </ul>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.accent
      },
      {
        id: 'general-2',
        title: "How are countries ranked on CryptoRelocate?",
        content: (
          <div>
            <p>
              Countries are ranked based on a comprehensive analysis of several factors:
            </p>
            <ul>
              <li><strong>Taxation</strong>: Capital gains tax rates, wealth taxes, and special crypto tax provisions</li>
              <li><strong>Residency Options</strong>: Investment requirements, physical presence requirements, and processing times</li>
              <li><strong>Financial Infrastructure</strong>: Availability of crypto-friendly banking, institutional services, and DeFi integration</li>
              <li><strong>Regulatory Environment</strong>: Legal status of cryptocurrency, regulatory clarity, and future risks</li>
              <li><strong>Economic Factors</strong>: Economic stability, inflation rates, and cost of living</li>
            </ul>
            <p>Each factor is weighted to create our proprietary ranking system, with countries categorized as Excellent, Favorable, Moderate, Restrictive, or Not Favorable.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.success
      },
      {
        id: 'general-3',
        title: "How often is the country data updated?",
        content: (
          <div>
            <p>
              We strive to update our country data quarterly, or whenever significant regulatory changes occur
              that might affect a country's crypto-friendliness. Cryptocurrency regulations are evolving rapidly,
              so we continuously monitor global developments and update our rankings accordingly.
            </p>
            <p>Our update process includes:</p>
            <ul>
              <li>Tracking regulatory announcements from government sources</li>
              <li>Monitoring tax law changes affecting cryptocurrency</li>
              <li>Following residency program modifications</li>
              <li>Updating banking and financial services information</li>
              <li>Incorporating feedback from users and local experts</li>
            </ul>
            <p>The last update date is displayed on each country's detailed page. Always verify the latest 
              information with official sources before making relocation decisions.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.countryModerate
      },
      {
        id: 'general-4',
        title: "Is relocating for crypto tax benefits legal?",
        content: (
          <div>
            <p>
              Yes, relocating to optimize your tax situation is generally legal, but it must be done properly. 
              This practice, known as "tax migration," is permitted when you genuinely establish residency in 
              your new jurisdiction and follow all applicable laws.
            </p>
            <p>However, it's crucial to understand that:</p>
            <ul>
              <li>Simply holding a residence permit while continuing to live in your home country may constitute tax evasion</li>
              <li>Many countries have "tax exit" requirements when you cease tax residency</li>
              <li>You must comply with reporting requirements in both your new country and possibly your former country</li>
              <li>Formal tax residency often requires substantial physical presence</li>
              <li>Documentation and evidence of your move are essential for audit protection</li>
            </ul>
            <p>We strongly recommend consulting with qualified tax and immigration professionals before making any relocation decisions.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.warning
      },
      {
        id: 'general-5',
        title: "What is the Common Reporting Standard (CRS) and how does it affect crypto holders?",
        content: (
          <div>
            <p>
              The Common Reporting Standard (CRS) is an information standard for the automatic exchange of 
              financial account information between participating countries. Over 100 jurisdictions have 
              committed to implementing CRS.
            </p>
            <p>For crypto holders, CRS has important implications:</p>
            <ul>
              <li>Traditional financial institutions report account information to tax authorities</li>
              <li>Some crypto exchanges are now implementing CRS compliance</li>
              <li>The Crypto-Asset Reporting Framework (CARF) will expand reporting requirements specifically for crypto assets</li>
              <li>Financial account information is automatically shared between tax authorities</li>
              <li>Unreported income or assets become increasingly difficult to conceal</li>
            </ul>
            <p>This means that tax authorities are increasingly able to track crypto holdings across borders,
              making proper tax compliance essential regardless of where you live.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.danger
      }
    ],
    tax: [
      {
        id: 'tax-1',
        title: "How are cryptocurrencies taxed in different countries?",
        content: (
          <div>
            <p>
              Cryptocurrency taxation varies significantly by country:
            </p>
            <ul>
              <li><strong>Zero Tax Jurisdictions</strong>: Countries like Portugal (for non-professional traders), UAE, and Singapore (for long-term investors) apply no capital gains tax on cryptocurrency transactions.</li>
              <li><strong>Traditional Capital Gains</strong>: Most countries like the US, UK, and Australia treat crypto as an asset subject to capital gains tax.</li>
              <li><strong>Income Tax</strong>: Some jurisdictions like New Zealand treat all crypto gains as income, subject to higher tax rates.</li>
              <li><strong>Special Regimes</strong>: Countries like Malta and Switzerland have specific provisions for crypto traders and investors.</li>
              <li><strong>Transaction Taxes</strong>: Some countries apply special taxes on transaction volume rather than gains.</li>
            </ul>
            <p>Tax treatment can also differ based on the holding period, transaction volume, and whether activities are considered personal or professional trading.</p>
          </div>
        ),
        icon: TaxIcon,
        color: Colors.accent
      },
      {
        id: 'tax-2',
        title: "What's the difference between capital gains tax and income tax for crypto?",
        content: (
          <div>
            <p>
              The distinction between capital gains tax and income tax for cryptocurrency is crucial:
            </p>
            <p><strong>Capital Gains Tax:</strong></p>
            <ul>
              <li>Typically applied to assets held as investments</li>
              <li>Often has lower rates than income tax</li>
              <li>May have reduced rates for long-term holdings (e.g., 1+ years)</li>
              <li>Usually allows offsetting with capital losses</li>
              <li>Often has annual exemption amounts in many jurisdictions</li>
            </ul>
            <p><strong>Income Tax:</strong></p>
            <ul>
              <li>Applied to regular income and sometimes frequent trading activities</li>
              <li>Generally has higher progressive rates</li>
              <li>Typically doesn't distinguish between short and long-term holdings</li>
              <li>May have additional social security or health insurance contributions</li>
              <li>Often applies to mining, staking, and airdrops</li>
            </ul>
            <p>Many jurisdictions determine which tax applies based on factors like transaction frequency, intent (investment vs. business), and holding period.</p>
          </div>
        ),
        icon: TaxIcon,
        color: Colors.success
      },
      {
        id: 'tax-3',
        title: "What is wealth tax and which countries apply it to crypto?",
        content: (
          <div>
            <p>
              Wealth tax is an annual tax on the total value of assets owned, regardless of whether they generate income or are sold. For crypto assets:
            </p>
            <p><strong>Countries with wealth tax that includes crypto:</strong></p>
            <ul>
              <li><strong>Switzerland</strong>: 0.02-1.03% depending on canton</li>
              <li><strong>Spain</strong>: 0.16-3.5% on assets above €700,000</li>
              <li><strong>Norway</strong>: 1.0-1.1% on assets above NOK 1.7M</li>
              <li><strong>Netherlands</strong>: 31% "Box 3" tax on deemed returns from assets</li>
              <li><strong>Argentina</strong>: 0.5-1.25% on assets above certain thresholds</li>
            </ul>
            <p><strong>Important considerations:</strong></p>
            <ul>
              <li>Wealth tax creates a tax liability even if you don't sell your crypto</li>
              <li>Valuation methods for crypto assets vary by jurisdiction</li>
              <li>Some countries exempt certain assets or have high thresholds before the tax applies</li>
              <li>The tax is typically calculated based on asset value on a specific date</li>
              <li>Reporting requirements may be complex for volatile assets like cryptocurrency</li>
            </ul>
            <p>Countries without wealth tax (like UAE, Singapore, and most Caribbean jurisdictions) may be more attractive for holders of significant crypto assets.</p>
          </div>
        ),
        icon: WealthIcon,
        color: Colors.countryFavorable
      },
      {
        id: 'tax-4',
        title: "How are crypto-to-crypto transactions taxed?",
        content: (
          <div>
            <p>
              The taxation of crypto-to-crypto transactions (e.g., trading BTC for ETH) varies significantly between jurisdictions:
            </p>
            <p><strong>Common approaches:</strong></p>
            <ul>
              <li><strong>Taxable Events</strong>: Most countries (US, UK, Australia) treat each crypto-to-crypto trade as a taxable event, requiring capital gains calculation</li>
              <li><strong>Tax-Free Exchanges</strong>: Some countries (e.g., Poland) don't tax crypto-to-crypto exchanges until converted to fiat</li>
              <li><strong>Deemed Acquisition Cost</strong>: Certain jurisdictions use simplified methods to determine the cost basis</li>
              <li><strong>Exchange Fee Deductions</strong>: Some jurisdictions allow deducting trading fees from gains</li>
              <li><strong>Like-Kind Exchange</strong>: Very few jurisdictions apply like-kind exchange treatment to crypto trades</li>
            </ul>
            <p><strong>Calculation methods:</strong></p>
            <ul>
              <li><strong>FIFO (First In, First Out)</strong>: Used in the US, Australia</li>
              <li><strong>LIFO (Last In, First Out)</strong>: Allowed in some countries</li>
              <li><strong>Specific Identification</strong>: Permitted in the US and some other countries</li>
              <li><strong>Average Cost</strong>: Used in Canada and some European countries</li>
              <li><strong>Highest In, First Out</strong>: Used to maximize losses in some jurisdictions where allowed</li>
            </ul>
            <p>Accurate record-keeping of all trades is essential regardless of jurisdiction, as retroactive tax calculation can be extremely difficult.</p>
          </div>
        ),
        icon: CryptoIcon,
        color: Colors.warning
      },
      {
        id: 'tax-5',
        title: "How are DeFi activities (staking, lending, liquidity mining) taxed?",
        content: (
          <div>
            <p>
              DeFi activities present complex tax scenarios that many jurisdictions are still clarifying:
            </p>
            <p><strong>Staking:</strong></p>
            <ul>
              <li>Often treated as ordinary income when rewards are received (US, UK, Australia)</li>
              <li>Some countries tax only upon conversion to fiat</li>
              <li>Tax basis for rewards is typically the fair market value when received</li>
              <li>May be considered passive income in some jurisdictions</li>
              <li>Validator node operations may have different treatment than delegate staking</li>
            </ul>
            <p><strong>Lending & Interest:</strong></p>
            <ul>
              <li>Generally treated as income in most jurisdictions</li>
              <li>In some countries, may be considered capital gains if tied to appreciation</li>
              <li>May qualify for special interest income treatment</li>
              <li>Platform fees are often deductible against income</li>
              <li>Liquidation events can trigger complex tax situations</li>
            </ul>
            <p><strong>Liquidity Mining & Yield Farming:</strong></p>
            <ul>
              <li>Token rewards usually taxed as income when received</li>
              <li>Impermanent loss might be deductible in some jurisdictions (case-by-case)</li>
              <li>LP token receipt may or may not trigger a taxable event</li>
              <li>Automated compounding creates tracking challenges</li>
              <li>Reward tokens have a cost basis equal to their value when received</li>
            </ul>
            <p>Due to the complexity and evolving nature of DeFi taxation, specialized crypto tax advisors are recommended for active DeFi participants.</p>
          </div>
        ),
        icon: TaxIcon,
        color: Colors.danger
      }
    ],
    residency: [
      {
        id: 'residency-1',
        title: "What is tax residency and how is it determined?",
        content: (
          <div>
            <p>
              Tax residency determines which country has the primary right to tax your worldwide income and assets. Unlike citizenship or physical residency, tax residency is based on specific criteria:
            </p>
            <p><strong>Common factors determining tax residency:</strong></p>
            <ul>
              <li><strong>Physical Presence Test</strong>: Most countries use the "183 days" rule (spending more than half the year in that country)</li>
              <li><strong>Permanent Home</strong>: Having your primary residence in the country</li>
              <li><strong>Center of Vital Interests</strong>: Where your economic and personal ties are strongest</li>
              <li><strong>Habitual Abode</strong>: Where you regularly live</li>
              <li><strong>Domicile</strong>: Your permanent legal home (especially relevant in common law countries)</li>
            </ul>
            <p><strong>Important considerations:</strong></p>
            <ul>
              <li>It's possible to be tax resident in multiple countries simultaneously</li>
              <li>Tax treaties typically contain "tie-breaker" rules to resolve dual residency</li>
              <li>Some countries (like the US) tax based on citizenship regardless of residency</li>
              <li>"Tax residency" and "legal residency" are different concepts and don't necessarily align</li>
              <li>Breaking tax residency often requires formal notification to tax authorities</li>
            </ul>
            <p>Establishing and changing tax residency requires careful planning and proper documentation. Formal exit procedures from your current tax residence may be necessary.</p>
          </div>
        ),
        icon: ResidencyIcon,
        color: Colors.accent
      },
      {
        id: 'residency-2',
        title: "What are investment residency programs?",
        content: (
          <div>
            <p>
              Investment residency programs (also called "golden visas") allow individuals to obtain residency permits by making a qualifying investment in the host country.
            </p>
            <p><strong>Common types of qualifying investments:</strong></p>
            <ul>
              <li><strong>Real Estate</strong>: Purchasing property (e.g., Portugal: €500,000, Spain: €500,000)</li>
              <li><strong>Business Investment</strong>: Starting or investing in local companies (e.g., Singapore: SGD 2.5M)</li>
              <li><strong>Government Bonds</strong>: Investing in state bonds (e.g., some EU countries)</li>
              <li><strong>Direct Donation</strong>: Non-recoverable contribution to government funds (e.g., Caribbean programs)</li>
              <li><strong>Job Creation</strong>: Establishing businesses that employ local citizens</li>
            </ul>
            <p><strong>Benefits:</strong></p>
            <ul>
              <li>Legal residency without employment or family ties</li>
              <li>Minimal physical presence requirements in many programs</li>
              <li>Potential pathway to citizenship (in some countries)</li>
              <li>Possibility of favorable tax treatment</li>
              <li>Freedom to live, work, and study in the country</li>
            </ul>
            <p>These programs are particularly popular among crypto investors seeking tax optimization and geographic flexibility.</p>
          </div>
        ),
        icon: ResidencyIcon,
        color: Colors.success
      },
      {
        id: 'residency-3',
        title: "Can I become a tax resident in a crypto-friendly country without relocating?",
        content: (
          <div>
            <p>
              Generally, no. Simply obtaining legal residency (such as through an investment program) does not automatically make you a tax resident if you don't physically live there.
            </p>
            <p><strong>Requirements typically include:</strong></p>
            <ul>
              <li>Physical presence in the country (often 183+ days per year)</li>
              <li>Having your permanent home and center of vital interests there</li>
              <li>Properly exiting your previous tax residency</li>
              <li>Documentation proving your actual relocation (housing lease/purchase, utility bills, etc.)</li>
              <li>Severing or significantly reducing ties with your previous country</li>
            </ul>
            <p><strong>Important warnings:</strong></p>
            <ul>
              <li>Claiming tax residency without genuine relocation may constitute tax fraud</li>
              <li>Many countries have exit taxes when you cease tax residency</li>
              <li>Tax authorities increasingly share information internationally (CRS, FATCA)</li>
              <li>The "substance over form" principle allows tax authorities to look beyond legal arrangements</li>
              <li>Penalties for tax evasion can be severe, including criminal prosecution</li>
            </ul>
            <p>Some countries have more favorable physical presence requirements than others. For example, Panama and Malaysia allow tax residency with significantly less than 183 days of physical presence, but still require genuine ties to the country.</p>
          </div>
        ),
        icon: RiskIcon,
        color: Colors.danger
      },
      {
        id: 'residency-4',
        title: "What's the difference between residency and citizenship by investment?",
        content: (
          <div>
            <p>
              Residency and citizenship by investment are distinct programs with different benefits, requirements, and implications:
            </p>
            <p><strong>Residency by Investment:</strong></p>
            <ul>
              <li>Grants temporary or permanent right to live in the country</li>
              <li>Usually requires renewal after a certain period</li>
              <li>May have physical presence requirements</li>
              <li>Typically lower investment threshold</li>
              <li>Often faster processing time</li>
            </ul>
            <p><strong>Citizenship by Investment:</strong></p>
            <ul>
              <li>Provides full citizenship, including passport</li>
              <li>Permanent status that generally doesn't need renewal</li>
              <li>Minimal or no physical presence requirements</li>
              <li>Typically higher investment threshold</li>
              <li>May provide visa-free travel to more countries</li>
            </ul>
            <p><strong>Examples:</strong></p>
            <ul>
              <li><strong>Residency Only</strong>: Portugal Golden Visa, Thailand Elite Visa</li>
              <li><strong>Pathway from Residency to Citizenship</strong>: Malta, Cyprus (with additional requirements)</li>
              <li><strong>Direct Citizenship</strong>: Caribbean programs (St. Kitts & Nevis, Dominica, etc.)</li>
              <li><strong>Hybrid Programs</strong>: Turkey (citizenship available within months of residency)</li>
              <li><strong>Special Economic Zones</strong>: Cayman Islands, Dubai's special zones</li>
            </ul>
            <p>For crypto investors, residency programs often provide sufficient tax benefits at a lower cost, while citizenship programs offer maximum travel flexibility and long-term security.</p>
          </div>
        ),
        icon: PassportIcon,
        color: Colors.warning
      },
      {
        id: 'residency-5',
        title: "How do Digital Nomad visas work for crypto investors?",
        content: (
          <div>
            <p>
              Digital Nomad visas are specialized residency permits for remote workers, including crypto investors who can demonstrate income. These newer visa categories can offer attractive options:
            </p>
            <p><strong>Key features:</strong></p>
            <ul>
              <li>Designed for location-independent workers and investors</li>
              <li>Typically valid for 6-24 months (some renewable)</li>
              <li>Usually require proof of minimum monthly income</li>
              <li>Many countries don't tax foreign-source income during this period</li>
              <li>Generally simpler application process than traditional visas</li>
            </ul>
            <p><strong>Popular digital nomad visa countries for crypto:</strong></p>
            <ul>
              <li><strong>Portugal</strong>: D7 Visa allows passive income, including crypto</li>
              <li><strong>Estonia</strong>: Digital Nomad Visa with minimal taxation of foreign income</li>
              <li><strong>Dubai (UAE)</strong>: Remote Work Visa with zero personal income tax</li>
              <li><strong>Costa Rica</strong>: Rentista Visa accepting crypto income proof</li>
              <li><strong>Panama</strong>: Friendly Nations Visa with territorial tax system</li>
            </ul>
            <p>Digital nomad visas can be an excellent "try before you buy" option before committing to a permanent residency program in a crypto-friendly jurisdiction.</p>
          </div>
        ),
        icon: ResidencyIcon,
        color: Colors.countryFavorable
      }
    ],
    financial: [
      {
        id: 'financial-1',
        title: "Which banks are most crypto-friendly internationally?",
        content: (
          <div>
            <p>
              Finding crypto-friendly banking services is crucial for crypto investors relocating internationally. While bank policies can change frequently, these institutions are known for being more accommodating to crypto activities:
            </p>
            <p><strong>Europe:</strong></p>
            <ul>
              <li><strong>Fidor Bank</strong> (Germany): Partnered with Bitcoin.de and kraken</li>
              <li><strong>Bank Frick</strong> (Liechtenstein): Supports crypto trading and custody</li>
              <li><strong>Revolut</strong> (UK/EU): Offers crypto trading and conversion to fiat</li>
              <li><strong>Dukascopy</strong> (Switzerland): Accepts deposits from regulated exchanges</li>
              <li><strong>Bankera</strong> (Lithuania): Crypto-focused banking services</li>
            </ul>
            <p><strong>Americas:</strong></p>
            <ul>
              <li><strong>Silvergate Bank</strong> (US): Specialized in cryptocurrency business</li>
              <li><strong>Metropolitan Commercial Bank</strong> (US): Works with crypto companies</li>
              <li><strong>Deltec Bank</strong> (Bahamas): Popular with crypto businesses</li>
              <li><strong>Banesco</strong> (Panama): More open to crypto transactions</li>
              <li><strong>Evolve Bank & Trust</strong> (US): Partner to many crypto platforms</li>
            </ul>
            <p><strong>Asia & Others:</strong></p>
            <ul>
              <li><strong>DBS</strong> (Singapore): Launched Digital Exchange for cryptocurrencies</li>
              <li><strong>SEBA Bank</strong> (Switzerland): Fully regulated crypto bank</li>
              <li><strong>Julius Baer</strong> (Switzerland): Offers digital asset services</li>
              <li><strong>Signature Bank</strong> (US): Created Signet for crypto payments</li>
              <li><strong>Al Hilal Bank</strong> (UAE): More accommodating to crypto businesses</li>
            </ul>
            <p>Always verify current policies directly with the bank, as crypto acceptance can change rapidly with regulatory developments.</p>
          </div>
        ),
        icon: BankIcon,
        color: Colors.accent
      },
      {
        id: 'financial-2',
        title: "How do I prove the source of my crypto wealth to banks and authorities?",
        content: (
          <div>
            <p>
              Proving the legitimacy of your cryptocurrency wealth is increasingly important when dealing with banks, tax authorities, and immigration offices. Proper documentation helps avoid account freezes, tax audits, or visa rejections.
            </p>
            <p><strong>Essential documentation to maintain:</strong></p>
            <ul>
              <li><strong>Original Acquisition Records</strong>: Exchange records, bank transfers, or mining evidence showing how you initially acquired crypto</li>
              <li><strong>Trading History</strong>: Complete transaction logs from exchanges or wallet addresses</li>
              <li><strong>Tax Returns</strong>: Previous years' tax filings showing declared crypto income or assets</li>
              <li><strong>Blockchain Analytics Reports</strong>: Professional reports from firms like Chainalysis or CipherTrace</li>
              <li><strong>Bank Statements</strong>: Showing fiat deposits from reputable exchanges</li>
            </ul>
            <p><strong>Best practices:</strong></p>
            <ul>
              <li>Maintain a chronological record of all purchases, sales, and transfers</li>
              <li>Keep screenshots of transactions at the time they occur</li>
              <li>Document wallet addresses you control</li>
              <li>Consider a crypto accounting service for extensive holdings</li>
              <li>Generate periodic statements from exchanges</li>
            </ul>
            <p>The standards for acceptable documentation vary by jurisdiction and institution. Some countries and banks are more experienced with crypto wealth verification than others.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.success
      },
      {
        id: 'financial-3',
        title: "Are there crypto-friendly payment cards available internationally?",
        content: (
          <div>
            <p>
              Yes, several providers offer crypto-linked payment cards that work internationally. These cards allow you to spend cryptocurrency while merchants receive fiat currency, providing a convenient bridge between crypto assets and everyday expenses.
            </p>
            <p><strong>Major crypto card providers:</strong></p>
            <ul>
              <li><strong>Binance Visa Card</strong>: Available in many European countries and UK</li>
              <li><strong>Crypto.com Visa</strong>: Available in 30+ countries across Europe, US, UK, and Asia</li>
              <li><strong>Coinbase Card</strong>: Available in US and many European countries</li>
              <li><strong>Wirex Visa</strong>: Available in Europe, Asia, and UK</li>
              <li><strong>BlockCard</strong>: Available in US</li>
            </ul>
            <p><strong>Key features to compare:</strong></p>
            <ul>
              <li>Available cryptocurrencies (Bitcoin, Ethereum, stablecoins, etc.)</li>
              <li>Conversion fees when spending</li>
              <li>Monthly/annual card fees</li>
              <li>ATM withdrawal limits and fees</li>
              <li>Cashback rewards (often paid in the provider's token)</li>
            </ul>
            <p>These cards are particularly valuable for crypto investors living internationally, as they reduce the need for frequent exchange-to-bank transfers and provide spending flexibility across borders.</p>
          </div>
        ),
        icon: CryptoIcon,
        color: Colors.warning
      },
      {
        id: 'financial-4',
        title: "What are the money laundering risks when relocating with crypto assets?",
        content: (
          <div>
            <p>
              When relocating with crypto assets, you need to navigate anti-money laundering (AML) regulations carefully to avoid legal complications, account freezes, or even criminal investigations.
            </p>
            <p><strong>Common AML risk factors with crypto relocation:</strong></p>
            <ul>
              <li><strong>Large transfers</strong>: Moving substantial crypto assets at once can trigger automated monitoring systems</li>
              <li><strong>Cross-border movements</strong>: Transferring crypto to exchanges in new jurisdictions</li>
              <li><strong>Incomplete documentation</strong>: Inability to prove the source of funds</li>
              <li><strong>Using unregulated or high-risk exchanges</strong>: Some platforms have weaker compliance standards</li>
              <li><strong>Privacy coins</strong>: Using Monero, Zcash, or similar currencies with enhanced privacy features</li>
            </ul>
            <p><strong>Mitigation strategies:</strong></p>
            <ul>
              <li>Maintain comprehensive records of how you acquired your crypto assets</li>
              <li>Use regulated exchanges with strong compliance departments</li>
              <li>Consider blockchain analytics reports to prove fund legitimacy</li>
              <li>Disclose crypto holdings when required by immigration or financial authorities</li>
              <li>Consult with compliance professionals in your destination country</li>
            </ul>
            <p>Remember that AML regulations continue to evolve globally, with increased coordination between countries to monitor suspicious crypto transactions.</p>
          </div>
        ),
        icon: RiskIcon,
        color: Colors.danger
      },
// Continuing the FAQ items from previous artifact

// Completing the financial-5 item that was cut off
      {
        id: 'financial-5',
        title: "Can I use crypto for real estate purchases internationally?",
        content: (
          <div>
            <p>
              Yes, purchasing real estate with cryptocurrency is becoming increasingly possible internationally, though the process and acceptance vary significantly by country:
            </p>
            <p><strong>Countries where crypto real estate transactions are more established:</strong></p>
            <ul>
              <li><strong>Dubai (UAE)</strong>: Several major developers accept Bitcoin and other cryptocurrencies</li>
              <li><strong>Portugal</strong>: Property purchases with crypto are legally recognized</li>
              <li><strong>Switzerland</strong>: Some properties explicitly marketed for crypto buyers</li>
              <li><strong>Malta</strong>: Legal framework supports tokenized real estate transactions</li>
              <li><strong>Thailand</strong>: Growing acceptance among developers in tourist areas</li>
            </ul>
            <p><strong>Transaction methods:</strong></p>
            <ul>
              <li><strong>Direct transfer</strong>: Seller accepts crypto directly to their wallet</li>
              <li><strong>Conversion at closing</strong>: Crypto converted to fiat at the time of sale</li>
              <li><strong>Escrow services</strong>: Specialized crypto escrow services hold funds</li>
              <li><strong>Real estate tokenization</strong>: Property ownership represented by blockchain tokens</li>
              <li><strong>Hybrid approaches</strong>: Combination of fiat and crypto payments</li>
            </ul>
            <p>As blockchain adoption increases in the real estate sector, more streamlined processes for crypto property purchases are emerging globally.</p>
          </div>
        ),
        icon: ResidencyIcon,
        color: Colors.countryFavorable
      }
    ],
    using: [
      {
        id: 'using-1',
        title: "How do I find the best country for my specific crypto situation?",
        content: (
          <div>
            <p>
              Finding the ideal country for your crypto situation requires matching your specific needs with the features of each jurisdiction. Here's a systematic approach:
            </p>
            <p><strong>1. Define your priorities:</strong></p>
            <ul>
              <li><strong>Tax Optimization</strong>: Is minimizing crypto taxation your primary goal?</li>
              <li><strong>Lifestyle</strong>: What type of living environment do you prefer?</li>
              <li><strong>Investment Threshold</strong>: What's your budget for residency/citizenship programs?</li>
              <li><strong>Banking Requirements</strong>: Do you need sophisticated financial services?</li>
              <li><strong>Physical Presence</strong>: How much time are you willing to spend in the country?</li>
            </ul>
            
            <p><strong>2. Use CryptoRelocate's filtering tools:</strong></p>
            <ul>
              <li>Filter countries by capital gains tax rate</li>
              <li>Set maximum investment requirements for residency</li>
              <li>Filter by financial services quality level</li>
              <li>Use the category filters (Excellent, Favorable, etc.)</li>
              <li>Compare up to 3 countries side-by-side</li>
            </ul>
            
            <p><strong>3. Consider your crypto activity type:</strong></p>
            <ul>
              <li><strong>Hodlers</strong>: Countries with 0% capital gains and no wealth tax</li>
              <li><strong>Active Traders</strong>: Jurisdictions with favorable treatment of frequent transactions</li>
              <li><strong>DeFi Users</strong>: Countries with clarity on staking, lending, and LP taxation</li>
              <li><strong>Crypto Entrepreneurs</strong>: Places with supportive regulatory frameworks</li>
              <li><strong>Mining Operations</strong>: Locations with low energy costs and favorable mining policies</li>
            </ul>
            
            <p>Remember that the "best" country varies greatly based on individual circumstances, risk tolerance, and personal preferences. No single jurisdiction is optimal for everyone.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.accent
      },
      {
        id: 'using-2',
        title: "How accurate is the data on CryptoRelocate?",
        content: (
          <div>
            <p>
              We strive for the highest level of accuracy in our data, but it's important to understand our research methodology and limitations:
            </p>
            <p><strong>Our research process:</strong></p>
            <ul>
              <li>Primary source analysis of government legislation and tax codes</li>
              <li>Consultation with tax professionals in each jurisdiction</li>
              <li>Verification through multiple reputable secondary sources</li>
              <li>Regular updates to reflect regulatory changes</li>
              <li>Community feedback and corrections system</li>
            </ul>
            
            <p><strong>Accuracy considerations:</strong></p>
            <ul>
              <li>Cryptocurrency regulations are rapidly evolving globally</li>
              <li>Tax interpretations can vary among professionals within the same country</li>
              <li>Some jurisdictions have ambiguous treatment of certain crypto activities</li>
              <li>Translation nuances can affect interpretation of foreign regulations</li>
              <li>Local implementation may differ from official policy</li>
            </ul>
            
            <p>We welcome corrections and updates from our community. If you have more current or accurate information, please contact us through the feedback form on our website.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.success
      },
      {
        id: 'using-3',
        title: "Is CryptoRelocate affiliated with any government or relocation services?",
        content: (
          <div>
            <p>
              No, CryptoRelocate is an independent research platform with no governmental affiliations or formal partnerships with relocation services. Our position in the ecosystem is as follows:
            </p>
            <p><strong>Our independence:</strong></p>
            <ul>
              <li>We do not represent any government or official immigration program</li>
              <li>We are not a law firm, tax advisory service, or financial advisor</li>
              <li>We do not receive compensation from countries to improve their rankings</li>
              <li>Our research methodology is transparent and consistent across all jurisdictions</li>
              <li>We maintain editorial independence in all our content</li>
            </ul>
            
            <p><strong>Business model:</strong></p>
            <ul>
              <li>Free access to basic country information and rankings</li>
              <li>Premium features available through subscription</li>
              <li>Clearly labeled sponsored content (when applicable)</li>
              <li>Optional connections to vetted service providers through our professional directory</li>
              <li>Educational resources and community features</li>
            </ul>
            
            <p>Our mission is to provide objective, data-driven information to help cryptocurrency investors make informed decisions about international relocation for regulatory and tax optimization purposes.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.countryFavorable
      },
      {
        id: 'using-4',
        title: "How do I interpret the country rankings and categories?",
        content: (
          <div>
            <p>
              Our country rankings and category system is designed to provide a quick assessment of each jurisdiction's overall crypto-friendliness. Here's how to interpret them effectively:
            </p>
            <p><strong>Ranking System (#1-89):</strong></p>
            <ul>
              <li>Countries are ranked from #1 (most favorable) to #89 (least favorable)</li>
              <li>Rankings are comprehensive but necessarily simplify complex factors</li>
              <li>Adjacent rankings (e.g., #8 vs. #9) indicate minimal differences</li>
              <li>Larger gaps in rankings reflect more substantial differences in crypto-friendliness</li>
              <li>Rankings are updated quarterly or when significant regulatory changes occur</li>
            </ul>
            
            <p><strong>Category Classifications:</strong></p>
            <ul>
              <li><strong>Excellent (Green)</strong>: Jurisdictions with minimal or zero taxation on crypto, strong legal frameworks, and favorable residency options</li>
              <li><strong>Favorable (Light Green)</strong>: Countries with generally positive conditions but some limitations</li>
              <li><strong>Moderate (Yellow)</strong>: Places with average taxation and regulatory environments</li>
              <li><strong>Restrictive (Orange)</strong>: Jurisdictions with high taxation or significant regulatory hurdles</li>
              <li><strong>Not Favorable (Red)</strong>: Countries with prohibitive regulations, bans, or extreme legal uncertainty</li>
            </ul>
            
            <p>The optimal jurisdiction for you may not necessarily be the highest-ranked country overall, but rather the one that best addresses your specific priorities and constraints.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.warning
      },
      {
        id: 'using-5',
        title: "Where can I get professional advice for my crypto relocation?",
        content: (
          <div>
            <p>
              While CryptoRelocate provides extensive research, professional guidance is essential for executing a successful relocation strategy. Here's where to find qualified assistance:
            </p>
            <p><strong>Types of professionals to consult:</strong></p>
            <ul>
              <li><strong>Crypto Tax Specialists</strong>: Accountants with specific cryptocurrency expertise</li>
              <li><strong>Immigration Attorneys</strong>: Lawyers specializing in residency and citizenship programs</li>
              <li><strong>International Tax Planners</strong>: Advisors familiar with multiple tax jurisdictions</li>
              <li><strong>Wealth Managers</strong>: Financial professionals experienced with high-net-worth crypto investors</li>
              <li><strong>Compliance Consultants</strong>: Experts in AML/KYC requirements for crypto assets</li>
            </ul>
            
            <p><strong>Finding qualified professionals:</strong></p>
            <ul>
              <li><strong>Professional Directories</strong>: Organizations like the CPA Crypto Tax Alliance or Global Immigration Advisors</li>
              <li><strong>Crypto Conferences</strong>: Events often feature service providers specialized in relocation</li>
              <li><strong>Online Communities</strong>: Forums like BitcoinTalk or Reddit have threads on relocation services</li>
              <li><strong>Local Crypto Meetups</strong>: In your target country to connect with local experts</li>
              <li><strong>Referrals</strong>: Personal recommendations from others who have successfully relocated</li>
            </ul>
            
            <p>Remember that proper planning typically involves a team of professionals working together to ensure all aspects of your relocation are handled appropriately.</p>
          </div>
        ),
        icon: InfoIcon,
        color: Colors.danger
      }
    ],
  };
  
  // Render the FAQ page
  return (
    <FAQContainer>
      <ScrollReveal>
        <FAQHeader>
          <Title>Frequently Asked Questions</Title>
          <Subtitle>
            Find answers to common questions about cryptocurrency relocation, 
            taxation, residency options, and using CryptoRelocate.
          </Subtitle>
        </FAQHeader>
      </ScrollReveal>
      
      <FAQContent>
        <CategoriesNav>
          {categories.map(category => (
            <CategoryButton 
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              color={category.color}
            >
              <IconWrapper>
                <category.icon size="18px" />
              </IconWrapper>
              <span>{category.label}</span>
            </CategoryButton>
          ))}
        </CategoriesNav>
        
        <FAQSection>
          {faqItems[activeCategory]?.map((item, index) => (
            <ScrollReveal key={`${activeCategory}-${index}`}>
              <FAQItem>
                <FAQQuestion 
                  onClick={() => toggleQuestion(item.id)}
                  isExpanded={expandedQuestions[item.id]}
                  color={item.color}
                >
                  <QuestionContent>
                    <IconWrapper bgColor={item.color}>
                      <item.icon size="16px" />
                    </IconWrapper>
                    <span>{item.title}</span>
                  </QuestionContent>
                  <ExpandIcon isExpanded={expandedQuestions[item.id]}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </ExpandIcon>
                </FAQQuestion>
                
                <FAQAnswer isExpanded={expandedQuestions[item.id]}>
                  {item.content}
                </FAQAnswer>
              </FAQItem>
            </ScrollReveal>
          ))}
        </FAQSection>
      </FAQContent>
      
      <ScrollReveal>
        <ContactSection>
          <ContactTitle>Still have questions?</ContactTitle>
          <ContactText>
            If you couldn't find the answer to your question, feel free to reach out to us directly.
          </ContactText>
          <ContactButton>Contact Us</ContactButton>
        </ContactSection>
      </ScrollReveal>
    </FAQContainer>
  );
};

// Styled Components
const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  ${fadeInAnimation}
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const FAQContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CategoriesNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  position: sticky;
  top: 100px;
  height: fit-content;
  
  @media (max-width: 968px) {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor ? `${bgColor}22` : 'transparent'};
  color: ${({ bgColor }) => bgColor || 'inherit'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 24px;
    height: 24px;
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ active, theme, color }) => 
    active ? (color || theme.colors.accent) : theme.colors.secondaryBackground};
  color: ${({ active }) => active ? 'white' : 'inherit'};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background-color: ${({ active, theme, color }) => 
      active ? (color ? `${color}DD` : theme.colors.accentHover) : `${theme.colors.secondaryBackground}AA`};
  }
  
  @media (max-width: 968px) {
    flex: 1;
    min-width: 150px;
    justify-content: center;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
    min-width: 120px;
    font-size: 0.9rem;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const FAQSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FAQItem = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  transition: box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;

const QuestionContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FAQQuestion = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: background-color 0.2s ease;
  background-color: ${({ isExpanded, theme, color }) => 
    isExpanded ? `${color}11` : 'transparent'};
  
  &:hover {
    background-color: ${({ color }) => `${color}11`};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ExpandIcon = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ isExpanded }) => isExpanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

const FAQAnswer = styled.div`
  color: ${({ theme }) => theme.colors.secondaryText};
  line-height: 1.6;
  padding: ${({ isExpanded, theme }) => 
    isExpanded ? `0 ${theme.spacing.lg} ${theme.spacing.lg}` : '0 1.5rem'};
  max-height: ${({ isExpanded }) => isExpanded ? '3000px' : '0'};
  opacity: ${({ isExpanded }) => isExpanded ? 1 : 0};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  
  p {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
  }
  
  ul {
    padding-left: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-left: ${({ theme }) => theme.spacing.md};
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  strong {
    color: ${({ theme }) => theme.colors.text};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    padding: ${({ isExpanded, theme }) => 
      isExpanded ? `0 ${theme.spacing.md} ${theme.spacing.md}` : '0 1rem'};
  }
`;

const ContactSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

const ContactTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const ContactText = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

export default FAQPage;