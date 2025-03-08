// frontend/src/components/EnhancedCountryRankings.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Import the new components
import InfiniteScroll from './InfiniteScroll';
import { ScrollReveal, StaggeredList, hoverElevate } from './animations';
import { TaxIcon, WealthIcon, ResidencyIcon, BankIcon, RiskIcon, SortIcon, FilterIcon } from './illustrations/Icons';
import { CountryCardSkeleton } from './Skeletons';
import { ReadMore, InfoTooltip, Modal } from './disclosure';
import { RadarChart, HorizontalBarChart } from './charts/ComparisonChart';
import { getCategoryColor, getColorByRank } from './styles/Colors';

const PAGE_SIZE = 10;

// Helper function to get category color
const getCategoryColorForComponent = (category) => {
  return getCategoryColor(category);
};

const EnhancedCountryRankings = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const [visibleCountries, setVisibleCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filtering and sorting countries
  useEffect(() => {
    const filteredCountries = countries
      .filter(country => {
        const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || country.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        if (sortKey === 'rank') {
          comparison = a.rank - b.rank;
        } else if (sortKey === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortKey === 'capitalGainsTax') {
          // Parse tax rates for comparison
          const aValue = a.capitalGainsTax.includes('%') 
            ? parseFloat(a.capitalGainsTax) 
            : 100; // Default high value for non-parseable
          const bValue = b.capitalGainsTax.includes('%') 
            ? parseFloat(b.capitalGainsTax) 
            : 100;
          comparison = aValue - bValue;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    
    // Reset pagination when filters change
    setPage(1);
    setVisibleCountries(filteredCountries.slice(0, PAGE_SIZE));
    setHasMore(filteredCountries.length > PAGE_SIZE);
  }, [countries, searchTerm, sortKey, sortOrder, categoryFilter]);
  
  // Load more countries
  const loadMoreCountries = () => {
    if (!hasMore) return;
    
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const filteredCountries = countries
        .filter(country => {
          const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = categoryFilter === 'all' || country.category === categoryFilter;
          return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
          let comparison = 0;
          
          if (sortKey === 'rank') {
            comparison = a.rank - b.rank;
          } else if (sortKey === 'name') {
            comparison = a.name.localeCompare(b.name);
          } else if (sortKey === 'capitalGainsTax') {
            const aValue = a.capitalGainsTax.includes('%') 
              ? parseFloat(a.capitalGainsTax) 
              : 100;
            const bValue = b.capitalGainsTax.includes('%') 
              ? parseFloat(b.capitalGainsTax) 
              : 100;
            comparison = aValue - bValue;
          }
          
          return sortOrder === 'asc' ? comparison : -comparison;
        });
      
      const nextPage = page + 1;
      const nextPageCountries = filteredCountries.slice(0, nextPage * PAGE_SIZE);
      
      setVisibleCountries(nextPageCountries);
      setPage(nextPage);
      setHasMore(nextPageCountries.length < filteredCountries.length);
      setLoading(false);
    }, 800);
  };
  
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  
  const toggleCountrySelection = (country) => {
    setSelectedCountries(prev => {
      const isSelected = prev.some(c => c._id === country._id);
      
      if (isSelected) {
        return prev.filter(c => c._id !== country._id);
      } else {
        // Limit to maximum 3 countries for comparison
        if (prev.length >= 3) {
          return [...prev.slice(1), country];
        }
        return [...prev, country];
      }
    });
  };
  
  // Render comparison chart data
  const renderComparisonData = () => {
    if (selectedCountries.length === 0) return null;
    
    // For radar chart
    const radarData = selectedCountries.map(country => {
      // Parse numeric values from tax percentages and other metrics
      const capitalGainsTax = country.capitalGainsTax.includes('%') 
        ? 100 - parseFloat(country.capitalGainsTax) // Invert for better visualization (0% = 100 score)
        : 0;
      
      // Map financial services to numeric values
      const financialServicesScore = 
        country.financialServices === 'World-class' ? 100 :
        country.financialServices === 'Advanced' ? 80 :
        country.financialServices === 'Strong' ? 60 :
        country.financialServices === 'Moderate' ? 40 :
        country.financialServices === 'Developing' ? 20 : 10;
      
      // Derive residency score based on investment amount
      const residencyText = country.residencyInvestment;
      let residencyScore = 50; // Default
      
      if (residencyText.includes('0k') || residencyText.includes('No ')) {
        residencyScore = 90;
      } else if (residencyText.includes('100k') || residencyText.includes('50k')) {
        residencyScore = 80;
      } else if (residencyText.includes('200k') || residencyText.includes('150k')) {
        residencyScore = 70;
      } else if (residencyText.includes('300k') || residencyText.includes('500k')) {
        residencyScore = 60;
      } else if (residencyText.includes('1M')) {
        residencyScore = 40;
      } else if (residencyText.includes('2M') || residencyText.includes('3M')) {
        residencyScore = 20;
      }
      
      // Risk score (inverted for better visualization)
      const riskScore = 70; // Default moderate risk
      
      return {
        name: country.name,
        color: getCategoryColorForComponent(country.category),
        values: [
          capitalGainsTax,           // Tax friendliness
          country.wealthTax === '0%' ? 100 : 30, // Wealth tax (simple binary score)
          residencyScore,            // Residency accessibility
          financialServicesScore,    // Financial services
          riskScore                  // Risk assessment
        ]
      };
    });
    
    // For bar chart
    const barData = selectedCountries.map(country => ({
      label: country.name,
      value: 100 - country.rank, // Invert rank for visualization (higher is better)
      color: getCategoryColorForComponent(country.category)
    }));
    
    return (
      <ComparisonContainer>
        <h3>Country Comparison</h3>
        
        <ChartsGrid>
          <ChartCard>
            <h4>Overall Metrics</h4>
            <RadarChart 
              data={radarData} 
              categories={[
                'Tax Friendliness', 
                'Wealth Tax', 
                'Residency Access',
                'Financial Services',
                'Risk Level'
              ]} 
              size={300}
            />
          </ChartCard>
          
          <ChartCard>
            <h4>Overall Ranking Score</h4>
            <HorizontalBarChart 
              data={barData} 
              maxValue={100} 
              valueLabel="pts"
            />
          </ChartCard>
        </ChartsGrid>
      </ComparisonContainer>
    );
  };
  
  return (
    <RankingsContainer id="rankings">
      <ScrollReveal>
        <SectionTitle>Country Rankings</SectionTitle>
      </ScrollReveal>
      
      <FiltersContainer>
        <FilterGroup>
          <SearchIcon>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterGroup>
        
        <FilterGroup>
          <FilterIcon size="18px" />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Excellent">Excellent</option>
            <option value="Favorable">Favorable</option>
            <option value="Moderate">Moderate</option>
            <option value="Restrictive">Restrictive</option>
            <option value="Not favorable">Not Favorable</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <SortIcon size="18px" />
          <FilterSelect
            value={`${sortKey}-${sortOrder}`}
            onChange={(e) => {
              const [key, order] = e.target.value.split('-');
              setSortKey(key);
              setSortOrder(order);
            }}
          >
            <option value="rank-asc">Rank: Low to High</option>
            <option value="rank-desc">Rank: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="capitalGainsTax-asc">Tax: Low to High</option>
            <option value="capitalGainsTax-desc">Tax: High to Low</option>
          </FilterSelect>
        </FilterGroup>
        
        {selectedCountries.length > 0 && (
          <CompareButton onClick={() => setShowCompareModal(true)}>
            Compare Selected ({selectedCountries.length})
          </CompareButton>
        )}
      </FiltersContainer>
      
      <TablePrompt>
        <span>👉 Click on any country to view detailed information and analysis</span>
      </TablePrompt>
      
      <TableContainer>
        <div className="table-layout">
          <div className="table-header">
            <div className="check-cell"></div>
            <div className="rank-cell" onClick={() => handleSort('rank')}>
              Rank
              {sortKey === 'rank' && (
                <SortIndicator direction={sortOrder === 'asc' ? 'up' : 'down'} />
              )}
            </div>
            <div className="country-cell" onClick={() => handleSort('name')}>
              Country
              {sortKey === 'name' && (
                <SortIndicator direction={sortOrder === 'asc' ? 'up' : 'down'} />
              )}
            </div>
            <div className="gain-cell" onClick={() => handleSort('capitalGainsTax')}>
              <div className="header-with-icon">
                <TaxIcon size="16px" />
                <span>Capital Gains</span>
                <InfoTooltip content="Tax rate applied to profits from selling crypto assets">
                  <InfoIcon size="14px" />
                </InfoTooltip>
              </div>
              {sortKey === 'capitalGainsTax' && (
                <SortIndicator direction={sortOrder === 'asc' ? 'up' : 'down'} />
              )}
            </div>
            <div className="wealth-cell">
              <div className="header-with-icon">
                <WealthIcon size="16px" />
                <span>Wealth Tax</span>
                <InfoTooltip content="Annual tax on total wealth/assets">
                  <InfoIcon size="14px" />
                </InfoTooltip>
              </div>
            </div>
            <div className="residency-cell">
              <div className="header-with-icon">
                <ResidencyIcon size="16px" />
                <span>Residency</span>
              </div>
            </div>
            <div className="financial-cell">
              <div className="header-with-icon">
                <BankIcon size="16px" />
                <span>Financial</span>
              </div>
            </div>
          </div>
          
          <div className="table-body">
            <InfiniteScroll
              data={visibleCountries}
              renderItem={(country, index) => (
                <div
                  key={country._id}
                  className={`table-row ${selectedCountries.some(c => c._id === country._id) ? 'selected' : ''}`}
                  style={{
                    backgroundColor: selectedCountries.some(c => c._id === country._id) 
                      ? `${getCategoryColorForComponent(country.category)}22` 
                      : index % 2 === 0 ? '#222222' : '#191919'
                  }}
                >
                  <div className="check-cell">
                    <Checkbox
                      type="checkbox"
                      checked={selectedCountries.some(c => c._id === country._id)}
                      onChange={() => toggleCountrySelection(country)}
                    />
                  </div>
                  <div className="rank-cell">
                    <RankBadge category={country.category}>
                      {country.rank}
                    </RankBadge>
                  </div>
                  <div className="country-cell">
                    <CountryLink to={`/country/${country._id}`}>
                      {country.name}
                    </CountryLink>
                  </div>
                  <div className="gain-cell">
                    <HighlightValue isGood={(country.capitalGainsTaxShort || country.capitalGainsTax) === '0%'}>
                      {country.capitalGainsTaxShort || country.capitalGainsTax}
                    </HighlightValue>
                  </div>
                  <div className="wealth-cell">
                    <HighlightValue isGood={country.wealthTax === '0%'}>
                      {country.wealthTax}
                    </HighlightValue>
                  </div>
                  <div className="residency-cell">
                    <span className="nowrap">{country.residencyInvestment}</span>
                  </div>
                  <div className="financial-cell">
                    <FinancialBadge service={country.financialServices}>
                      {country.financialServices}
                    </FinancialBadge>
                  </div>
                </div>
              )}
              hasMore={hasMore}
              loading={loading}
              loadMore={loadMoreCountries}
              loadingComponent={
                <StaggeredList>
                  <CountryCardSkeleton />
                  <CountryCardSkeleton />
                  <CountryCardSkeleton />
                </StaggeredList>
              }
            />
          </div>
        </div>
      </TableContainer>
      
      {/* Comparison Modal */}
      <Modal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        title="Compare Countries"
      >
        {renderComparisonData()}
        
        <SelectedCountriesContainer>
          <h4>Selected Countries</h4>
          <SelectedCountriesList>
            {selectedCountries.map(country => (
              <SelectedCountryItem key={country._id} category={country.category}>
                <div className="country-info">
                  <strong>{country.name}</strong>
                  <span>Rank #{country.rank}</span>
                </div>
                <RemoveButton onClick={() => toggleCountrySelection(country)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </RemoveButton>
              </SelectedCountryItem>
            ))}
          </SelectedCountriesList>
        </SelectedCountriesContainer>
      </Modal>
    </RankingsContainer>
  );
};

// Small components
const InfoIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  </IconWrapper>
);

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  color: ${props => props.color || 'currentColor'};
`;

// Styled Components
const RankingsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const TablePrompt = styled.div`
  background-color: rgba(247, 147, 26, 0.15);
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
  font-weight: 500;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
    
    > * {
      width: 100%;
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  min-width: 0; /* Allow flex items to shrink below content size */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondaryText};
  z-index: 1;
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  width: 100%;
  padding-left: ${({ theme }) => theme.spacing.xl};
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const CompareButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

// Table Layout with CSS Grid
const TableContainer = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #121212;
  
  .table-layout {
    width: 100%;
  }
  
  .nowrap {
    white-space: nowrap;
  }
  
  .table-header, .table-row {
    display: grid;
    grid-template-columns: 3.5% 6.5% 19% 1fr 1fr 1.2fr 0.8fr;
    min-height: 60px;
  }
  
  .table-header {
    background-color: #1e1e1e;
    position: sticky;
    top: 0;
    z-index: 10;
    font-weight: 600;
    
    @media (max-width: 768px) {
      grid-template-columns: 3.5% 6.5% 24% 1fr 1fr 1.2fr;
      .financial-cell {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 3.5% 6.5% 24% 1fr 1fr;
      .residency-cell {
        display: none;
      }
    }
  }
  
  .table-row {
    border-bottom: 1px solid #2d2d2d;
    transition: background-color 0.2s;
    
    @media (max-width: 768px) {
      grid-template-columns: 3.5% 6.5% 24% 1fr 1fr 1.2fr;
      .financial-cell {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 3.5% 6.5% 24% 1fr 1fr;
      .residency-cell {
        display: none;
      }
    }
    
    &:hover {
      background-color: rgba(247, 147, 26, 0.1) !important;
    }
    
    &.selected {
      background-color: rgba(247, 147, 26, 0.15) !important;
    }
  }
  
  .check-cell, .rank-cell, .country-cell, .gain-cell, .wealth-cell, .residency-cell, .financial-cell {
    display: flex;
    align-items: center;
    padding: 0.75rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .check-cell {
    justify-content: center;
  }
  
  .rank-cell {
    justify-content: center;
    cursor: pointer;
  }
  
  .country-cell {
    justify-content: flex-start;
    cursor: pointer;
    padding-left: 1rem;
  }
  
  .gain-cell, .wealth-cell {
    justify-content: center;
    text-align: center;
  }
  
  .gain-cell {
    cursor: pointer;
  }
  
  .residency-cell, .financial-cell {
    justify-content: center;
    text-align: center;
  }
  
  .header-with-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.accent};
`;

const CountryLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const RankBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ category }) => getCategoryColorForComponent(category) || '#F7931A'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 30px;
  font-weight: bold;
`;

const HighlightValue = styled.div`
  font-weight: ${({ isGood }) => isGood ? 'bold' : 'normal'};
  color: ${({ isGood, theme }) => isGood ? theme.colors.success : theme.colors.text};
`;

const FinancialBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: ${({ service }) => 
    service === 'World-class' ? '#4CAF50' :
    service === 'Advanced' ? '#8BC34A' :
    service === 'Strong' ? '#CDDC39' :
    service === 'Moderate' ? '#FFC107' :
    service === 'Developing' ? '#FF9800' : '#9E9E9E'};
  color: ${({ service }) => 
    ['World-class', 'Advanced', 'Strong'].includes(service) ? 'white' : 'black'};
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const SortIndicator = styled.span`
  display: inline-block;
  margin-left: 4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-${({ direction }) => direction === 'up' ? 'bottom' : 'top'}: 5px solid currentColor;
`;

const ComparisonContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  ${hoverElevate}
  
  h4 {
    margin-top: 0;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const SelectedCountriesContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SelectedCountriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SelectedCountryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme, category }) => `${getCategoryColorForComponent(category)}22`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  .country-info {
    display: flex;
    flex-direction: column;
  }
  
  strong {
    font-size: 1rem;
  }
  
  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryText};
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export default EnhancedCountryRankings;