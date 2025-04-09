// frontend/src/pages/EnhancedCountryPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { getCategoryColor } from '../components/styles/Colors';

// Import components
import { CountryDetailSkeleton } from '../components/Skeletons';
import { ScrollReveal, SlideUp, SlideIn, fadeInAnimation, hoverElevate } from '../components/animations';
import { TaxIcon, WealthIcon, ResidencyIcon, BankIcon, RiskIcon, InfoIcon, PassportIcon } from '../components/illustrations/Icons';
import { ReadMore, TabbedPanel } from '../components/disclosure';
import { HorizontalBarChart } from '../components/charts/ComparisonChart';
import LiquidSphere from '../components/visualizations/LiquidSphere';
import HorizontalTaxScale from '../components/visualizations/HorizontalTaxScale';

const EnhancedCountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarCountries, setSimilarCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Using the id parameter directly - this will be the country code
        const { data } = await axios.get(`http://localhost:5000/api/countries/${id}`);
        setCountry(data);
        
        // Now try to fetch detailed country data from the new API endpoint
        try {
          const detailsResponse = await axios.get(`http://localhost:5000/api/countries/details/${data.code.toLowerCase()}`);
          if (detailsResponse.data) {
            setCountryDetails(detailsResponse.data);
          }
        } catch (detailsError) {
          console.log('Detailed country data not available, using basic data instead');
          // This is not a critical error, we can still show the basic country data
        }
        
        // Fetch similar countries
        fetchSimilarCountries(data);
        
      } catch (error) {
        console.error('Error fetching country data:', error);
        
        if (error.response && error.response.status === 404) {
          setError('Country not found. Please check the code and try again.');
        } else {
          setError('Error fetching country data. Please try again later.');
        }
      } finally {
        // Delay to show skeleton
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchCountry();
  }, [id]);
  
  const fetchSimilarCountries = async (currentCountry) => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/countries');
      
      // Find countries with similar characteristics
      const filtered = data
        .filter(c => c.code !== currentCountry.code)
        .sort((a, b) => {
          // Simple similarity score based on rank difference
          const aRankDiff = Math.abs(a.rank - currentCountry.rank);
          const bRankDiff = Math.abs(b.rank - currentCountry.rank);
          return aRankDiff - bRankDiff;
        })
        .slice(0, 3); // Get top 3 similar countries
      
      setSimilarCountries(filtered);
    } catch (error) {
      console.error('Error fetching similar countries:', error);
    }
  };
  
  // Calculate liquid sphere values
  const calculateSphereFill = (value, type) => {
    if (type === 'capitalGainsTax') {
      // For capital gains tax - 0% is best (95% fill max to keep animation visible)
      // Higher percentage means worse (lower fill)
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) return 30; // Default for non-numeric
      return Math.max(5, Math.min(95, 95 - (numericValue * 2.4))); // 0% = 95%, 40% = 0%
    }
    
    if (type === 'wealthTax') {
      // For wealth tax - 0% is best (95% fill max)
      if (value === '0%') return 95;
      return 20; // If any wealth tax, it's low fill
    }
    
    if (type === 'financialServices') {
      // For financial services rating (capped at 95% for best)
      switch (value) {
        case 'World-class': return 95;
        case 'Advanced': return 80;
        case 'Strong': return 65;
        case 'Moderate': return 50;
        case 'Developing': return 30;
        case 'Limited': return 15;
        case 'Minimal': return 5;
        default: return 10;
      }
    }
    
    return 50; // Default value
  };
  
  // Get color for liquid sphere
  const getSphereColor = (value, type) => {
    if (type === 'capitalGainsTax') {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) return '#9E9E9E';
      if (numericValue === 0) return '#4CAF50';
      if (numericValue < 15) return '#8BC34A';
      if (numericValue < 25) return '#CDDC39';
      if (numericValue < 35) return '#FFC107';
      return '#FF9800';
    }
    
    if (type === 'wealthTax') {
      return value === '0%' ? '#4CAF50' : '#FFA000';
    }
    
    if (type === 'financialServices') {
      switch (value) {
        case 'World-class': return '#4CAF50';
        case 'Advanced': return '#8BC34A';
        case 'Strong': return '#CDDC39';
        case 'Moderate': return '#FFC107';
        case 'Developing': return '#FF9800';
        case 'Limited': return '#FF7043';
        case 'Minimal': return '#F44336';
        default: return '#9E9E9E';
      }
    }
    
    return '#F7931A'; // Default color (Bitcoin gold)
  };
  
  // Get additional info for display
  const getSphereAdditionalInfo = (value, type) => {
    if (type === 'capitalGainsTax') {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) return 'Special conditions apply';
      if (numericValue === 0) return 'No tax on crypto gains';
      if (numericValue < 15) return 'Very low tax rate';
      if (numericValue < 25) return 'Moderate tax rate';
      if (numericValue < 35) return 'High tax rate';
      return 'Very high tax rate';
    }
    
    if (type === 'wealthTax') {
      return value === '0%' ? 'No annual wealth tax' : 'Annual wealth tax applies';
    }
    
    if (type === 'financialServices') {
      switch (value) {
        case 'World-class': return 'Best-in-class crypto infrastructure';
        case 'Advanced': return 'Excellent banking support for crypto';
        case 'Strong': return 'Good banking options available';
        case 'Moderate': return 'Basic crypto banking available';
        case 'Developing': return 'Limited but growing support';
        case 'Limited': return 'Few options for crypto users';
        case 'Minimal': return 'Very difficult crypto banking';
        default: return '';
      }
    }
    
    return '';
  };

  if (loading) return (
    <CountryPageContainer>
      <BackLink to="/">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Rankings
      </BackLink>
      <CountryDetailSkeleton />
    </CountryPageContainer>
  );
  
  if (error) return (
    <CountryPageContainer>
      <ErrorContainer>
        <BackLink to="/">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Rankings
        </BackLink>
        <ErrorIcon>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </ErrorIcon>
        <ErrorTitle>Error</ErrorTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </ErrorContainer>
    </CountryPageContainer>
  );
  
  if (!country) return (
    <CountryPageContainer>
      <ErrorContainer>
        <BackLink to="/">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Rankings
        </BackLink>
        <ErrorIcon>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </ErrorIcon>
        <ErrorTitle>Country not found</ErrorTitle>
      </ErrorContainer>
    </CountryPageContainer>
  );
  
  // Use countryDetails if available, otherwise fall back to basic country data
  const displayData = countryDetails || country;

  return (
    <CountryPageContainer>
      <SlideIn>
        <BackLink to="/">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Rankings
        </BackLink>
      </SlideIn>
      
      <ScrollReveal>
        <CountryHeader>
          <CountryName>
            {displayData.name}
            <BadgesContainer>
              <RankBadge color={getCategoryColor(displayData.category)}>
                Rank #{displayData.rank}
              </RankBadge>
              {displayData.category && 
                <CategoryBadge color={getCategoryColor(displayData.category)}>
                  {displayData.category}
                </CategoryBadge>
              }
            </BadgesContainer>
          </CountryName>
        </CountryHeader>
      </ScrollReveal>
      
      <TwoColumnLayout>
        <MainContent>
          <SlideUp>
            <CountryDescription>
              <ReadMore text={displayData.description} maxChars={300} />
            </CountryDescription>
          </SlideUp>
          
          <StatsGrid>
            <LiquidSphereCard>
              <LiquidSphere 
                label="Capital Gains Tax"
                value={displayData.capitalGainsTax}
                fillPercentage={calculateSphereFill(displayData.capitalGainsTax, 'capitalGainsTax')}
                color={getSphereColor(displayData.capitalGainsTax, 'capitalGainsTax')}
                additionalInfo={getSphereAdditionalInfo(displayData.capitalGainsTax, 'capitalGainsTax')}
                size={window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 90 : 110}
              />
            </LiquidSphereCard>
            
            <LiquidSphereCard>
              <LiquidSphere 
                label="Wealth Tax"
                value={displayData.wealthTax}
                fillPercentage={calculateSphereFill(displayData.wealthTax, 'wealthTax')}
                color={getSphereColor(displayData.wealthTax, 'wealthTax')}
                additionalInfo={getSphereAdditionalInfo(displayData.wealthTax, 'wealthTax')}
                size={window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 90 : 110}
              />
            </LiquidSphereCard>
            
            <ResidencyCard>
              <ResidencyIcon size={window.innerWidth <= 480 ? "22px" : "28px"} />
              <ResidencyLabel>Residency Investment</ResidencyLabel>
              <ResidencyValue>{displayData.residencyInvestment}</ResidencyValue>
              <ResidencyInfo>Investment required for residency/visa</ResidencyInfo>
            </ResidencyCard>
            
            <LiquidSphereCard>
              <LiquidSphere 
                label="Financial Services"
                value={displayData.financialServices}
                fillPercentage={calculateSphereFill(displayData.financialServices, 'financialServices')}
                color={getSphereColor(displayData.financialServices, 'financialServices')}
                additionalInfo={getSphereAdditionalInfo(displayData.financialServices, 'financialServices')}
                size={window.innerWidth <= 480 ? 80 : window.innerWidth <= 768 ? 90 : 110}
              />
            </LiquidSphereCard>
          </StatsGrid>
          
          <ScrollReveal>
            <InfoCard>
              <CardTitle>
                <TaxIcon size="24px" />
                Tax Analysis
              </CardTitle>
              
              <CardContent>
                <TaxScaleContainer>
                  <HorizontalTaxScale 
                    countryName={displayData.name}
                    taxValue={displayData.capitalGainsTax}
                    maxTaxRate={50}
                    infoText={
                      displayData.capitalGainsTax === "0%" ? 
                        "No capital gains tax is applied to cryptocurrency profits, making this an excellent jurisdiction for crypto investors." : 
                        `A capital gains tax rate of ${displayData.capitalGainsTax} is applied to cryptocurrency profits. ${
                          parseFloat(displayData.capitalGainsTax) < 15 ? "This is considered favorable compared to global standards." :
                          parseFloat(displayData.capitalGainsTax) < 25 ? "This is around the global average for crypto taxation." :
                          "This is higher than the global average for crypto taxation."
                        }`
                    }
                  />
                </TaxScaleContainer>
                
                <TabbedPanel tabs={[
                  {
                    label: "Capital Gains",
                    icon: TaxIcon,
                    content: (
                      <div>
                        <TaxDetail>
                          <TaxDetailLabel>Long-term Rate:</TaxDetailLabel>
                          <TaxDetailValue highlight={displayData.capitalGainsTax === "0%"}>
                            {displayData.capitalGainsTax}
                          </TaxDetailValue>
                        </TaxDetail>
                        
                        <TaxDetail>
                          <TaxDetailLabel>Short-term Rate:</TaxDetailLabel>
                          <TaxDetailValue highlight={displayData.capitalGainsTaxShort === "0%"}>
                            {displayData.capitalGainsTaxShort || displayData.capitalGainsTax}
                          </TaxDetailValue>
                        </TaxDetail>
                        
                        {countryDetails && countryDetails.incomeTax && (
                          <TaxDetail>
                            <TaxDetailLabel>Income Tax:</TaxDetailLabel>
                            <TaxDetailValue>
                              {countryDetails.incomeTax}
                            </TaxDetailValue>
                          </TaxDetail>
                        )}
                        
                        {countryDetails && countryDetails.corporateTax && (
                          <TaxDetail>
                            <TaxDetailLabel>Corporate Tax:</TaxDetailLabel>
                            <TaxDetailValue>
                              {countryDetails.corporateTax}
                            </TaxDetailValue>
                          </TaxDetail>
                        )}
                        
                        <TaxExplanation>
                          {displayData.capitalGainsTax === "0%" ? (
                            <p>This jurisdiction does not tax capital gains on cryptocurrency, providing an optimal environment for crypto investors.</p>
                          ) : (
                            <p>Cryptocurrency gains are typically classified as capital gains and are taxed according to the rates shown above. Be sure to check specific requirements for tax reporting in this jurisdiction.</p>
                          )}
                        </TaxExplanation>
                      </div>
                    )
                  },
                  {
                    label: "Wealth Tax",
                    icon: WealthIcon,
                    content: (
                      <div>
                        <TaxDetail>
                          <TaxDetailLabel>Wealth Tax Rate:</TaxDetailLabel>
                          <TaxDetailValue highlight={displayData.wealthTax === "0%"}>
                            {displayData.wealthTax}
                          </TaxDetailValue>
                        </TaxDetail>
                        
                        <TaxExplanation>
                          {displayData.wealthTax === "0%" ? (
                            <p>This jurisdiction does not impose a wealth tax on cryptocurrency or other assets, meaning your crypto holdings are not subject to annual taxation based on their value.</p>
                          ) : (
                            <p>This jurisdiction applies a wealth tax on assets including cryptocurrency. This means you may be required to pay an annual tax on the value of your holdings, regardless of whether you sell them or realize any gains.</p>
                          )}
                        </TaxExplanation>
                      </div>
                    )
                  },
                  {
                    label: "Tax Reporting",
                    icon: InfoIcon,
                    content: (
                      <div>
                        <TaxExplanation>
                          <p><strong>Reporting Requirements:</strong></p>
                          <ul>
                            <li>Annual tax declaration may be required</li>
                            <li>Transactions above certain thresholds may need to be reported</li>
                            <li>Some jurisdictions require reporting of all crypto transactions</li>
                          </ul>
                          <p><strong>Tax Authority:</strong> The local tax authority oversees compliance with tax regulations, including those related to cryptocurrency.</p>
                          {countryDetails && countryDetails.taxAuthorityWebsite && (
                            <p><a href={countryDetails.taxAuthorityWebsite} target="_blank" rel="noopener noreferrer">Visit the official tax authority website</a> for detailed information.</p>
                          )}
                        </TaxExplanation>
                      </div>
                    )
                  }
                ]} />
              </CardContent>
            </InfoCard>
          </ScrollReveal>
          
          <ScrollReveal>
            <InfoCard>
              <CardTitle>
                <ResidencyIcon size="24px" />
                Residency Options
              </CardTitle>
              
              <CardContent>
                <ResidencySummary>
                  <ResidencyDetailItem>
                    <ResidencyDetailLabel>Investment Requirement:</ResidencyDetailLabel>
                    <ResidencyDetailValue>{displayData.residencyInvestment}</ResidencyDetailValue>
                  </ResidencyDetailItem>
                  
                  {countryDetails && countryDetails.residencyPhysicalPresence && (
                    <ResidencyDetailItem>
                      <ResidencyDetailLabel>Physical Presence:</ResidencyDetailLabel>
                      <ResidencyDetailValue>{countryDetails.residencyPhysicalPresence}</ResidencyDetailValue>
                    </ResidencyDetailItem>
                  )}
                  
                  {countryDetails && countryDetails.residencyProcessingTime && (
                    <ResidencyDetailItem>
                      <ResidencyDetailLabel>Processing Time:</ResidencyDetailLabel>
                      <ResidencyDetailValue>{countryDetails.residencyProcessingTime}</ResidencyDetailValue>
                    </ResidencyDetailItem>
                  )}
                </ResidencySummary>
                
                <TabbedPanel tabs={[
                  {
                    label: "Residency",
                    icon: ResidencyIcon,
                    content: (
                      <div>
                        <p>The {displayData.name} residency program requires:</p>
                        <ResidencyRequirements>
                          <li><strong>Investment:</strong> {displayData.residencyInvestment}</li>
                          
                          {countryDetails && countryDetails.residencyPhysicalPresence && (
                            <li><strong>Physical Presence:</strong> {countryDetails.residencyPhysicalPresence}</li>
                          )}
                          
                          {countryDetails && countryDetails.residencyDocumentation && (
                            <li><strong>Documentation:</strong> {countryDetails.residencyDocumentation}</li>
                          )}
                          
                          {countryDetails && countryDetails.residencyProcessingTime && (
                            <li><strong>Processing Time:</strong> {countryDetails.residencyProcessingTime}</li>
                          )}
                        </ResidencyRequirements>
                        
                        {countryDetails && countryDetails.residencyWebsite && (
                          <p><a href={countryDetails.residencyWebsite} target="_blank" rel="noopener noreferrer">Visit the official residency program website</a> for detailed information.</p>
                        )}
                      </div>
                    )
                  },
                  {
                    label: "Citizenship",
                    icon: PassportIcon,
                    content: (
                      <div>
                        {countryDetails && countryDetails.citizenshipYears ? (
                          <>
                            <p>Path to citizenship in {displayData.name}:</p>
                            <ResidencyRequirements>
                              <li><strong>Residency Requirement:</strong> {countryDetails.citizenshipYears}</li>
                              
                              {countryDetails.citizenshipExceptions && (
                                <li><strong>Exceptions:</strong> {countryDetails.citizenshipExceptions}</li>
                              )}
                              
                              {countryDetails.citizenshipLanguage && (
                                <li><strong>Language Requirement:</strong> {countryDetails.citizenshipLanguage}</li>
                              )}
                              
                              {countryDetails.citizenshipProcessing && (
                                <li><strong>Processing Time:</strong> {countryDetails.citizenshipProcessing}</li>
                              )}
                            </ResidencyRequirements>
                          </>
                        ) : (
                          <p>Most residency programs can lead to citizenship after a qualifying period, typically 5-10 years. Requirements often include:</p>
                        )}
                        
                        {!countryDetails && (
                          <ResidencyRequirements>
                            <li>Continuous residency</li>
                            <li>Language proficiency</li>
                            <li>Integration into society</li>
                            <li>Clean criminal record</li>
                          </ResidencyRequirements>
                        )}
                      </div>
                    )
                  }
                ]} />
              </CardContent>
            </InfoCard>
          </ScrollReveal>
          
          <ScrollReveal>
            <InfoCard>
              <CardTitle>
                <BankIcon size="24px" />
                Financial & Banking
              </CardTitle>
              
              <CardContent>
                <FinancialServicesSummary>
                  <FinancialServicesBadge service={displayData.financialServices}>
                    {displayData.financialServices}
                  </FinancialServicesBadge>
                  
                  <FinancialServicesList>
                    <FinancialServicesItem available={displayData.financialServices !== 'Minimal'}>
                      <CheckIcon available={displayData.financialServices !== 'Minimal'} />
                      Banking Services for Crypto
                    </FinancialServicesItem>
                    
                    <FinancialServicesItem available={['World-class', 'Advanced', 'Strong'].includes(displayData.financialServices)}>
                      <CheckIcon available={['World-class', 'Advanced', 'Strong'].includes(displayData.financialServices)} />
                      Crypto-Friendly Banks
                    </FinancialServicesItem>
                    
                    <FinancialServicesItem available={['World-class', 'Advanced'].includes(displayData.financialServices)}>
                      <CheckIcon available={['World-class', 'Advanced'].includes(displayData.financialServices)} />
                      Institutional Custody Solutions
                    </FinancialServicesItem>
                    
                    <FinancialServicesItem available={displayData.financialServices === 'World-class'}>
                      <CheckIcon available={displayData.financialServices === 'World-class'} />
                      Advanced DeFi Integration
                    </FinancialServicesItem>
                  </FinancialServicesList>
                </FinancialServicesSummary>
                
                {countryDetails && countryDetails.cryptoFriendlyBanks && (
                  <FinancialSection>
                    <SectionLabel>Crypto-Friendly Banks</SectionLabel>
                    <SectionValue>{countryDetails.cryptoFriendlyBanks}</SectionValue>
                  </FinancialSection>
                )}
                
                {countryDetails && countryDetails.institutionalCustody && (
                  <FinancialSection>
                    <SectionLabel>Institutional Custody</SectionLabel>
                    <SectionValue>{countryDetails.institutionalCustody}</SectionValue>
                  </FinancialSection>
                )}
                
                {countryDetails && countryDetails.defiIntegration && (
                  <FinancialSection>
                    <SectionLabel>DeFi Integration</SectionLabel>
                    <SectionValue>{countryDetails.defiIntegration}</SectionValue>
                  </FinancialSection>
                )}
                
                {countryDetails && countryDetails.cryptoRegulatorWebsite && (
                  <ResourceLink href={countryDetails.cryptoRegulatorWebsite} target="_blank" rel="noopener noreferrer">
                    Visit Crypto Regulator Website
                  </ResourceLink>
                )}
              </CardContent>
            </InfoCard>
          </ScrollReveal>
          
          <ScrollReveal>
            <InfoCard>
              <CardTitle>
                <RiskIcon size="24px" />
                Future Risks & Considerations
              </CardTitle>
              
              <CardContent>
                <RiskBadge color={getCategoryColor(displayData.category)}>
                  {displayData.futureRisks}
                </RiskBadge>
                
                <TabbedPanel tabs={[
                  {
                    label: "Living Costs",
                    icon: InfoIcon,
                    content: (
                      <div>
                        <CostOfLivingSection>
                          <CostItem>
                            <CostLabel>Cost of Living Index:</CostLabel>
                            <CostValue>{displayData.costOfLivingIndex}</CostValue>
                          </CostItem>
                          
                          {countryDetails && countryDetails.costOfLivingVsUS && (
                            <CostItem>
                              <CostLabel>Compared to US:</CostLabel>
                              <CostValue>{countryDetails.costOfLivingVsUS}</CostValue>
                            </CostItem>
                          )}
                          
                          {countryDetails && countryDetails.housingCost && (
                            <CostItem>
                              <CostLabel>Housing (1BR Apartment):</CostLabel>
                              <CostValue>{countryDetails.housingCost}</CostValue>
                            </CostItem>
                          )}
                          
                          {countryDetails && countryDetails.mealCost && (
                            <CostItem>
                              <CostLabel>Average Meal Cost:</CostLabel>
                              <CostValue>{countryDetails.mealCost}</CostValue>
                            </CostItem>
                          )}
                        </CostOfLivingSection>
                      </div>
                    )
                  },
                  {
                    label: "Economic",
                    icon: BankIcon,
                    content: (
                      <div>
                        {countryDetails && (
                          <EconomicStabilitySection>
                            {countryDetails.economicStability && (
                              <EconomicItem>
                                <EconomicLabel>Economic Stability:</EconomicLabel>
                                <EconomicValue>{countryDetails.economicStability}</EconomicValue>
                              </EconomicItem>
                            )}
                            
                            {countryDetails.inflationRate && (
                              <EconomicItem>
                                <EconomicLabel>Inflation Rate:</EconomicLabel>
                                <EconomicValue>{countryDetails.inflationRate}</EconomicValue>
                              </EconomicItem>
                            )}
                            
                            {countryDetails.politicalEnvironment && (
                              <EconomicItem>
                                <EconomicLabel>Political Environment:</EconomicLabel>
                                <EconomicValue>{countryDetails.politicalEnvironment}</EconomicValue>
                              </EconomicItem>
                            )}
                            
                            {countryDetails.bankingReliability && (
                              <EconomicItem>
                                <EconomicLabel>Banking Reliability:</EconomicLabel>
                                <EconomicValue>{countryDetails.bankingReliability}</EconomicValue>
                              </EconomicItem>
                            )}
                          </EconomicStabilitySection>
                        )}
                        
                        {!countryDetails && (
                          <p>Economic stability affects long-term planning and investment security. Consider factors like currency stability, inflation rates, political environment, and banking system reliability when evaluating this jurisdiction.</p>
                        )}
                      </div>
                    )
                  },
                  {
                    label: "Regulatory",
                    icon: InfoIcon,
                    content: (
                      <div>
                        {countryDetails && (
                          <RegulatorySection>
                            {countryDetails.regulatoryClarity && (
                              <RegulatoryItem>
                                <RegulatoryLabel>Regulatory Clarity:</RegulatoryLabel>
                                <RegulatoryValue>{countryDetails.regulatoryClarity}</RegulatoryValue>
                              </RegulatoryItem>
                            )}
                            
                            {countryDetails.cryptoLegalStatus && (
                              <RegulatoryItem>
                                <RegulatoryLabel>Legal Status:</RegulatoryLabel>
                                <RegulatoryValue>{countryDetails.cryptoLegalStatus}</RegulatoryValue>
                              </RegulatoryItem>
                            )}
                            
                            {countryDetails.taxEnforcement && (
                              <RegulatoryItem>
                                <RegulatoryLabel>Tax Enforcement:</RegulatoryLabel>
                                <RegulatoryValue>{countryDetails.taxEnforcement}</RegulatoryValue>
                              </RegulatoryItem>
                            )}
                            
                            <RegulatoryItem>
                              <RegulatoryLabel>Future Risks:</RegulatoryLabel>
                              <RegulatoryValue>{displayData.futureRisks}</RegulatoryValue>
                            </RegulatoryItem>
                          </RegulatorySection>
                        )}
                        
                        {!countryDetails && (
                          <p>Regulatory considerations are crucial for long-term planning. Current identified risks include: {displayData.futureRisks}</p>
                        )}
                      </div>
                    )
                  }
                ]} />
              </CardContent>
            </InfoCard>
          </ScrollReveal>
        </MainContent>
        
        <Sidebar>
          <ScrollReveal>
            <SidebarCard>
              <SidebarCardTitle>Similar Countries</SidebarCardTitle>
              <SimilarCountriesList>
                {similarCountries.map((country) => (
                  <SimilarCountryItem key={country._id}>
                    <Link to={`/country/${country.code.toLowerCase()}`}>
                      <SimilarCountryRank color={getCategoryColor(country.category)}>
                        #{country.rank}
                      </SimilarCountryRank>
                      <div>
                        <SimilarCountryName>{country.name}</SimilarCountryName>
                        <SimilarCountryTax>Tax: {country.capitalGainsTax}</SimilarCountryTax>
                      </div>
                    </Link>
                  </SimilarCountryItem>
                ))}
              </SimilarCountriesList>
            </SidebarCard>
          </ScrollReveal>
          
          <ScrollReveal>
            <SidebarCard>
              <SidebarCardTitle>Tax Comparison</SidebarCardTitle>
              <SidebarCardContent>
                <HorizontalBarChart 
                  data={[
                    { label: displayData.name, value: parseFloat(displayData.capitalGainsTax) || 0, color: getCategoryColor(displayData.category) },
                    ...(similarCountries.slice(0, 2).map(country => ({
                      label: country.name,
                      value: parseFloat(country.capitalGainsTax) || 0,
                      color: getCategoryColor(country.category)
                    })))
                  ]}
                  title="Capital Gains Tax"
                  valueLabel="%"
                  maxValue={45}
                />
              </SidebarCardContent>
            </SidebarCard>
          </ScrollReveal>
          
          <ScrollReveal>
            <SidebarCard>
              <SidebarCardTitle>Resources</SidebarCardTitle>
              <ResourceList>
                {countryDetails && countryDetails.taxAuthorityWebsite && (
                  <ResourceItem>
                    <ResourceIcon>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ResourceIcon>
                    <ResourceLink href={countryDetails.taxAuthorityWebsite} target="_blank" rel="noopener noreferrer">
                      Tax Authority Website
                    </ResourceLink>
                  </ResourceItem>
                )}
                
                {countryDetails && countryDetails.residencyWebsite && (
                  <ResourceItem>
                    <ResourceIcon>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16.5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7.5V7.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ResourceIcon>
                    <ResourceLink href={countryDetails.residencyWebsite} target="_blank" rel="noopener noreferrer">
                      Residency Program Info
                    </ResourceLink>
                  </ResourceItem>
                )}
                
                {countryDetails && countryDetails.cryptoRegulatorWebsite && (
                  <ResourceItem>
                    <ResourceIcon>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 7L15 12L10 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ResourceIcon>
                    <ResourceLink href={countryDetails.cryptoRegulatorWebsite} target="_blank" rel="noopener noreferrer">
                      Crypto Regulator Website
                    </ResourceLink>
                  </ResourceItem>
                )}
                
                {(!countryDetails || (!countryDetails.taxAuthorityWebsite && !countryDetails.residencyWebsite && !countryDetails.cryptoRegulatorWebsite)) && (
                  <ResourceItem>
                    <ResourceIcon>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 7L15 12L10 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ResourceIcon>
                    <ResourceLink href="#" target="_blank" rel="noopener noreferrer">
                      Local Crypto Communities
                    </ResourceLink>
                  </ResourceItem>
                )}
              </ResourceList>
            </SidebarCard>
          </ScrollReveal>
        </Sidebar>
      </TwoColumnLayout>
    </CountryPageContainer>
  );
};

// Small Components
const CheckIcon = ({ available }) => (
  <CheckIconWrapper available={available}>
    {available ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </CheckIconWrapper>
);

// Styled Components
const CountryPageContainer = styled.div`
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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 500;
  transition: color 0.2s ease;
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const CountryHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const CountryName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.8rem;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

const RankBadge = styled.span`
  display: inline-block;
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
`;

const CountryDescription = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  p {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const LiquidSphereCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 230px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 200px;
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ResidencyCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 230px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 200px;
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: auto;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const ResidencyLabel = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }
`;

const ResidencyValue = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const ResidencyInfo = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  ${hoverElevate}
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    box-shadow: ${({ theme }) => theme.boxShadow.sm};
  }
`;

const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 1.5rem;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.3rem;
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.2rem;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  }
  
  svg {
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 20px;
      height: 20px;
    }
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  }
`;

const TaxScaleContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  
  /* Give enough vertical space for the marker and its bubble */
  min-height: 180px;
  text-align: justify;
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 170px;
  }
  
  @media (max-width: 480px) {
    min-height: 160px;
  }
`;

const TaxDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px dotted ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const TaxDetailLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondaryText};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 0.9rem;
  }
`;

const TaxDetailValue = styled.span`
  font-weight: 600;
  color: ${({ highlight, theme }) => highlight ? theme.colors.success : theme.colors.text};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const TaxExplanation = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 0.9rem;
  line-height: 1.6;
  
  p {
    margin-top: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  ul {
    padding-left: ${({ theme }) => theme.spacing.lg};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding-left: ${({ theme }) => theme.spacing.md};
    }
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ResidencySummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ResidencyDetailItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ResidencyDetailLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ResidencyDetailValue = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ResidencyRequirements = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const FinancialServicesSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FinancialSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const SectionLabel = styled.div`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const SectionValue = styled.div`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 0.9rem;
  line-height: 1.4;
`;

// Base grid section
const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

// Base grid item
const GridItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

// Base label
const ItemLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

// Base value
const ItemValue = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

// Cost of living section
const CostOfLivingSection = styled(GridSection)``;
const CostItem = styled(GridItem)``;
const CostLabel = styled(ItemLabel)``;
const CostValue = styled(ItemValue)``;

// Economic section
const EconomicStabilitySection = styled(GridSection)``;
const EconomicItem = styled(GridItem)``;
const EconomicLabel = styled(ItemLabel)``;
const EconomicValue = styled(ItemValue)``;

// Regulatory section
const RegulatorySection = styled(GridSection)``;
const RegulatoryItem = styled(GridItem)``;
const RegulatoryLabel = styled(ItemLabel)``;
const RegulatoryValue = styled(ItemValue)``;


const RiskBadge = styled.div`
  display: inline-block;
  background-color: ${({ theme, color }) => color ? `${color}33` : theme.colors.warning};
  color: ${({ theme, color }) => color || theme.colors.text};
  border: 1px solid ${({ color }) => color || 'currentColor'};
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.4;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
    font-size: 0.9rem;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;


const SidebarCardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
`;

const SidebarCardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const SimilarCountriesList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const SimilarCountryItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateX(5px);
  }
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: ${({ theme }) => theme.spacing.xs};
      background-color: ${({ theme }) => theme.colors.background}22;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.background}44;
      }
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 0;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const SimilarCountryRank = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
  font-weight: bold;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 30px;
    height: 30px;
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    font-size: 0.9rem;
  }
`;

const SimilarCountryName = styled.div`
  font-weight: bold;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
    margin-bottom: 2px;
  }
`;

const SimilarCountryTax = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8rem;
  }
`;

const FinancialServicesBadge = styled.div`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background-color: ${({ service }) => 
    service === 'World-class' ? '#4CAF50' :
    service === 'Advanced' ? '#8BC34A' :
    service === 'Strong' ? '#CDDC39' :
    service === 'Moderate' ? '#FFC107' :
    service === 'Developing' ? '#FF9800' : '#9E9E9E'};
  color: ${({ service }) => 
    ['World-class', 'Advanced', 'Strong'].includes(service) ? 'white' : 'black'};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FinancialServicesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FinancialServicesItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ available, theme }) => 
    available ? theme.colors.text : theme.colors.secondaryText};
`;

const CheckIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ available, theme }) => 
    available ? theme.colors.success : theme.colors.danger};
`;

const ResourceList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ResourceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 26px;
    height: 26px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const ResourceLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1.3;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
  ${fadeInAnimation}
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ErrorTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
  max-width: 500px;
`;

export default EnhancedCountryPage;;