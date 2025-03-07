import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const CountryPageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.secondaryText};
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const CountryHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CountryName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const RankBadge = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const CategoryBadge = styled.span`
  display: inline-block;
  background-color: ${({ category, theme }) => {
    switch (category) {
      case 'Excellent': return '#4CAF50';
      case 'Favorable': return '#8BC34A';
      case 'Moderate': return '#FFC107';
      case 'Restrictive': return '#FF9800';
      case 'Not favorable': return '#555555';
      default: return theme.colors.accent;
    }
  }};
  color: white;
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const CountryDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const InfoItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const InfoLabel = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoValue = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const RiskBadge = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.warning};
  color: #000000; /* Black text is more readable on warning background */
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CountryPage = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const { data } = await axios.get(`/api/countries/${id}`);
        setCountry(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country data:', error);
        
        if (error.response && error.response.status === 404) {
          setError('Country not found. Please check the ID and try again.');
        } else {
          setError('Error fetching country data. Please try again later.');
        }
        
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  if (loading) return (
    <CountryPageContainer>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2>Loading country data...</h2>
      </div>
    </CountryPageContainer>
  );
  
  if (error) return (
    <CountryPageContainer>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <BackLink to="/">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Rankings
        </BackLink>
      </div>
    </CountryPageContainer>
  );
  
  if (!country) return (
    <CountryPageContainer>
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h2>Country not found</h2>
        <BackLink to="/">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Rankings
        </BackLink>
      </div>
    </CountryPageContainer>
  );

  return (
    <CountryPageContainer>
      <BackLink to="/">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Rankings
      </BackLink>
      
      <CountryHeader>
        <CountryName>
          {country.name}
          <RankBadge>Rank #{country.rank}</RankBadge>
          {country.category && <CategoryBadge category={country.category}>{country.category}</CategoryBadge>}
        </CountryName>
        <CountryDescription>{country.description}</CountryDescription>
      </CountryHeader>
      
      <InfoCard>
        <CardTitle>Tax & Financial Information</CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Capital Gains Tax</InfoLabel>
            <InfoValue>{country.capitalGainsTax}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Wealth Tax</InfoLabel>
            <InfoValue>{country.wealthTax}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Residency Investment</InfoLabel>
            <InfoValue>{country.residencyInvestment}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Financial Services</InfoLabel>
            <InfoValue>{country.financialServices}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Cost of Living Index</InfoLabel>
            <InfoValue>{country.costOfLivingIndex}</InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Future Risks</InfoLabel>
            <InfoValue>
              <RiskBadge>{country.futureRisks}</RiskBadge>
            </InfoValue>
          </InfoItem>
        </InfoGrid>
      </InfoCard>
    </CountryPageContainer>
  );
};

export default CountryPage;