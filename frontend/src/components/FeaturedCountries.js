// frontend/src/components/FeaturedCountries.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ScrollReveal, StaggeredList } from './animations';
import { getCategoryColor } from './styles/Colors';

const FeaturedCountries = ({ countries }) => {
  if (!countries || countries.length === 0) return null;
  
  // Get top 3 countries
  const featuredCountries = countries
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3);
  
  return (
    <FeaturedSection>
      <ScrollReveal>
        <SectionTitle>Featured Countries</SectionTitle>
      </ScrollReveal>
      
      <CountriesGrid>
        <StaggeredList>
          {featuredCountries.map((country) => {
            const categoryColor = getCategoryColor(country.category);
            return (
              <CountryCard key={country._id} to={`/country/${country.code.toLowerCase()}`}>
                <RankBadge color={categoryColor}>#{country.rank}</RankBadge>
                <CountryName>{country.name}</CountryName>
                <HighlightsGrid>
                  <Highlight>
                    <HighlightLabel>Capital Gains</HighlightLabel>
                    <HighlightValue>{country.capitalGainsTax}</HighlightValue>
                  </Highlight>
                  <Highlight>
                    <HighlightLabel>Wealth Tax</HighlightLabel>
                    <HighlightValue>{country.wealthTax}</HighlightValue>
                  </Highlight>
                  <Highlight>
                    <HighlightLabel>Financial</HighlightLabel>
                    <HighlightValue>{country.financialServices}</HighlightValue>
                  </Highlight>
                </HighlightsGrid>
                <ActionButton color={categoryColor}>View Details</ActionButton>
              </CountryCard>
            );
          })}
        </StaggeredList>
      </CountriesGrid>
    </FeaturedSection>
  );
};

// Styled components
const FeaturedSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const CountriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CountryCard = styled(Link)`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

const RankBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: bold;
`;

const CountryName = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Highlight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HighlightLabel = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const HighlightValue = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
`;

const ActionButton = styled.span`
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-align: center;
  font-weight: bold;
  margin-top: auto;
`;

export default FeaturedCountries;