// frontend/src/pages/EnhancedCountryPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { getCategoryColor, CategoryDefinitions } from '../components/styles/Colors';

// Import components
import { CountryDetailSkeleton } from '../components/Skeletons';
import { ScrollReveal, SlideUp, SlideIn, fadeInAnimation, hoverElevate, hoverScale } from '../components/animations';
import { TaxIcon, WealthIcon, ResidencyIcon, BankIcon, RiskIcon, InfoIcon } from '../components/illustrations/Icons';
import { Collapsible, ExpandableDetails, InfoTooltip, ReadMore } from '../components/disclosure';
import { MiniAreaChart } from '../components/charts/ComparisonChart';
import LiquidSphere from '../components/visualizations/LiquidSphere';
import HorizontalTaxScale from '../components/visualizations/HorizontalTaxScale';

const EnhancedCountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarCountries, setSimilarCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Using the id parameter directly - this will now be the country code
        const { data } = await axios.get(`http://localhost:5000/api/countries/${id}`);
        setCountry(data);
        
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
        .filter(c => c.code !== currentCountry.code) // Filter using code instead of _id
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
  
  // Parse the tax rate for potential use
  const parseTaxRate = () => {
    const taxRate = parseFloat(country.capitalGainsTax);
    return isNaN(taxRate) ? 0 : taxRate;
  };

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
            {country.name}
            <RankBadge color={getCategoryColor(country.category)}>
              Rank #{country.rank}
            </RankBadge>
            {country.category && 
              <CategoryBadge color={getCategoryColor(country.category)}>
                {country.category}
              </CategoryBadge>
            }
          </CountryName>
        </CountryHeader>
      </ScrollReveal>
      
      <TwoColumnLayout>
        <MainContent>
          <SlideUp>
            <CountryDescription>
              <ReadMore text={country.description} maxChars={300} />
            </CountryDescription>
          </SlideUp>
          
          <StatsGrid>
            <LiquidSphereCard>
              <LiquidSphere 
                label="Capital Gains Tax"
                value={country.capitalGainsTax}
                fillPercentage={calculateSphereFill(country.capitalGainsTax, 'capitalGainsTax')}
                color={getSphereColor(country.capitalGainsTax, 'capitalGainsTax')}
                additionalInfo={getSphereAdditionalInfo(country.capitalGainsTax, 'capitalGainsTax')}
                size={window.innerWidth <= 480 ? 70 : window.innerWidth <= 768 ? 85 : 100}
              />
            </LiquidSphereCard>
            
            <LiquidSphereCard>
              <LiquidSphere 
                label="Wealth Tax"
                value={country.wealthTax}
                fillPercentage={calculateSphereFill(country.wealthTax, 'wealthTax')}
                color={getSphereColor(country.wealthTax, 'wealthTax')}
                additionalInfo={getSphereAdditionalInfo(country.wealthTax, 'wealthTax')}
                size={window.innerWidth <= 480 ? 70 : window.innerWidth <= 768 ? 85 : 100}
              />
            </LiquidSphereCard>
            
            <ResidencyCard>
              <ResidencyIcon size={window.innerWidth <= 480 ? "22px" : "28px"} />
              <ResidencyLabel>Residency Investment</ResidencyLabel>
              <ResidencyValue>{country.residencyInvestment}</ResidencyValue>
              <ResidencyInfo>Investment required for residency/visa</ResidencyInfo>
            </ResidencyCard>
            
            <LiquidSphereCard>
              <LiquidSphere 
                label="Financial Services"
                value={country.financialServices}
                fillPercentage={calculateSphereFill(country.financialServices, 'financialServices')}
                color={getSphereColor(country.financialServices, 'financialServices')}
                additionalInfo={getSphereAdditionalInfo(country.financialServices, 'financialServices')}
                size={window.innerWidth <= 480 ? 70 : window.innerWidth <= 768 ? 85 : 100}
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
                    countryName={country.name}
                    taxValue={country.capitalGainsTax}
                    maxTaxRate={50}
                    infoText={
                      country.capitalGainsTax === "0%" ? 
                        "No capital gains tax is applied to cryptocurrency profits, making this an excellent jurisdiction for crypto investors." : 
                        `A capital gains tax rate of ${country.capitalGainsTax} is applied to cryptocurrency profits. ${
                          parseFloat(country.capitalGainsTax) < 15 ? "This is considered favorable compared to global standards." :
                          parseFloat(country.capitalGainsTax) < 25 ? "This is around the global average for crypto taxation." :
                          "This is higher than the global average for crypto taxation."
                        }`
                    }
                  />
                </TaxScaleContainer>
                
                <ExpandableDetails summary="Tax Details">
                  <p><strong>Long-term vs Short-term:</strong> {country.capitalGainsTax.includes('%') ? `The capital gains tax rate of ${country.capitalGainsTax} is applied` : 'Special tax treatment may apply'} to cryptocurrency profits.</p>
                  <p><strong>Wealth Tax:</strong> {country.wealthTax === '0%' ? 'There is no wealth tax applied to cryptocurrency holdings.' : `A wealth tax of ${country.wealthTax} is applied to cryptocurrency holdings.`}</p>
                  <p><strong>Tax Reporting:</strong> Ensure compliance with local tax regulations and reporting requirements.</p>
                </ExpandableDetails>
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
                <p>Investment requirement: <strong>{country.residencyInvestment}</strong></p>
                
                <Collapsible title="Residency Requirements" initiallyExpanded={false}>
                  <ResidencyRequirements>
                    <li><strong>Investment:</strong> Requires a capital investment of {country.residencyInvestment}.</li>
                    <li><strong>Physical Presence:</strong> May have minimum stay requirements.</li>
                    <li><strong>Documentation:</strong> Will need proof of income, clean criminal record, and health insurance.</li>
                    <li><strong>Processing Time:</strong> Can range from 3-12 months depending on the program.</li>
                  </ResidencyRequirements>
                </Collapsible>
                
                <Collapsible title="Path to Citizenship" initiallyExpanded={false}>
                  <p>Most residency programs can lead to citizenship after a qualifying period, typically 5-10 years. Requirements often include:</p>
                  <ul>
                    <li>Continuous residency</li>
                    <li>Language proficiency</li>
                    <li>Integration into society</li>
                    <li>Clean criminal record</li>
                  </ul>
                </Collapsible>
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
                <RiskBadge color={getCategoryColor(country.category)}>
                  {country.futureRisks}
                </RiskBadge>
                
                <Collapsible title="Cost of Living" initiallyExpanded={false}>
                  <p><strong>Index:</strong> {country.costOfLivingIndex}</p>
                  <p>Cost of living is an important factor when considering relocation. This metric compares relative prices for housing, food, transportation, and other essential expenses.</p>
                </Collapsible>
                
                <Collapsible title="Economic Stability" initiallyExpanded={false}>
                  <p>Economic stability affects long-term planning and investment security. Factors to consider include:</p>
                  <ul>
                    <li>Currency stability</li>
                    <li>Inflation rates</li>
                    <li>Political environment</li>
                    <li>Banking system reliability</li>
                  </ul>
                </Collapsible>
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
              <SidebarCardTitle>Financial Services</SidebarCardTitle>
              <SidebarCardContent>
                <FinancialServicesBadge service={country.financialServices}>
                  {country.financialServices}
                </FinancialServicesBadge>
                
                <FinancialServicesList>
                  <FinancialServicesItem available={country.financialServices !== 'Minimal'}>
                    <CheckIcon available={country.financialServices !== 'Minimal'} />
                    Banking Services for Crypto
                  </FinancialServicesItem>
                  
                  <FinancialServicesItem available={['World-class', 'Advanced', 'Strong'].includes(country.financialServices)}>
                    <CheckIcon available={['World-class', 'Advanced', 'Strong'].includes(country.financialServices)} />
                    Crypto-Friendly Banks
                  </FinancialServicesItem>
                  
                  <FinancialServicesItem available={['World-class', 'Advanced'].includes(country.financialServices)}>
                    <CheckIcon available={['World-class', 'Advanced'].includes(country.financialServices)} />
                    Institutional Custody Solutions
                  </FinancialServicesItem>
                  
                  <FinancialServicesItem available={country.financialServices === 'World-class'}>
                    <CheckIcon available={country.financialServices === 'World-class'} />
                    Advanced DeFi Integration
                  </FinancialServicesItem>
                </FinancialServicesList>
              </SidebarCardContent>
            </SidebarCard>
          </ScrollReveal>
          
          <ScrollReveal>
            <SidebarCard>
              <SidebarCardTitle>Resources</SidebarCardTitle>
              <ResourceList>
                <ResourceItem>
                  <ResourceIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 6H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 14H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </ResourceIcon>
                  <ResourceLink href="#" target="_blank" rel="noopener noreferrer">
                    Tax Authority Website
                  </ResourceLink>
                </ResourceItem>
                
                <ResourceItem>
                  <ResourceIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16.5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 7.5V7.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </ResourceIcon>
                  <ResourceLink href="#" target="_blank" rel="noopener noreferrer">
                    Residency Program Info
                  </ResourceLink>
                </ResourceItem>
                
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
`;

const RankBadge = styled.span`
  display: inline-block;
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  font-weight: bold;
 padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5)
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5)
`;

const CountryDescription = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  p {
    margin-top: 0;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.xs};
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
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 200px;
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    min-height: 180px;
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
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    min-height: 200px;
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    min-height: 180px;
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
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
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

const ResidencyRequirements = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const RiskBadge = styled.div`
  display: inline-block;
  background-color: ${({ theme, color }) => color ? `${color}33` : theme.colors.warning};
  color: ${({ theme, color }) => color || theme.colors.text};
  border: 1px solid ${({ color }) => color || 'currentColor'};
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SidebarCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  ${hoverElevate}
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
  padding: ${({ theme }) => theme.spacing.md};
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
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5)
`;

const SimilarCountryName = styled.div`
  font-weight: bold;
`;

const SimilarCountryTax = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondaryText};
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
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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
`;

const ResourceLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
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

export default EnhancedCountryPage;