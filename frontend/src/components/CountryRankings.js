import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RankingsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
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
  }
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  min-width: 250px;
  
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
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const CountryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;

const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
  
  &:hover {
    background-color: rgba(247, 147, 26, 0.1);
  }
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const RankCell = styled(TableCell)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent};
`;

const CountryNameCell = styled(TableCell)`
  font-weight: 500;
`;

const CountryLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CountryRankings = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  
  const filteredCountries = countries
    .filter(country => {
      return country.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortKey === 'rank') {
        comparison = a.rank - b.rank;
      } else if (sortKey === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === 'capitalGainsTax') {
        // This is a string like "0%", so we'll need to parse it
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
  
  return (
    <RankingsContainer id="rankings">
      <SectionTitle>Country Rankings</SectionTitle>
      
      <FiltersContainer>
        <SearchInput
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
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
      </FiltersContainer>
      
      <CountryTable>
        <TableHead>
          <tr>
            <TableHeader onClick={() => handleSort('rank')}>Rank</TableHeader>
            <TableHeader onClick={() => handleSort('name')}>Country</TableHeader>
            <TableHeader onClick={() => handleSort('capitalGainsTax')}>Capital Gains Tax</TableHeader>
            <TableHeader>Wealth Tax</TableHeader>
            <TableHeader>Residency Investment</TableHeader>
            <TableHeader>Financial Services</TableHeader>
          </tr>
        </TableHead>
        <tbody>
          {filteredCountries.map((country) => (
            <TableRow key={country._id}>
              <RankCell>{country.rank}</RankCell>
              <CountryNameCell>
                <CountryLink to={`/country/${country._id}`}>
                  {country.name}
                </CountryLink>
              </CountryNameCell>
              <TableCell>{country.capitalGainsTax}</TableCell>
              <TableCell>{country.wealthTax}</TableCell>
              <TableCell>{country.residencyInvestment}</TableCell>
              <TableCell>{country.financialServices}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </CountryTable>
    </RankingsContainer>
  );
};

export default CountryRankings;