// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import WorldMap from '../components/WorldMap';
import EnhancedCountryRankings from '../components/EnhancedCountryRankings';
import { MapSkeleton } from '../components/Skeletons';
import { ScrollReveal, fadeInAnimation } from '../components/animations';
import FeaturedCountries from '../components/FeaturedCountries';
import FeatureHighlights from '../components/FeatureHighlights';
import NewsletterSignup from '../components/NewsletterSignup';

const HomePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  ${fadeInAnimation}
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

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xxl} 0;
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
        // Simulate loading for a better UI experience with skeletons
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
        <ScrollReveal>
          <MapSkeleton />
        </ScrollReveal>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <ScrollReveal>
            <MapContainer>
              <WorldMap countries={countries} />
            </MapContainer>
          </ScrollReveal>
          
          {/* Featured Countries Section */}
          <FeaturedCountries countries={countries} />
          
          <SectionDivider />
          
          {/* Feature Highlights Section */}
          <FeatureHighlights />
          
          <SectionDivider />
          
          {/* Country Rankings Section */}
          <EnhancedCountryRankings countries={countries} />
          
          <SectionDivider />
          
          {/* Newsletter Signup Section */}
          <NewsletterSignup />
        </>
      )}
    </HomePageContainer>
  );
};

// Error message component
const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.danger}22;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.danger};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

export default HomePage;