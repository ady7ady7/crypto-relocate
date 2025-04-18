// frontend/src/components/EnhancedCountryRankings.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Import the new components
import InfiniteScroll from './InfiniteScroll';
import { ScrollReveal, StaggeredList, hoverElevate } from './animations';
import { TaxIcon, ResidencyIcon, BankIcon, RiskIcon, SortIcon, FilterIcon } from './illustrations/Icons';
import { CountryCardSkeleton } from './Skeletons';
import { ReadMore, InfoTooltip, Modal } from './disclosure';
import { RadarChart, HorizontalBarChart } from './charts/ComparisonChart';
import { getCategoryColor } from './styles/Colors';

const PAGE_SIZE = 10;

// For horizontal bar chart on mobile
const BarChartMobileAdjust = styled.div`
  width: 100%;
  position: relative;
  overflow: visible;
  
  @media (max-width: 480px) {
    display: flex;
    justify-content: center;
    padding: 0 5px;
  }
`;

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
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);
  const radarChartRef = useRef(null);
  
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
          const aValue = (a.capitalGainsTaxShort || a.capitalGainsTax).includes('%') 
            ? parseFloat(a.capitalGainsTaxShort || a.capitalGainsTax) 
            : 100; // Default high value for non-parseable
          const bValue = (b.capitalGainsTaxShort || b.capitalGainsTax).includes('%') 
            ? parseFloat(b.capitalGainsTaxShort || b.capitalGainsTax) 
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
            const aValue = (a.capitalGainsTaxShort || a.capitalGainsTax).includes('%') 
              ? parseFloat(a.capitalGainsTaxShort || a.capitalGainsTax) 
              : 100;
            const bValue = (b.capitalGainsTaxShort || b.capitalGainsTax).includes('%') 
              ? parseFloat(b.capitalGainsTaxShort || b.capitalGainsTax) 
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
        const newSelection = prev.filter(c => c._id !== country._id);
        // If we're removing the active country, reset the active index to 0
        if (prev.findIndex(c => c._id === country._id) === activeCountryIndex) {
          setActiveCountryIndex(0);
        }
        return newSelection;
      } else {
        // Limit to maximum 3 countries for comparison
        if (prev.length >= 3) {
          return [...prev.slice(1), country];
        }
        return [...prev, country];
      }
    });
  };
  
  // Handle country selection for radar chart focus
  const handleCountryFocus = (index) => {
    setActiveCountryIndex(index);
    
    // Update tooltip event handlers after changing the active country
    setTimeout(() => {
      updateTooltipHandlers();
    }, 100);
  };

  // Function to update tooltip handlers when the active country changes
  const updateTooltipHandlers = () => {
    if (!showCompareModal) return;
    
    const tooltip = document.getElementById('radar-tooltip');
    const hitboxes = document.querySelectorAll('.radar-point-hitbox');
    
    if (!tooltip || hitboxes.length === 0) return;
    
    // Setup tooltip handlers
    hitboxes.forEach(hitbox => {
      // Remove old event listeners if any
      hitbox.removeEventListener('mouseenter', handleTooltipEnter);
      hitbox.removeEventListener('mouseleave', handleTooltipLeave);
      
      // Add new event listeners
      hitbox.addEventListener('mouseenter', handleTooltipEnter);
      hitbox.addEventListener('mouseleave', handleTooltipLeave);
    });
  };

  // Helper functions for tooltip handling
  const handleTooltipEnter = (e) => {
    const tooltip = document.getElementById('radar-tooltip');
    if (!tooltip) return;
    
    const country = e.target.getAttribute('data-country');
    const category = e.target.getAttribute('data-category');
    const value = e.target.getAttribute('data-value');
    
    tooltip.querySelector('.country').textContent = `${country} - ${category}`;
    tooltip.querySelector('.value').textContent = `${value}%`;
    
    // Position tooltip near the point
    const rect = e.target.getBoundingClientRect();
    const containerRect = tooltip.parentElement.getBoundingClientRect();
    
    const tooltipX = rect.left - containerRect.left + rect.width / 2;
    const tooltipY = rect.top - containerRect.top;
    
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY - 50}px`;
    tooltip.style.opacity = '1';
  };

  const handleTooltipLeave = () => {
    const tooltip = document.getElementById('radar-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
    }
  };

  /**
   * Touch handler for mobile devices
   */
  const handleTooltipTouch = (e) => {
    e.preventDefault(); // Prevent default touch behavior
    
    const tooltip = document.getElementById('radar-tooltip');
    if (!tooltip) return;
    
    // Get data from the touched element
    const country = e.target.getAttribute('data-country');
    const category = e.target.getAttribute('data-category');
    const value = e.target.getAttribute('data-value');
    
    tooltip.querySelector('.country').textContent = `${country} - ${category}`;
    tooltip.querySelector('.value').textContent = `${value}%`;
    
    // Position tooltip near the touch point
    const rect = e.target.getBoundingClientRect();
    const containerRect = tooltip.parentElement.getBoundingClientRect();
    
    const tooltipX = rect.left - containerRect.left + rect.width / 2;
    const tooltipY = rect.top - containerRect.top;
    
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY - 50}px`;
    tooltip.style.opacity = '1';
    
    // Hide the tooltip after a delay (for mobile)
    setTimeout(() => {
      tooltip.style.opacity = '0';
    }, 3000);
  };

  // Initialize the radar chart with proper event handlers
  const initializeRadarChart = () => {
    // Wait for the DOM to be fully updated
    setTimeout(() => {
      // Get the tooltip element
      const tooltip = document.getElementById('radar-tooltip');
      if (!tooltip) return;
      
      // Get all the radar points for the active country only
      const hitboxes = document.querySelectorAll('.radar-point-hitbox');
      
      // Attach tooltip handlers to each point
      hitboxes.forEach(hitbox => {
        // Remove any existing handlers first
        hitbox.removeEventListener('mouseenter', handleTooltipEnter);
        hitbox.removeEventListener('mouseleave', handleTooltipLeave);
        
        // Add new handlers
        hitbox.addEventListener('mouseenter', handleTooltipEnter);
        hitbox.addEventListener('mouseleave', handleTooltipLeave);
      });
      
      // Handle mobile devices - add touch handlers
      const isTouchDevice = ('ontouchstart' in window) || 
                           (navigator.maxTouchPoints > 0) || 
                           (navigator.msMaxTouchPoints > 0);
      
      if (isTouchDevice) {
        hitboxes.forEach(hitbox => {
          hitbox.removeEventListener('touchstart', handleTooltipTouch);
          hitbox.addEventListener('touchstart', handleTooltipTouch);
        });
        
        // Add a general touch handler to hide tooltip when touching elsewhere
        document.addEventListener('touchstart', (e) => {
          // Check if the touch is on a hitbox
          if (!e.target.classList.contains('radar-point-hitbox')) {
            tooltip.style.opacity = '0';
          }
        });
      }
    }, 100); // Short delay to ensure DOM is ready
  };

  // Update the useEffect hook for modal visibility
  useEffect(() => {
    if (showCompareModal) {
      // Initialize radar chart when modal becomes visible
      initializeRadarChart();
      
      // Update when active country changes
      const updateId = setTimeout(() => {
        // Update country-related styling
        document.querySelectorAll('.country-data').forEach((el, idx) => {
          if (idx === activeCountryIndex) {
            el.classList.add('highlighted');
            el.classList.remove('dimmed');
          } else {
            el.classList.add('dimmed');
            el.classList.remove('highlighted');
          }
        });
        
        // Update legend items if present
        document.querySelectorAll('.country-legend-item').forEach((el, idx) => {
          if (idx === activeCountryIndex) {
            el.classList.add('highlighted');
            el.classList.remove('dimmed');
          } else {
            el.classList.add('dimmed');
            el.classList.remove('highlighted');
          }
        });
      }, 10);
      
      return () => clearTimeout(updateId);
    }
  }, [showCompareModal, activeCountryIndex, selectedCountries]);
  
  // Updated renderComparisonData function with only one set of buttons at the top
  const renderComparisonData = () => {
    if (selectedCountries.length === 0) return null;
    
    // For radar chart
    const radarData = selectedCountries.map(country => {
      // Parse numeric values from tax percentages and other metrics
      const capitalGainsTax = (country.capitalGainsTaxShort || country.capitalGainsTax).includes('%') 
        ? 100 - parseFloat(country.capitalGainsTaxShort || country.capitalGainsTax) // Invert for better visualization (0% = 100 score)
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
      
      const countryColor = getCategoryColor(country.category);
      
      return {
        name: country.name,
        color: countryColor,
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
    const barData = selectedCountries.map(country => {
      const countryColor = getCategoryColor(country.category);
      
      return {
        label: country.name,
        value: 100 - country.rank, // Invert rank for visualization (higher is better)
        color: countryColor
      };
    });
    
    return (
      <ComparisonContainer ref={radarChartRef}>
        {/* Instruction moved above selection tabs */}
        <ModalInstructions>
          <InfoIcon size="18px" color="#F7931A" />
          <span>Click on a country button to focus on its data</span>
        </ModalInstructions>
        
        {/* Keep only this set of buttons - moved from the bottom to the top */}
        <SelectedCountriesContainer>
          <SelectedCountriesList>
            {selectedCountries.map((country, idx) => {
              const countryColor = getCategoryColor(country.category);
              
              return (
                <SelectedCountryItem 
                  key={country._id} 
                  color={countryColor}
                  active={idx === activeCountryIndex}
                  onClick={() => handleCountryFocus(idx)}
                >
                  <div className="country-info">
                    <strong>{country.name}</strong>
                    <span>Rank #{country.rank}</span>
                  </div>
                  <RemoveButton onClick={(e) => {
                    e.stopPropagation(); // Prevent activation of the country when removing
                    toggleCountrySelection(country);
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </RemoveButton>
                </SelectedCountryItem>
              );
            })}
          </SelectedCountriesList>
        </SelectedCountriesContainer>
        
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
              size={400}
              activeCountryIndex={activeCountryIndex}
            />
          </ChartCard>
          
          <ChartCard>
            <h4>Overall Ranking Score</h4>
            <BarChartMobileAdjust>
              <HorizontalBarChart 
                data={barData} 
                maxValue={100} 
                valueLabel="pts"
              />
            </BarChartMobileAdjust>
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <FilterIconWrapper>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </FilterIconWrapper>
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
          <FilterIconWrapper>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="19 12 12 19 5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </FilterIconWrapper>
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
              renderItem={(country, index) => {
                const rankColor = getCategoryColor(country.category);
                
                return (
                  <div
                    key={country._id}
                    className={`table-row ${selectedCountries.some(c => c._id === country._id) ? 'selected' : ''}`}
                    style={{
                      backgroundColor: selectedCountries.some(c => c._id === country._id) 
                        ? `${rankColor}22` 
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
                      <RankBadge color={rankColor}>
                        {country.rank}
                      </RankBadge>
                    </div>
                    <div className="country-cell">
                      <CountryLink to={`/country/${country.code.toLowerCase()}`}>
                        {country.name}
                      </CountryLink>
                    </div>
                    <div className="gain-cell">
                      <HighlightValue isGood={(country.capitalGainsTaxShort || country.capitalGainsTax) === '0%'}>
                        {country.capitalGainsTaxShort || country.capitalGainsTax}
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
                );
              }}
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
      
      {/* Comparison Modal - Simplified with just one call to renderComparisonData */}
      <Modal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        title="Country Comparison"
      >
        {renderComparisonData()}
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

// Styled components
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
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondaryText};
  z-index: 1;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    left: 14px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;


const SearchInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 48px`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 42px`};
    font-size: 0.95rem;
  }
`;

const FilterIconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.secondaryText};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    left: 14px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 48px`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  appearance: none;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm} 42px`};
    font-size: 0.95rem;
  }
`;

const CompareButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 0.95rem;
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
    grid-template-columns: 3.5% 9.5% 17% 30% 20% 20%;
    min-height: 60px;
  }
  
  .table-header {
    background-color: #1e1e1e;
    position: sticky;
    top: 0;
    z-index: 10;
    font-weight: 600;
    
    @media (max-width: 768px) {
      grid-template-columns: 3.5% 9.5% 20% 37% 30%;
      .financial-cell {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 3.5% 11.5% 35% 50%;
      .residency-cell {
        display: none;
      }
    }
  }
  
  .table-row {
    border-bottom: 1px solid #2d2d2d;
    transition: background-color 0.2s;
    
    @media (max-width: 768px) {
      grid-template-columns: 3.5% 9.5% 20% 37% 30%;
      .financial-cell {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      grid-template-columns: 3.5% 11.5% 35% 50%;
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
  
  .check-cell, .rank-cell, .country-cell, .gain-cell, .residency-cell, .financial-cell {
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
  
  .gain-cell {
    justify-content: center;
    text-align: center;
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

// The rest of the styled components
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
  background-color: ${({ color }) => color || '#F7931A'};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  min-width: 30px;
  font-weight: bold;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5)
`;

const HighlightValue = styled.div`
  font-weight: ${({ isGood }) => isGood ? 'bold' : 'normal'};
  color: ${({ theme }) => theme.colors.text};
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

// Modal instructions styling
const ModalInstructions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(247, 147, 26, 0.1);
  border: 1px solid rgba(247, 147, 26, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  width: 100%;
  
  span {
    flex: 1;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`;

// Enhanced comparison container
const ComparisonContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Charts grid with better spacing
const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Updated chart card styling
const ChartCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${hoverElevate}
  
  h4 {
    margin-top: 0;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    
    h4 {
      font-size: 1.1rem;
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

// Improved Selected Countries container for top placement
const SelectedCountriesContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

// List of selected countries with better spacing
const SelectedCountriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

// Enhanced country item with better interaction
const SelectedCountryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, color, active }) => 
    active ? `${color}33` : `${color}22`};
  border: 1px solid ${({ color, active }) => 
    active ? color : 'transparent'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: pointer;
  
  .country-info {
    display: flex;
    flex-direction: column;
  }
  
  strong {
    font-size: 1.1rem;
    color: ${({ theme, active }) => 
      active ? theme.colors.text : theme.colors.secondaryText};
  }
  
  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    background-color: ${({ color }) => `${color}33`};
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    
    strong {
      font-size: 1rem;
    }
    
    span {
      font-size: 0.8rem;
    }
  }
`;

// Remove button styling
const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryText};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    background-color: rgba(244, 67, 54, 0.1);
  }
`;

export default EnhancedCountryRankings;