// WorldMap.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategoryColor } from './styles/Colors';

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
      
  
// CONTINUED - Part 3

// In the WorldMap component, replace the commented sections with the following:

// Update the return statement to include the continent silhouettes
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
      
      <MapWrapper>
        <SVGMap 
          viewBox="0 0 1000 600" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background world map silhouette */}
          <WorldSilhouette d="M170,220 L190,180 L220,170 L250,160 L300,150 L350,160 L380,180 L400,200 L410,220 L420,240 L440,250 L470,260 L500,270 L520,280 L540,290 L580,290 L620,280 L650,270 L680,260 L720,240 L760,210 L790,190 L820,180 L850,170 L880,160 L910,170 L930,180 L950,200 L960,230 L950,260 L940,280 L930,300 L910,320 L890,340 L870,360 L840,380 L810,400 L780,420 L750,430 L720,440 L690,450 L650,460 L610,470 L570,475 L530,480 L490,475 L450,470 L410,460 L370,450 L340,440 L310,430 L280,410 L250,390 L220,370 L200,350 L180,330 L160,310 L150,290 L140,270 L150,250 L170,220Z" />
          
          {/* North America */}
          <ContinentSilhouette 
            d="M170,220 L190,180 L220,170 L250,160 L300,150 L350,160 L380,180 L400,200 L410,220 L400,240 L380,250 L350,260 L310,270 L260,260 L220,250 L190,240 L170,220Z"
            active={activeContinent === 'na'}
            hovered={hoveredContinent === 'na'}
            onClick={() => handleContinentClick('na')}
            onMouseEnter={() => setHoveredContinent('na')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Latin America */}
          <ContinentSilhouette
            d="M250,260 L280,280 L310,310 L330,340 L350,380 L370,420 L380,460 L370,500 L350,530 L330,550 L310,560 L290,550 L270,530 L260,500 L250,460 L240,410 L230,350 L240,300 L250,260Z"
            active={activeContinent === 'sa'}
            hovered={hoveredContinent === 'sa'}
            onClick={() => handleContinentClick('sa')}
            onMouseEnter={() => setHoveredContinent('sa')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Europe, Middle East & Africa */}
          <ContinentSilhouette
            d="M450,150 L480,160 L510,170 L540,180 L570,200 L590,230 L600,260 L610,300 L620,340 L630,380 L635,420 L630,460 L620,500 L590,520 L550,540 L510,550 L470,540 L440,520 L410,490 L390,450 L380,410 L390,370 L410,330 L430,290 L450,250 L460,210 L450,150Z"
            active={activeContinent === 'emea'}
            hovered={hoveredContinent === 'emea'}
            onClick={() => handleContinentClick('emea')}
            onMouseEnter={() => setHoveredContinent('emea')}
            onMouseLeave={() => setHoveredContinent(null)}
          />
          
          {/* Asia Pacific */}
          <ContinentSilhouette
            d="M650,180 L680,170 L710,160 L740,150 L770,160 L800,170 L830,190 L850,220 L860,250 L870,280 L880,310 L890,340 L880,370 L860,400 L830,420 L790,430 L750,420 L720,400 L700,370 L690,330 L680,290 L670,250 L660,210 L650,180Z"
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



// CONTINUED

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

