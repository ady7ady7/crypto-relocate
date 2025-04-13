// https://upload.wikimedia.org/wikipedia/commons/9/95/Continents.svg

// frontend/src/components/WorldMap.js
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
    all: { name: 'All Regions', countries: [] },
    eu: { name: 'Europe', countries: [] },
    as: { name: 'Asia', countries: [] },
    na: { name: 'North America', countries: [] },
    sa: { name: 'South America', countries: [] },
    af: { name: 'Africa', countries: [] },
    oc: { name: 'Oceania', countries: [] }
  };
  
  // Map country codes to continents
  const countryToContinentMap = {
    // Europe
    'GB': 'eu', 'FR': 'eu', 'DE': 'eu', 'IT': 'eu', 'ES': 'eu', 
    'PT': 'eu', 'CH': 'eu', 'AT': 'eu', 'BE': 'eu', 'NL': 'eu',
    'SE': 'eu', 'NO': 'eu', 'DK': 'eu', 'FI': 'eu', 'IE': 'eu',
    'GR': 'eu', 'PL': 'eu', 'CZ': 'eu', 'HU': 'eu', 'RO': 'eu',
    'BG': 'eu', 'HR': 'eu', 'SI': 'eu', 'SK': 'eu', 'MT': 'eu',
    'CY': 'eu', 'LU': 'eu', 'LI': 'eu', 'MC': 'eu', 'IE': 'eu',
    
    // Asia
    'CN': 'as', 'JP': 'as', 'KR': 'as', 'IN': 'as', 'SG': 'as',
    'MY': 'as', 'ID': 'as', 'TH': 'as', 'VN': 'as', 'PH': 'as',
    'AE': 'as', 'SA': 'as', 'IL': 'as', 'TR': 'as', 'HK': 'as',
    'RU': 'as', 'KZ': 'as', 'UZ': 'as', 'IR': 'as', 'IQ': 'as',
    
    // North America
    'US': 'na', 'CA': 'na', 'MX': 'na', 'CR': 'na', 'PA': 'na',
    'SV': 'na', 'GT': 'na', 'HN': 'na', 'NI': 'na', 'BS': 'na',
    'CU': 'na', 'DO': 'na', 'HT': 'na', 'JM': 'na', 'PR': 'na',
    
    // South America
    'BR': 'sa', 'AR': 'sa', 'CL': 'sa', 'CO': 'sa', 'PE': 'sa', 
    'VE': 'sa', 'EC': 'sa', 'BO': 'sa', 'PY': 'sa', 'UY': 'sa',
    'GY': 'sa', 'SR': 'sa', 'GF': 'sa',
    
    // Africa
    'ZA': 'af', 'EG': 'af', 'NG': 'af', 'KE': 'af', 'MA': 'af',
    'GH': 'af', 'TZ': 'af', 'DZ': 'af', 'TN': 'af', 'ET': 'af',
    'MU': 'af', 'SC': 'af', 'NA': 'af', 'BW': 'af', 'ZW': 'af',
    
    // Oceania
    'AU': 'oc', 'NZ': 'oc', 'FJ': 'oc', 'PG': 'oc', 'SB': 'oc',
    'VU': 'oc', 'WS': 'oc', 'TO': 'oc', 'KI': 'oc', 'MH': 'oc',
    'TV': 'oc', 'NR': 'oc', 'PW': 'oc'
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
  
  // Generate positions for country dots within the active continent
  const generateCountryDots = (countriesForContinent) => {
    // Define continent bounding boxes for dot placement
    const continentBounds = {
      all: { x1: 50, y1: 50, x2: 950, y2: 550 },
      eu: { x1: 450, y1: 80, x2: 550, y2: 200 },
      as: { x1: 600, y1: 100, x2: 850, y2: 300 },
      na: { x1: 100, y1: 100, x2: 350, y2: 250 },
      sa: { x1: 200, y1: 350, x2: 400, y2: 550 },
      af: { x1: 400, y1: 250, x2: 550, y2: 450 },
      oc: { x1: 800, y1: 350, x2: 950, y2: 500 }
    };
    
    const bounds = continentBounds[activeContinent] || continentBounds.all;
    
    // Generate dots with positions within bounds
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

  // Tooltip handler function
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
          <WorldSilhouette d=".public/Continents.svg" />  
          
          {/* Europe */}
          <ContinentSilhouette 
            d=""  
            active={activeContinent === 'eu'}
            hovered={hoveredContinent === 'eu'}
            onClick={() => handleContinentClick('eu')}
            onMouseEnter={() => setHoveredContinent('eu')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Asia */}
          <ContinentSilhouette 
            d="M0 0"  
            active={activeContinent === 'as'}
            hovered={hoveredContinent === 'as'}
            onClick={() => handleContinentClick('as')}
            onMouseEnter={() => setHoveredContinent('as')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* North America */}
          <ContinentSilhouette 
            d="M0 0"  
            active={activeContinent === 'na'}
            hovered={hoveredContinent === 'na'}
            onClick={() => handleContinentClick('na')}
            onMouseEnter={() => setHoveredContinent('na')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* South America */}
          <ContinentSilhouette 
            d="M0 0" 
            active={activeContinent === 'sa'}
            hovered={hoveredContinent === 'sa'}
            onClick={() => handleContinentClick('sa')}
            onMouseEnter={() => setHoveredContinent('sa')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Africa */}
          <ContinentSilhouette 
            d="M0 0"  
            active={activeContinent === 'af'}
            hovered={hoveredContinent === 'af'}
            onClick={() => handleContinentClick('af')}
            onMouseEnter={() => setHoveredContinent('af')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Oceania */}
          <ContinentSilhouette 
            d="M0 0" 
            active={activeContinent === 'oc'}
            hovered={hoveredContinent === 'oc'}
            onClick={() => handleContinentClick('oc')}
            onMouseEnter={() => setHoveredContinent('oc')}
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
                <strong>Rank:</strong> #{tooltipInfo.country.rank} ({tooltipInfo.country.category})
                <br />
                <strong>Capital Gains Tax:</strong> {tooltipInfo.country.capitalGainsTax}
              </TooltipContent>
            </>
          )}
        </DotTooltip>

        <MapStats>
          <StatItem>
            <StatLabel>Countries Ranked</StatLabel>
            <StatValue>89</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Crypto-Friendly</StatLabel>
            <StatValue>26</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>Tax-Free</StatLabel>
            <StatValue>12</StatValue>
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
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  z-index: 5;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    bottom: 20px;
    left: 20px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 576px) {
    padding: 6px 10px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #333;
  
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #000066;
  
  @media (max-width: 576px) {
    font-size: 20px;
  }
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
  
  @media (max-width: 576px) {
    padding: 10px;
    bottom: 10px;
    right: 10px;
  }
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
  
  @media (max-width: 576px) {
    width: 12px;
    height: 12px;
  }
`;

const LegendText = styled.div`
  font-size: 14px;
  color: #333;
  
  @media (max-width: 576px) {
    font-size: 12px;
  }
`;

// Continent silhouettes
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

// Tooltip components
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

export default WorldMap;