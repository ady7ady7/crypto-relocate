import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WorldMap from '../components/WorldMap';
import CountryRankings from '../components/CountryRankings';

const HomePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  max-width: 800px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  height: 500px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
`;

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/countries');
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching countries data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <HomePageContainer>
      <Hero>
        <Title>Find the Best Crypto-Friendly Countries</Title>
        <Subtitle>
          Explore our interactive map and rankings to discover countries with the most favorable
          cryptocurrency regulations, tax policies, and residency options for crypto enthusiasts.
        </Subtitle>
      </Hero>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <MapContainer>
            <WorldMap countries={countries} />
          </MapContainer>
          
          <CountryRankings countries={countries} />
        </>
      )}
    </HomePageContainer>
  );
};

export default HomePage;