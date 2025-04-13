// https://upload.wikimedia.org/wikipedia/commons/9/95/Continents.svg

// WorldMapstarter.js - Fixed version
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategoryColor, Colors } from './styles/Colors';

const WorldMap = ({ countries }) => {
  // State for tracking which continent is active
  const [activeContinent, setActiveContinent] = useState('all');
  const [hoveredContinent, setHoveredContinent] = useState(null);
  const [countryDots, setCountryDots] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState({ visible: false, x: 0, y: 0, country: null });

  const mapRef = useRef(null);
  const tooltipRef = useRef(null);
  
  // Define continent data with regions and map positions
  const continents = {
    all: { name: 'Global', countries: [] },
    na: { name: 'North America', countries: [] },
    sa: { name: 'Latin America', countries: [] },
    emea: { name: 'Europe, Middle East & Africa', countries: [] },
    ap: { name: 'Asia Pacific', countries: [] }
  };
  
  // Map country codes to continents
  const countryToContinentMap = {
    // North America
    'US': 'na', 'CA': 'na', 'MX': 'na',
    
    // Latin America
    'BR': 'sa', 'AR': 'sa', 'CL': 'sa', 'CO': 'sa', 'PE': 'sa', 
    'VE': 'sa', 'EC': 'sa', 'BO': 'sa', 'PY': 'sa', 'UY': 'sa',
    
    // Europe, Middle East & Africa
    'GB': 'emea', 'FR': 'emea', 'DE': 'emea', 'IT': 'emea', 'ES': 'emea',
    'PT': 'emea', 'CH': 'emea', 'AT': 'emea', 'BE': 'emea', 'NL': 'emea',
    'SE': 'emea', 'NO': 'emea', 'DK': 'emea', 'FI': 'emea', 'IE': 'emea',
    'GR': 'emea', 'PL': 'emea', 'RU': 'emea', 'SA': 'emea', 'AE': 'emea',
    'EG': 'emea', 'ZA': 'emea', 'NG': 'emea', 'KE': 'emea', 'MA': 'emea',
    'IL': 'emea', 'TR': 'emea',
    
    // Asia Pacific
    'CN': 'ap', 'JP': 'ap', 'KR': 'ap', 'IN': 'ap', 'AU': 'ap',
    'SG': 'ap', 'MY': 'ap', 'ID': 'ap', 'TH': 'ap', 'VN': 'ap',
    'PH': 'ap', 'NZ': 'ap', 'HK': 'ap'
  };
  
  // Process countries and assign them to continents
  useEffect(() => {
    if (countries && countries.length > 0) {
      // First, categorize countries by continent
      const continentData = { ...continents };
      
      countries.forEach(country => {
        // Assign to global list
        continentData.all.countries.push(country);
        
        // Assign to specific continent if mapping exists
        const continentCode = countryToContinentMap[country.code];
        if (continentCode && continentData[continentCode]) {
          continentData[continentCode].countries.push(country);
        }
      });
      
      // Generate country dots for the active continent
      generateCountryDots(continentData[activeContinent].countries);
    }
  }, [countries, activeContinent]);
  
  // Generate random positions for country dots within the active continent
  const generateCountryDots = (countriesForContinent) => {
    // Define continent bounding boxes for dot placement
    const continentBounds = {
      all: { x1: 50, y1: 50, x2: 950, y2: 550 },
      na: { x1: 100, y1: 100, x2: 350, y2: 300 },
      sa: { x1: 200, y1: 350, x2: 400, y2: 550 },
      emea: { x1: 450, y1: 100, x2: 650, y2: 450 },
      ap: { x1: 700, y1: 150, x2: 900, y2: 400 }
    };
    
    const bounds = continentBounds[activeContinent] || continentBounds.all;
    
    // Generate dots with random positions within bounds
    const dots = countriesForContinent.map(country => {
      const x = bounds.x1 + Math.random() * (bounds.x2 - bounds.x1);
      const y = bounds.y1 + Math.random() * (bounds.y2 - bounds.y1);
      
      return {
        id: country._id,
        code: country.code,
        name: country.name,
        x,
        y,
        category: country.category,
        color: getCategoryColor(country.category)
      };
    });
    
    setCountryDots(dots);
  };
  
  const handleContinentClick = (continentCode) => {
    setActiveContinent(continentCode);
  };

  // Add this tooltip handler function
  const handleDotMouseEnter = useCallback((event, country) => {
    if (!mapRef.current) return;
    
    const mapRect = mapRef.current.getBoundingClientRect();
    const x = event.clientX - mapRect.left;
    const y = event.clientY - mapRect.top;
    
    setTooltipInfo({
      visible: true,
      x,
      y,
      country
    });
  }, []);
  
  const handleDotMouseLeave = useCallback(() => {
    setTooltipInfo(prev => ({ ...prev, visible: false }));
  }, []);



  return (
    <MapContainer>
      <ContinentLegend>
        <LegendTitle>Regions</LegendTitle>
        {Object.entries(continents).map(([code, continent]) => (
          <ContinentButton 
            key={code}
            active={activeContinent === code}
            onClick={() => handleContinentClick(code)}
          >
            <GlobeIcon />
            {continent.name}
          </ContinentButton>
        ))}
      </ContinentLegend>
      
      <MapWrapper ref={mapRef}>
        <SVGMap 
          viewBox="0 0 1000 500" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background world map silhouette - a more accurate base */}
          <WorldSilhouette d="M47.3,214.3c-14.2,0-25.8-11.4-25.8-25.5c0-14.1,11.6-25.5,25.8-25.5c14.2,0,25.8,11.4,25.8,25.5C73.1,202.9,61.5,214.3,47.3,214.3z M1148.1,214.3c-14.2,0-25.8-11.4-25.8-25.5c0-14.1,11.6-25.5,25.8-25.5c14.2,0,25.8,11.4,25.8,25.5C1173.9,202.9,1162.4,214.3,1148.1,214.3z M1045.3,320.1c-14.2,0-25.8-11.4-25.8-25.5c0-14.1,11.6-25.5,25.8-25.5c14.2,0,25.8,11.4,25.8,25.5C1071.1,308.7,1059.5,320.1,1045.3,320.1z M4.5,88c119.8,0,239.7,0,359.5,0c1.1,1.8,2.6,3.3,3.5,5.3c16.1,38.5,31.8,77.1,47.9,115.6c6.6,15.9,13.7,31.7,20.8,47.4c1.1,2.4,3.5,2.8,6,2.8c68.9-0.1,137.8-0.2,206.6,0.1c6.2,0,10.5-1.7,14.9-6.2c25.3-25.5,51-50.5,76.2-76.1c3.5-3.6,6-4.4,10.6-1.8c11.5,6.3,23.6,11.5,35.5,17.1c1.1,0.5,2.3,0.9,3.9,1.6c-9.8,10.2-19.3,20.2-29,30.3c2.8,0.5,5.5,0.2,8,0.2c68.3,0,136.6,0,204.9,0c2.1,0,4.2,0,6.5,0c0,13.5,0,26.7,0,40.4c-70.9,0-141.8,0-213.3,0c0,43.8,0,87.2,0,131.2c6.7,0,13.2,0,20.2,0c0,10.2,0,20.2,0,30.7c-6.9,0-13.6,0-20.7,0c0,4.7,0,9,0,13.8c-39.5,0-78.6,0-118.2,0c0-5,0-9.7,0-14.1c2.2-0.8,4.5,0.5,7-1.1c-0.2-1.6-1.1-2.3-2.3-2.3c-2.1,0-4.2,0-6.9,0c0-33.3,0-66.2,0-99.5c-1.9-0.7-3.3-0.4-5,0.9c-12.7,9.8-25.5,19.3-38.4,28.8c-2.1,1.5-2.8,3-2.3,5.5c2.3,11.4,4.2,22.9,6.3,34.3c0.2,0.9,0.6,1.8,1,3.2c1.4-0.2,2.6-0.5,3.7-0.6c13.2-0.7,26.5-1.3,39.7-2.1c4.5-0.3,5.9,1.5,5.8,5.8c-0.2,9.2-0.1,18.5,0,27.7c0,3.9-1.4,5.6-5.3,5.5c-9-0.3-18-0.1-27.7-0.1c0,8,0.5,15.7-0.2,23.2c-0.5,5.1,1.3,7.8,5.7,10.2c24.5,13.5,48.6,27.6,73,41.3c2.5,1.4,4.1,1.1,6.4-0.2c32.1-18.1,64.3-36.1,96.4-54.1c9.4-5.3,18.9-10.6,28.3-16c2.3-1.3,4.4-1.6,6.9-0.6c15.9,6.5,31.9,12.8,47.9,19.1c2.5,1,3.9,2.1,3.9,5.1c-0.1,13.6,0,27.2,0,40.8c0,0.8-0.1,1.7-0.1,2.7c-74.4,0-148.7,0-223.5,0c-1.2,9.8-2.5,19.3-3.7,29.1c58,0,115.9,0,174.2,0c0,1.8,0,3.2,0,4.5c0,21.6,0,43.2,0,64.8c0,1.4,0,2.9,0,4.8c-149.5,0-298.9,0-448.7,0c0-24.8,0-49.4,0-74.5c36.9,0,73.7,0,110.9,0c-0.6-4.8-1.2-9.2-1.7-13.8c-9.5-2.3-18.8-4.6-28.5-7c0-3,0-6.1,0-8.6c10.3-2.3,19.9-7.5,30.8-5.2c0.5-3.4,0.9-6.5,1.3-9.4c-3.2-2.4-6.6-2.1-10.1-1.6c-10.5,1.5-21,2.9-31.5,4.1c-2.9,0.3-4.6-0.1-5.5-3.2c-5.7-18.6-11.7-37.2-17.6-55.7c-0.5-1.5-0.9-2.9-1.7-5.2c-3.9,2.7-7.6,4.9-10.8,7.6c-16.4,13.5-32.6,27.3-48.9,40.9c-2.2,1.9-3.1,3.9-3.1,6.7c0.2,19.3,0.1,38.7,0.1,58c0,2.1,0,4.2,0,6.5c-12.8,0-25.1,0-37.9,0c0-21.7,0-43.3,0-65.3c-6.9,0-13.6,0-20.8,0c0-10.3,0-20.3,0-30.7c6.9,0,13.6,0,20.7,0c0-4.7,0-9,0-13.7c7.1,0,13.7,0,20.6,0c0-22.4,0-44.5,0-67.4c-8.8,0-17.8,0-27.6,0c-24.3,31.8-48.5,63.6-73.1,95.8c0,27.4,0,54.8,0,82.6c-87.3,0-174.4,0-261.7,0C4.5,425.4,4.5,256.7,4.5,88z M640.5,376.3c0,0.1,0,0.2,0,0.3c-21.2,0-42.5,0.1-63.7,0c-2.9,0-4.2,0.9-5.6,3.3c-8.3,14.8-16.8,29.4-25.3,44.1c-1.2,2-1.3,3.6-0.2,5.6c3.4,6.1,6.5,12.3,9.7,18.4c1.1,2.2,2.5,3.1,5,3.1c7.7-0.1,15.3-0.1,23,0c2.5,0,4.1-0.7,5.1-3.1c9.3-20.9,18.8-41.7,28.3-62.6C624,379.3,631.2,377,640.5,376.3z M745.7,223.2c-37.9,0-75.9-0.2-113.8,0.1c-11.6,0.1-20.1,7.3-22,18.5c-0.4,2.5-0.5,5.1-0.5,7.6c0,2,0.9,2.9,2.9,2.9c39.5,0,79,0,118.5,0c1.7,0,3.6,0.3,5.1-0.3c3.8-1.3,6.1-7.6,5.9-13.6C741.6,230.5,739.8,223.2,745.7,223.2z M633,362.2c14.6,0,29.2,0,44.7,0c0-18.5,0-36.8,0-55.1c-15,0-29.9,0-44.7,0C633,325.4,633,343.7,633,362.2z M731.2,362.3c14.9,0,29.5,0,44.5,0c0-18.5,0-36.8,0-55.2c-14.9,0-29.5,0-44.5,0C731.2,325.5,731.2,343.8,731.2,362.3z M730.9,293.4c14.7,0,29.3,0,44.5,0c0-11.5,0-22.8,0-34.1c-14.8,0-29.5,0-44.5,0C730.9,270.8,730.9,282,730.9,293.4z M633.2,293.3c14.5,0,29,0,44,0c0-11.5,0-22.9,0-34.3c-14.7,0-29.2,0-44,0C633.2,270.5,633.2,281.7,633.2,293.3z" />
          
          {/* North America - more accurate shape */}
          <ContinentSilhouette 
            d="M63.4,63.3c7.1,1.9,14.3,3.8,21.4,5.7c10.5,2.8,21,5.6,31.4,8.4c10.2,2.7,20.5,5.4,30.7,8.1c8.9,2.4,17.8,4.7,26.6,7.1c7.7,2,15.4,4.1,23.1,6.1c6.9,1.8,13.8,3.6,20.7,5.5c0.4,0.1,0.8,0.1,1.6,0.2c-3.6,4.5-6.9,8.7-10.3,12.9c-0.7,0.9-1.1,1.7-0.8,2.9c1.7,7.5,3.2,15.1,4.9,22.6c0.2,0.7,0.6,1.5,1.1,2c4.7,5.1,9.4,10.2,14.2,15.2c1.4,1.4,2.7,2.9,4.3,4.7c-3.2,0.5-6,0.9-8.8,1.3c-0.4,0.1-0.8,0.3-1.4,0.6c1.8,1.2,3.4,2.2,4.9,3.2c2.1,1.3,4.2,2.7,6.3,4c0.4,0.3,0.7,0.6,1.6,1.2c-3.5,1.8-6.9,3.4-10.2,5.2c-6.9,3.6-13.8,7.3-20.8,10.8c-4.7,2.4-9.6,4.6-14.4,6.8c-0.6,0.3-1.4,0.3-2.1,0.5c-5.6,1.3-11.1,2.7-16.7,3.9c-11.4,2.6-22.8,5-34.3,7.5c-7.2,1.6-14.5,3.2-21.8,4.7c-12.5,2.5-25.1,4.8-37.6,7.3c-6.9,1.4-13.8,2.9-20.7,4.4c-6.2,1.4-12.3,2.8-18.5,4.1c-7.1,1.4-14.3,2.8-21.3,4.2c7.9,3.2,15.7,6.3,23.6,9.4c9.9,3.9,19.8,7.9,29.8,11.8c6.9,2.7,13.8,5.5,20.7,8.2c3.2,1.3,6.5,2.6,10,3.9c-0.9,0.4-1.6,0.7-2.2,1c-11.9,5.3-23,11.3-33.2,19c-5.8,4.4-11.2,9.2-15.9,14.7c-3.5,4-6.6,8.2-8.8,13c-2,4.3-3.6,8.6-3.7,13.4c-0.1,3.3,0.2,6.5,0.8,9.7c1,4.9,3.5,9.1,6.2,13.2c4.7,7.1,10.6,13.1,17.2,18.4c8.8,7.1,18.5,12.3,29,16.2c8.2,3,16.6,5.3,25.1,7.3c9.8,2.3,19.8,3.8,29.8,4.9c9.5,1.1,19.1,1.4,28.7,1.4c12.7,0,25.5-0.6,38.1-2.1c13.9-1.7,27.6-4.2,41.1-7.7c14.6-3.8,28.9-8.4,42.2-15.3c4.9-2.5,9.7-5.3,14.1-8.6c3.8-2.8,7.2-6,10.2-9.7c2.8-3.4,5.2-7.1,7.1-11.1c1.7-3.5,3-7.2,3.6-11c0.8-5.2,1-10.5,0.1-15.7c-0.7-4.3-2.1-8.4-4.2-12.2c-3.6-6.7-8.5-12.4-14.1-17.5c-7.1-6.5-15-11.7-23.5-16.2c-11.1-5.8-22.6-10.5-34.5-14.3c-6.8-2.2-13.7-4.2-20.6-6.1c-6.9-1.9-13.9-3.7-21-5.3c-10.8-2.5-21.7-4.7-32.5-7c-8.9-1.9-17.9-3.8-26.8-5.7c-10.8-2.3-21.5-4.7-32.3-7c-0.6-0.1-1.3-0.3-2.2-0.5c0.5-0.5,0.8-0.8,1.1-1.1c9.6-9.6,19.3-19.2,28.9-28.9c1.5-1.5,2.3-3.1,2.4-5.2c0.1-3-0.2-5.9-0.6-8.9c-1.5-9.7-3.1-19.4-4.6-29.1c-1.3-8.3-2.5-16.6-3.8-24.9c-0.1-0.4-0.1-0.8-0.2-1.4c0.3-0.1,0.5-0.2,0.6-0.1c6.9,1.8,13.9,3.6,20.8,5.4c3.7,1,7.5,2,11.2,3c0.5,0.1,0.9,0.4,1.3,0.6c0.6,0.4,1.3,0.6,2,0.9c6.6,2.5,13.1,4.9,19.7,7.4C323,119.4,337.2,126,351.4,132.7"
            active={activeContinent === 'na'}
            hovered={hoveredContinent === 'na'}
            onClick={() => handleContinentClick('na')}
            onMouseEnter={() => setHoveredContinent('na')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* South America - accurate continental outline */}
          <ContinentSilhouette
            d="M240.1,320.3c2.3-2.6,4.5-5.1,6.6-7.7c1.4-1.7,2.9-3.4,4.2-5.2c3.6-4.9,7.1-9.8,10.6-14.8c4.4-6.2,8.8-12.5,13.2-18.7c4.5-6.4,9-12.7,13.4-19.1c3.3-4.7,6.6-9.4,9.8-14.2c3.6-5.3,7.1-10.8,10.6-16.2c1.9-2.9,3.8-5.8,5.7-8.7c0.3-0.4,0.5-0.8,0.8-1.2c0.2-0.2,0.5-0.4,0.8-0.5c0.3,0.2,0.6,0.4,0.8,0.7c0.8,1.2,1.6,2.5,2.3,3.8c2.1,3.9,4.2,7.8,6.3,11.7c1.6,3.1,3.2,6.2,4.8,9.3c0.3,0.6,0.7,1,1.3,1.4c6.4,3.4,12.8,6.8,19.2,10.2c3.8,2,7.6,4,11.4,6c0.9,0.5,1.8,0.5,2.8,0.4c2.5-0.4,4.9-0.9,7.4-1.3c10.6-1.7,21.3-3.5,31.9-5.3c4-0.7,8-1.5,12-2.2c1.5-0.3,2.6-0.9,3.3-2.3c1.4-2.7,2.9-5.3,4.4-7.9c0.3-0.5,0.6-1,1-1.5c0.3-0.5,0.7-0.9,1.1-1.4c2.5,3.3,4.9,6.4,7.3,9.5c0.5,0.7,1.1,1.4,1.8,2c3.1,2.7,6.2,5.5,9.3,8.1c1.2,1,2.6,1.9,4,2.6c6,3,12.1,6,18.2,8.9c0.6,0.3,1.1,0.8,1.5,1.3c1.1,1.4,2.1,2.9,3.1,4.3c0.8,1.2,1.7,2.4,2.8,3.2c2.5,1.8,5.2,3.4,7.7,5.1c0.8,0.5,1.7,1,2.4,1.6c0.5,0.5,1,1.2,1.1,1.9c0.3,3.5,0.5,7,0.7,10.6c0.1,1.1,0.1,2.2,0.1,3.3c-0.1,5.5-0.2,11-0.4,16.5c-0.1,2.6-0.3,5.3-0.5,7.9c-0.4,5.6-0.9,11.3-1.3,16.9c-0.4,6.3-0.8,12.6-1.3,18.8c-0.4,5.3-0.9,10.6-1.3,15.9c-0.4,4.7-0.7,9.4-1.1,14.1c-0.4,5.1-0.8,10.2-1.2,15.4c-0.3,4.2-0.5,8.5-0.9,12.7c-0.5,6.5-1,13-1.6,19.5c-0.3,3.8-0.7,7.7-1,11.5c-0.4,4.3-0.7,8.6-1.1,12.9c-0.4,4.3-0.9,8.5-1.3,12.8c-0.3,3.9-0.6,7.8-0.9,11.7c-0.3,3.5-0.5,7-0.9,10.5c-0.6,5.4-1.2,10.9-1.9,16.3c-0.2,1.9-0.7,3.8-1.1,5.7c-0.7,3-1.9,5.8-3.7,8.3c-2.7,3.7-5.9,6.9-9.7,9.5c-4.7,3.3-9.8,5.7-15.3,7.4c-5.9,1.8-11.8,3.1-17.9,4.1c-4.3,0.7-8.6,1.2-12.9,1.7c-4.2,0.5-8.5,0.7-12.8,1c-4.8,0.3-9.6,0.5-14.3,0.7c-3.9,0.1-7.8,0.2-11.7,0.3c-2.6,0.1-5.1,0.2-7.7,0.2c-4.3,0-8.5,0-12.8-0.4c-3.8-0.3-7.6-0.7-11.3-1.5c-3.7-0.7-7.3-1.9-10.6-3.7c-3.3-1.8-6-4.3-8.4-7.1c-2.3-2.7-4.1-5.7-5.3-9.1c-1.1-3.1-1.7-6.3-1.9-9.6c-0.3-4.5-0.5-9-0.7-13.5c-0.1-2.5-0.2-5.1-0.2-7.6c0-16.2,0-32.4,0-48.6c0-11.9,0-23.8,0-35.7c0-11.3,0-22.6,0-33.9c0-11.9,0-23.7,0-35.6c0-3.5,0-7,0-10.5c0-0.9,0-1.7,0-2.6c0-0.4,0.1-0.8,0.2-1.2c0.2,0,0.4,0,0.6-0.1c1.7-0.8,3.5-1.7,5.2-2.6c4.9-2.6,9.7-5.3,14.5-8c3.4-2,6.8-4,10.2-6c1-0.6,2-1.3,3-1.9c4.2-2.5,8.4-5.1,12.5-7.6c0.9-0.6,1.8-1.2,2.6-1.7c-0.2-0.4-0.4-0.6-0.6-0.9c-4.3-6.3-8.6-12.6-12.9-18.9c-2.4-3.5-4.8-7-7.2-10.5C240.1,321.3,240.1,320.9,240.1,320.3z"
            active={activeContinent === 'sa'}
            hovered={hoveredContinent === 'sa'}
            onClick={() => handleContinentClick('sa')}
            onMouseEnter={() => setHoveredContinent('sa')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Europe, Middle East & Africa - more accurate shape */}
          <ContinentSilhouette
            d="M541.4,69.5c-3.4,2.6-7.7,7.7-10.2,10.2s-11.1,6.8-12.8,6.8c-1.7,0-8.5,0-11.1,0s-10.2-2.6-12.8-2.6c-2.6,0-10.2-3.4-12.8-3.4s-9.4-2.6-12.8-2.6c-3.4,0-17,0-20.5,0c-3.4,0-13.6,0.9-17,1.7c-3.4,0.9-11.1,2.6-14.5,4.3c-3.4,1.7-9.4,6-12.8,7.7c-3.4,1.7-10.2,6-11.9,7.7c-1.7,1.7-4.3,6-6,8.5c-1.7,2.6-4.3,8.5-5.1,10.2c-0.9,1.7,1.7,6,1.7,7.7s1.7,5.1,1.7,6.8c0,1.7,0,17.9,0,19.6s-0.9,6-1.7,7.7c-0.9,1.7-5.1,0-7.7,0c-2.6,0-9.4,0-11.1,0c-1.7,0-7.7,0-9.4,0c-1.7,0-7.7,0-9.4,1.7c-1.7,1.7-6,6.8-7.7,8.5c-1.7,1.7-5.1,7.7-6,10.2c-0.9,2.6-2.6,11.1-2.6,13.6s0,11.1,0,14.5c0,3.4,1.7,13.6,1.7,17c0,3.4,0,15.3,0,18.7c0,3.4,0,15.3,0,18.7c0,3.4,0,15.3,0,18.7c0,3.4,0.9,13.6,0.9,17c0,3.4,0.9,12.8,0.9,16.2c0,3.4,1.7,12.8,1.7,17c0,4.3,1.7,14.5,1.7,17.9c0,3.4,0,12.8,0,16.2c0,3.4,0,11.9,0,15.3c0,3.4,0,11.9,0,15.3c0,3.4,0,11.9,0,15.3c0,3.4,0,11.9,0,15.3c0,3.4,0,11.9,0,15.3c0,3.4,0,11.9,0,15.3c0,3.4,0.9,11.9,0.9,15.3c0,3.4,0.9,11.9,0.9,15.3c0,3.4,0.9,11.9,0.9,15.3c0,3.4,1.7,11.9,1.7,15.3c0,3.4,1.7,11.9,1.7,15.3c0,3.4,1.7,11.1,1.7,14.5c0,3.4,1.7,10.2,1.7,13.6c0,3.4,1.7,10.2,1.7,13.6c0,3.4,1.7,9.4,1.7,12.8c0,3.4,1.7,9.4,1.7,12.8c0,3.4,1.7,8.5,1.7,11.9c0,3.4,1.7,8.5,1.7,11.9c0,3.4,1.7,7.7,1.7,11.1c0,3.4,1.7,7.7,1.7,11.1c0,3.4,1.7,6.8,1.7,10.2c0,3.4,1.7,6.8,1.7,10.2c0,3.4,1.7,6,1.7,9.4c0,3.4,1.7,6,1.7,9.4c0,3.4,1.7,5.1,1.7,8.5c0,3.4,1.7,5.1,1.7,8.5c0,3.4,1.7,4.3,1.7,7.7c0,3.4,1.7,4.3,1.7,7.7c0,3.4,1.7,3.4,1.7,6.8c0,3.4,1.7,3.4,1.7,6.8c0,3.4,0.9,1.7,6,5.1c5.1,3.4,13.6,6,17,6.8c3.4,0.9,16.2,2.6,19.6,2.6c3.4,0,11.1,0,14.5,0c3.4,0,8.5,0,11.9,0c3.4,0,7.7,0,11.1,0c3.4,0,6.8,0,10.2,0c3.4,0,6.8,0,10.2,0c3.4,0,6,0,9.4,0c3.4,0,6,0,9.4,0c3.4,0,5.1,0,8.5,0c3.4,0,5.1,0,8.5,0c3.4,0,4.3,0,7.7,0c3.4,0,4.3,0,7.7,0c3.4,0,3.4,0,6.8,0c3.4,0,3.4,0,6.8,0c3.4,0,3.4,0,6.8,0c3.4,0,2.6,0,6,0c3.4,0,2.6,0,6,0c3.4,0,1.7,0,5.1,0c3.4,0,1.7,0,5.1,0c3.4,0,0.9,0,4.3,0c3.4,0,0.9,0,4.3,0c3.4,0,6.8-3.4,10.2-5.1c3.4-1.7,6.8-6,10.2-7.7c3.4-1.7,6.8-7.7,10.2-9.4c3.4-1.7,6.8-8.5,10.2-10.2c3.4-1.7,6.8-8.5,8.5-10.2c1.7-1.7,5.1-7.7,6.8-9.4c1.7-1.7,4.3-7.7,6-9.4c1.7-1.7,3.4-7.7,5.1-9.4c1.7-1.7,2.6-7.7,4.3-9.4c1.7-1.7,2.6-7.7,3.4-9.4c0.9-1.7,1.7-7.7,3.4-10.2c1.7-2.6,0.9-8.5,1.7-11.1c0.9-2.6,0.9-9.4,0.9-12.8c0-3.4,0-10.2,0-13.6c0-3.4,0-11.1,0-14.5c0-3.4,0-11.1,0-14.5c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4,0-11.9,0-15.3c0-3.4-0.9-11.9-0.9-15.3c0-3.4-0.9-11.9-0.9-15.3c0-3.4-0.9-11.9-0.9-15.3c0-3.4-0.9-11.9-0.9-15.3c0-3.4-0.9-11.9-0.9-15.3c0-3.4-0.9-11.9-0.9-15.3c0-3.4-1.7-11.9-1.7-15.3c0-3.4-1.7-11.9-1.7-15.3c0-3.4-1.7-11.9-1.7-15.3c0-3.4-1.7-11.9-1.7-15.3c0-3.4-1.7-11.1-1.7-14.5c0-3.4-1.7-11.1-1.7-14.5c0-3.4-1.7-10.2-1.7-13.6c0-3.4-2.6-10.2-2.6-13.6c0-3.4-2.6-9.4-2.6-12.8c0-3.4-2.6-9.4-2.6-12.8c0-3.4-3.4-8.5-3.4-11.9c0-3.4-3.4-8.5-3.4-11.9c0-3.4-3.4-7.7-3.4-11.1c0-3.4-3.4-6.8-3.4-10.2s-3.4-6-3.4-9.4c0-3.4-3.4-5.1-3.4-8.5c0-3.4-3.4-4.3-3.4-7.7c0-3.4-3.4-3.4-3.4-6.8c0-3.4-3.4-2.6-3.4-6c0-3.4-3.4-1.7-3.4-5.1c0-3.4-3.4-0.9-3.4-4.3s-2.6,1.7-6,0c-3.4-1.7-7.7-4.3-11.1-6c-3.4-1.7-8.5-3.4-11.9-5.1c-3.4-1.7-9.4-2.6-12.8-4.3c-3.4-1.7-10.2-1.7-13.6-3.4c-3.4-1.7-10.2-0.9-13.6-2.6c-3.4-1.7-11.1,0-13.6-1.7c-2.6-1.7-11.1,0.9-12.8-0.9C544.9,64.5,543.2,67.9,541.4,69.5z"
            active={activeContinent === 'emea'}
            hovered={hoveredContinent === 'emea'}
            onClick={() => handleContinentClick('emea')}
            onMouseEnter={() => setHoveredContinent('emea')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Asia Pacific - more accurate shape */}
          <ContinentSilhouette
            d="M631.9,75.5c1.7,1.7,10.2,5.1,12.8,6.8c2.6,1.7,11.1,4.3,14.5,6c3.4,1.7,11.9,4.3,15.3,6c3.4,1.7,13.6,5.1,16.2,5.1c2.6,0,11.9,1.7,15.3,1.7c3.4,0,12.8,0.9,16.2,0.9c3.4,0,12.8,0,16.2,0c3.4,0,11.9-0.9,15.3-0.9c3.4,0,11.9-0.9,15.3-0.9c3.4,0,11.1-0.9,14.5-0.9c3.4,0,11.1-0.9,14.5-0.9c3.4,0,10.2-0.9,13.6-0.9c3.4,0,10.2-0.9,13.6-0.9c3.4,0,9.4-0.9,12.8-0.9c3.4,0,9.4-0.9,12.8-0.9c3.4,0,8.5-0.9,11.9-0.9c3.4,0,8.5-0.9,11.9-0.9c3.4,0,7.7-0.9,11.1-0.9c3.4,0,7.7-0.9,11.1-0.9c3.4,0,6.8-0.9,10.2-0.9c3.4,0,6.8-0.9,10.2-0.9c3.4,0,6-0.9,9.4-0.9c3.4,0,5.1-0.9,8.5-0.9c3.4,0,5.1-0.9,8.5-0.9c3.4,0,4.3-0.9,7.7-0.9s3.4-0.9,7.7-0.9c4.3,0,2.6-0.9,6-0.9c3.4,0,1.7-0.9,5.1-0.9c3.4,0,0.9-0.9,4.3-0.9c3.4,0,0-0.9,3.4-1.7c3.4-0.9-0.9-1.7,2.6-2.6c3.4-0.9-1.7-1.7,1.7-3.4c3.4-1.7-2.6-2.6,0.9-4.3c3.4-1.7-3.4-2.6,0-5.1c3.4-2.6-4.3-3.4-0.9-6c3.4-2.6-5.1-3.4-1.7-6.8c3.4-3.4-4.3-2.6-2.6-7.7c1.7-5.1-3.4-2.6-3.4-8.5c0-6-1.7-1.7-3.4-8.5c-1.7-6.8-1.7-1.7-6-10.2c-4.3-8.5-1.7-2.6-7.7-11.9c-6-9.4-2.6-3.4-9.4-13.6c-6.8-10.2-2.6-3.4-9.4-12.8c-6.8-9.4-0.9-0.9-6-6.8c-5.1-5.9-14.5-4.3-20.5-6.8c-6-2.6-6,5.1-20.5,5.1c-14.5,0-11.9,0-23.5,0c-11.9,0-10.2,0-23.5,0c-13.6,0-11.9,0-26.1,0c-14.5,0-12.8,0-27.8,0c-15.3,0-13.6,0-29.6,0c-16.2,0-14.5,0-31.3,0c-17,0-15.3,0-33,0c-17.9,0-15.3,0-33,0c-17.9,0-11.9,1.7-25.2,1.7c-13.6,0-6.8,0-15.3,1.7c-8.5,1.7-3.4,0.9-6.8,1.7c-3.4,0.9-2.6,5.1-3.4,6.8c-0.9,1.7-2.6,6.8-3.4,8.5c-0.9,1.7-3.4,6.8-4.3,8.5c-0.9,1.7-3.4,6-4.3,7.7c-0.9,1.7-3.4,5.1-4.3,6.8c-0.9,1.7-2.6,4.3-3.4,6c-0.9,1.7-1.7,3.4-2.6,5.1c-0.9,1.7-0.9,2.6-1.7,4.3c-0.9,1.7,0,1.7-0.9,3.4c-0.9,1.7,0.9,0.9,0,2.6c-0.9,1.7,1.7,0,0.9,1.7c-0.9,1.7,2.6-0.9,1.7,0.9c-0.9,1.7,3.4-0.9,3.4,0.9"
            active={activeContinent === 'ap'}
            hovered={hoveredContinent === 'ap'}
            onClick={() => handleContinentClick('ap')}
            onMouseEnter={() => setHoveredContinent('ap')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Country dots */}
          {countryDots.map(dot => (
            <g key={dot.id}>
              {/* Shadow effect for dots */}
              <circle 
                cx={dot.x}
                cy={dot.y}
                r={6}
                fill="rgba(0,0,0,0.3)"
                transform="translate(1,1)"
              />
              {/* Main dot */}
              <CountryDot
                as={Link}
                to={`/country/${dot.code.toLowerCase()}`} 
                cx={dot.x}
                cy={dot.y}
                r={5}
                fill={dot.color}
                onMouseEnter={(e) => handleDotMouseEnter(e, dot)}
                onMouseLeave={handleDotMouseLeave}
              >
                <title>{dot.name}</title>
              </CountryDot>
            </g>
          ))}
        </SVGMap>

        {/* Country tooltip */}
        <DotTooltip 
          ref={tooltipRef}
          className={tooltipInfo.visible ? 'visible' : ''}
          style={{ 
            left: `${tooltipInfo.x}px`, 
            top: `${tooltipInfo.y}px` 
          }}
        >
          {tooltipInfo.country && (
            <>
              <TooltipTitle>{tooltipInfo.country.name}</TooltipTitle>
              <TooltipContent>
                Category: {tooltipInfo.country.category}
              </TooltipContent>
            </>
          )}
        </DotTooltip>

        
        <MapStats>
          <StatItem>
            <StatLabel>Countries in total</StatLabel>
            <StatValue>150+</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Crypto friendly countries</StatLabel>
            <StatValue>900+</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Excellent countries</StatLabel>
            <StatValue>23</StatValue>
          </StatItem>
        </MapStats>
      </MapWrapper>

      
      <MapLegend>
        <ColorLegendItem>
          <ColorDot color="#4ab800" />
          <LegendText>Excellent</LegendText>
        </ColorLegendItem>
        <ColorLegendItem>
          <ColorDot color="#a8ff82" />
          <LegendText>Favorable</LegendText>
        </ColorLegendItem>
        <ColorLegendItem>
          <ColorDot color="#f8fe85" />
          <LegendText>Moderate</LegendText>
        </ColorLegendItem>
        <ColorLegendItem>
          <ColorDot color="#ffbd67" />
          <LegendText>Restrictive</LegendText>
        </ColorLegendItem>
        <ColorLegendItem>
          <ColorDot color="#ff6464" />
          <LegendText>Not Favorable</LegendText>
        </ColorLegendItem>
      </MapLegend>
    </MapContainer>
  );
};

const GlobeIcon = styled.div`
width: 20px;
height: 20px;
border-radius: 50%;
border: 1px solid #666;
position: relative;

&::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #666;
}

&::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #666;
}
`;



// Styled components for the world map
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f7;
  border-radius: 8px;
  overflow: hidden;

@media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 576px) {
    height: 350px;
  }
`;



const ContinentLegend = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 250px;

  @media (max-width: 768px) {
    max-width: 200px;
    padding: 10px;
  }
  
  @media (max-width: 576px) {
    max-width: 180px;
    top: 10px;
    left: 10px;
    font-size: 12px;
    
    ${GlobeIcon} {
      width: 16px;
      height: 16px;
    }
  }
`;

const LegendTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  text-transform: uppercase;
`;


const ContinentButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  padding: 8px 5px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: all 0.2s ease;
  border-radius: 4px;
  text-align: left;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  ${({ active }) => active && `
    background-color: #000066;
    color: white;
    font-weight: 500;
    
    ${GlobeIcon} {
      border-color: white;
      
      &::before, &::after {
        background-color: white;
      }
    }
  `}
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SVGMap = styled.svg`
  width: 100%;
  height: 100%;
  display: block;
`;

const CountryDot = styled.circle`
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  
  &:hover {
    transform: scale(1.5);
    opacity: 0.8;
  }
`;

const MapStats = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  z-index: 5;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #333;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #000066;
`;

const MapLegend = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ColorLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorDot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const LegendText = styled.div`
  font-size: 14px;
  color: #333;
`;

// Now let's add the continent silhouettes

const ContinentSilhouette = styled.path`
  fill: ${props => props.active ? '#000066' : props.hovered ? '#0000AA' : '#000033'};
  stroke: ${props => props.active ? '#3333AA' : 'none'};
  stroke-width: 1;
  transition: fill 0.3s ease;
  cursor: pointer;
  
  &:hover {
    fill: ${props => props.active ? '#000066' : '#0000AA'};
  }
`;

// Background silhouette for the entire world
const WorldSilhouette = styled.path`
  fill: #EAEAEA;
  stroke: #D0D0D0;
  stroke-width: 0.5;
`;



// Add these additional styled components

const DotTooltip = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  padding: 10px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  transform: translate(-50%, -100%);
  margin-top: -10px;
  z-index: 100;
  opacity: 0;
  transition: opacity 0.2s ease;
  max-width: 250px;
  
  &.visible {
    opacity: 1;
  }
`;

const TooltipTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 5px;
`;

const TooltipContent = styled.div`
  font-size: 12px;
  color: #666;
`;

const ViewMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 30px;
  background: none;
  border: 1px solid #000066;
  color: #000066;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #000066;
    color: white;
  }
`;

export default WorldMap;