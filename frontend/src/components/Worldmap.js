import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Tooltip, Marker } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { getCategoryColor, getColorByRank, CategoryDefinitions, Colors } from './styles/Colors';


// Styled components for the UI
const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ContinentSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.secondaryBackground || '#1E1E1E'};
  border-radius: 8px 8px 0 0;
  margin-bottom: -1px;
  flex-wrap: wrap;
`;

const ContinentButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? props.theme.colors.accent || '#F7931A' : 'transparent'};
  color: ${props => props.active ? '#fff' : props.theme.colors.text || '#fff'};
  border: 1px solid ${props => props.active ? props.theme.colors.accent || '#F7931A' : props.theme.colors.border || '#2D2D2D'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 4px;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.accentHover || '#E78318' : 'rgba(247, 147, 26, 0.1)'};
  }
`;

const StatsTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(30, 30, 30, 0.95);
  border: 1px solid ${({ theme }) => theme.colors.border || '#2D2D2D'};
  border-radius: 4px;
  padding: 10px;
  width: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1000;
  text-align: left;
  margin-bottom: 8px;
  
  ${ContinentButton}:hover & {
    opacity: 1;
  }
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .stat-name {
    color: ${props => props.color};
    font-weight: 500;
  }
  
  .stat-value {
    color: #fff;
  }
`;

const RegionalInsight = styled.div`
  font-size: 11px;
  color: #bbb;
  margin-top: 6px;
  border-top: 1px solid #444;
  padding-top: 6px;
`;

// Updated styled components for legend
const LegendContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(30, 30, 30, 0.85);
  border: 1px solid ${({ theme }) => theme.colors.border || '#2D2D2D'};
  border-radius: 4px;
  padding: 8px 10px;
  z-index: 1000;
  width: auto;
  max-width: 160px;
  
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    max-width: 120px;
    padding: 6px 8px;
  }
  
  @media (max-width: 480px) {
    max-width: 100px;
    padding: 4px 6px;
  }
`;

const LegendTitle = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 12px;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 11px;
    margin-bottom: 4px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    margin-bottom: 3px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 11px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 10px;
    margin-bottom: 3px;
  }
  
  @media (max-width: 480px) {
    font-size: 9px;
    margin-bottom: 2px;
  }
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${props => props.color};
  margin-right: 6px;
  
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  
  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
    margin-right: 4px;
  }
`;

const StyledMapContainer = styled(MapContainer)`
  height: 500px;
  width: 100%;
  background-color: #121212;
  border-radius: 0 0 8px 8px;
  
  .leaflet-container {
    background-color: #121212;
  }
  
  .country-tooltip {
    background-color: rgba(24, 24, 24, 0.95);
    border: 1px solid #444;
    border-radius: 4px;
    padding: 8px;
    font-size: 12px;
    color: #f0f0f0; /* Light text color for better readability */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

// MapController component to handle map view changes
function MapController({ continent }) {
  const map = useMap();
  
  // Define continent boundaries and zoom levels
  const continentViews = {
    world: { center: [20, 10], zoom: 2 },
    europe: { center: [50, 10], zoom: 4 },
    northAmerica: { center: [40, -95], zoom: 3 },
    southAmerica: { center: [-20, -60], zoom: 3 },
    asia: { center: [30, 90], zoom: 3 },
    africa: { center: [0, 20], zoom: 3 },
    oceania: { center: [-25, 135], zoom: 3.5 }
  };
  
  useEffect(() => {
    const view = continentViews[continent];
    if (view) {
      map.flyTo(view.center, view.zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [continent, map]);
  
  return null;
}

// Map Legend component
function MapLegend() {
  return (
    <LegendContainer>
      <LegendTitle>Crypto-Friendliness</LegendTitle>
      <LegendItem>
        <LegendColor color={Colors.countryExcellent} />
        <span>Excellent</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={Colors.countryFavorable} />
        <span>Favorable</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={Colors.countryModerate} />
        <span>Moderate</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={Colors.countryRestrictive} />
        <span>Restrictive</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={Colors.countryNotFavorable} />
        <span>Not favorable</span>
      </LegendItem>
    </LegendContainer>
  );
}

// Update regionalInsights based on the top ranked countries in each region from your data
const regionalInsights = {
  world: {
    topCountry: "United Arab Emirates", // Rank 1 in your data
    keyTrend: "CARF implementation for 48+ countries by 2026"
  },
  europe: {
    topCountry: "Switzerland", // Top European country
    keyTrend: "MiCA regulations implementation by 2025"
  },
  asia: {
    topCountry: "United Arab Emirates", // Top Asian/Middle Eastern country
    keyTrend: "FATF Travel Rule adoption for cross-border transfers"
  },
  northAmerica: {
    topCountry: "El Salvador", // Top North American country
    keyTrend: "FIT Act may classify crypto as commodities vs. securities"
  },
  southAmerica: {
    topCountry: "Paraguay", // Top South American country
    keyTrend: "Brazil leads in regulated crypto ETFs and adoption"
  },
  africa: {
    topCountry: "Mauritius", // Top African country (rank 8)
    keyTrend: "Nigeria proposing 7.5% VAT on crypto services"
  },
  oceania: {
    topCountry: "Palau", // Top Oceanian country (rank 23)
    keyTrend: "Australia implementing FIFO accounting rules for traders"
  }
};

// Comprehensive country-to-continent mapping (greatly expanded from research)
const countryToContinentMap = {
  // Europe (expanded from European research document)
  'CH': 'europe', 'MT': 'europe', 'PT': 'europe', 'DE': 'europe', 'GB': 'europe', 'FR': 'europe', 'IT': 'europe',
  'ES': 'europe', 'NL': 'europe', 'BE': 'europe', 'SE': 'europe', 'DK': 'europe', 'FI': 'europe', 'NO': 'europe',
  'IE': 'europe', 'AT': 'europe', 'GR': 'europe', 'PL': 'europe', 'CZ': 'europe', 'HU': 'europe', 'RO': 'europe',
  'SI': 'europe', 'EE': 'europe', 'HR': 'europe', 'BG': 'europe', 'SK': 'europe', 'LV': 'europe', 'LT': 'europe',
  'CY': 'europe', 'LU': 'europe', 'IS': 'europe', 'GE': 'europe', 'MC': 'europe', 'RS': 'europe', 'LI': 'europe',
  
  // Asia (comprehensive list from Asian research document)
  'AE': 'asia', 'SG': 'asia', 'JP': 'asia', 'KR': 'asia', 'MY': 'asia', 'TH': 'asia', 'TR': 'asia', 'IN': 'asia',
  'ID': 'asia', 'VN': 'asia', 'PH': 'asia', 'SA': 'asia', 'QA': 'asia', 'IL': 'asia', 'KZ': 'asia', 'HK': 'asia',
  'BN': 'asia', 'MM': 'asia', 'LK': 'asia', 'KW': 'asia', 'KH': 'asia', 'OM': 'asia', 'JO': 'asia', 'LB': 'asia',
  'AM': 'asia', 'AZ': 'asia', 'BT': 'asia', 'CN': 'asia', 'IR': 'asia', 'IQ': 'asia', 'KP': 'asia',
  
  // North America (expanded with Caribbean nations)
  'US': 'northAmerica', 'USA': 'northAmerica', 'CA': 'northAmerica', 'MX': 'northAmerica', 'PA': 'northAmerica', 'BS': 'northAmerica',
  'CR': 'northAmerica', 'SV': 'northAmerica', 'GT': 'northAmerica', 'HN': 'northAmerica', 'NI': 'northAmerica',
  'JM': 'northAmerica', 'DO': 'northAmerica', 'CU': 'northAmerica', 'HT': 'northAmerica', 'BZ': 'northAmerica',
  'BB': 'northAmerica', 'LC': 'northAmerica', 'AG': 'northAmerica', 'KY': 'northAmerica', 'TT': 'northAmerica',
  
  // South America (all countries from South American research)
  'BR': 'southAmerica', 'AR': 'southAmerica', 'CO': 'southAmerica', 'CL': 'southAmerica', 'PE': 'southAmerica',
  'UY': 'southAmerica', 'EC': 'southAmerica', 'BO': 'southAmerica', 'PY': 'southAmerica', 'VE': 'southAmerica',
  'GY': 'southAmerica', 'SR': 'southAmerica', 'GF': 'southAmerica',
  
  // Africa (comprehensive list from African research document)
  'ZA': 'africa', 'EG': 'africa', 'NG': 'africa', 'KE': 'africa', 'MA': 'africa', 'GH': 'africa', 'TZ': 'africa',
  'UG': 'africa', 'RW': 'africa', 'ET': 'africa', 'MU': 'africa', 'SC': 'africa', 'NA': 'africa', 'ZW': 'africa',
  'CM': 'africa', 'CI': 'africa', 'SN': 'africa', 'TN': 'africa', 'DZ': 'africa', 'AO': 'africa', 'MZ': 'africa',
  'ZM': 'africa', 'BW': 'africa', 'GA': 'africa', 'CD': 'africa', 'SD': 'africa', 'ML': 'africa', 'BF': 'africa',
  
  // Oceania (based on Oceanian research document)
  'AU': 'oceania', 'NZ': 'oceania', 'FJ': 'oceania', 'PG': 'oceania', 'SB': 'oceania', 'VU': 'oceania',
  'WS': 'oceania', 'TO': 'oceania', 'KI': 'oceania', 'MH': 'oceania', 'TV': 'oceania', 'NR': 'oceania',
  'PW': 'oceania', 'CK': 'oceania', 'NU': 'oceania'
};

// Norway mainland position for custom marker
const NORWAY_POSITION = [64.5, 15]; // Coordinates for mainland Norway

const WorldMap = ({ countries }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('world');
  const [continentStats, setContinentStats] = useState({});
  const [norwegianData, setNorwegianData] = useState(null);
  
  // Fetch GeoJSON data
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        // Clean world map without labels
        const response = await axios.get(
          'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        );
        setGeoJsonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch GeoJSON data:', error);
        setLoading(false);
      }
    };
    
    fetchGeoData();
  }, []);

  // Extract Norway data when countries or geoJsonData change
  useEffect(() => {
    if (countries && countries.length > 0) {
      const norway = countries.find(country => country.code === 'NO');
      if (norway) {
        setNorwegianData(norway);
      }
    }
  }, [countries]);
  
  // Calculate statistics for each continent based on all research
  useEffect(() => {
    if (countries && countries.length > 0) {
      // Initialize stats for excellent, favorable, moderate, restrictive, notFavorable
      const categoryRanges = {
        excellent: { min: 1, max: 10 },
        favorable: { min: 11, max: 33 },
        moderate: { min: 34, max: 62 },
        restrictive: { min: 63, max: 78 },
        notFavorable: { min: 79, max: Infinity }
      };
      
      const stats = {
        world: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        europe: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        northAmerica: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        southAmerica: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        asia: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        africa: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        oceania: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 }
      };
      
      // Count countries in each category per continent
      countries.forEach(country => {
        const rank = parseInt(country.rank);
        let category = 'notFavorable';
        
        // Determine category based on rank ranges
        for (const [cat, range] of Object.entries(categoryRanges)) {
          if (rank >= range.min && rank <= range.max) {
            category = cat;
            break;
          }
        }
        
        // Use both US and USA for United States
        let continent = countryToContinentMap[country.code] || 'world';
        
        // Increment global count
        stats.world[category]++;
        
        // Increment continent count
        if (continent !== 'world') {
          stats[continent][category]++;
        }
      });
      
      setContinentStats(stats);
    }
  }, [countries]);

  // Style function for GeoJSON features - updated with comprehensive categorization
  const style = (feature) => {
    // Get country code from different possible property names
    const countryCode = feature.properties.ISO_A2 || 
                       feature.properties.iso_a2 || 
                       (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
    
    if (!countryCode) {
      return {
        fillColor: '#333333',
        fillOpacity: 0.5,
        weight: 1,
        color: '#555555',
        opacity: 0.7
      };
    }
    
    // Skip Norway - we'll add a custom marker for it
    if (countryCode === 'NO') {
      return {
        fillColor: Colors.countryModerate,
        fillOpacity: 0.7,
        weight: 1,
        color: '#FFFFFF',
        opacity: 0.5
      };
    }
    
    // Find matching country in our data - try both the exact code and USA/US alternatives for United States
    const country = countries.find(c => {
      // Handle special case for United States (both US and USA codes might be used)
      if (countryCode === 'US' || countryCode === 'USA') {
        return c.code === 'US' || c.code === 'USA';
      }
      return c.code === countryCode;
    });
    
    if (country) {
      // Get color by rank using the getColorByRank function
      const color = getColorByRank(country.rank);
      
      return {
        fillColor: color,
        fillOpacity: 0.7,
        weight: 1,
        color: '#FFFFFF',
        opacity: 0.5
      };
    }
    
    // Default style for unlisted countries
    return {
      fillColor: '#333333',
      fillOpacity: 0.5,
      weight: 1,
      color: '#555555',
      opacity: 0.5
    };
  };
  
  // Add tooltips and interactions to each country - enhanced with detailed research info
  const onEachFeature = (feature, layer) => {
    // Get country code from different possible property names, supporting multiple formats
    const countryCode = feature.properties.ISO_A2 || 
                       feature.properties.iso_a2 || 
                       (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
    
    // Skip Norway as we'll handle it separately
    if (countryCode === 'NO') {
      return;
    }
    
    // Find a proper english name for the country
    const countryName = feature.properties.ADMIN || 
                       feature.properties.name || 
                       feature.properties.NAME || 
                       'Unknown Country';
    
    // Find matching country in our data - handle USA/US special case
    const country = countries.find(c => {
      // Handle special case for United States (both US and USA codes might be used)
      if (countryCode === 'US' || countryCode === 'USA') {
        return c.code === 'US' || c.code === 'USA';
      }
      return c.code === countryCode;
    });
    
    if (country) {
      // Get color by rank
      const color = getColorByRank(country.rank);
      
      // Get category name based on rank
      let categoryName = "Unknown";
      if (country.rank >= 1 && country.rank <= 10) categoryName = "Excellent";
      else if (country.rank >= 11 && country.rank <= 33) categoryName = "Favorable";
      else if (country.rank >= 34 && country.rank <= 62) categoryName = "Moderate";
      else if (country.rank >= 63 && country.rank <= 78) categoryName = "Restrictive";
      else categoryName = "Not Favorable";
      
      // Create simplified tooltip with less information
      const tooltipContent = `
        <div style="text-align: left; min-width: 230px; color: #f0f0f0;">
          <strong style="font-size: 14px; color: #ffffff;">${country.name}</strong>
          <br/>
          <span style="color: ${color}; font-weight: 600;">Rank: #${country.rank} - ${categoryName}</span>
          <br/>
          <small style="color: #e0e0e0;">Capital Gains Tax: ${country.capitalGainsTaxShort || country.capitalGainsTax}</small>
          <br/>
          <small style="color: #e0e0e0;">Residency Investment: ${country.residencyInvestment}</small>
          <br/>
          <small style="color: #e0e0e0;">Financial Services: ${country.financialServices}</small>
        </div>
      `;
      
      layer.bindTooltip(tooltipContent, { 
        permanent: false,
        direction: 'top',
        className: 'country-tooltip'
      });
      
      // Add interactive effects
      layer.on({
        click: () => {
          window.location.href = `/country/${country._id || country.id || countryCode.toLowerCase()}`;
        },
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.9,
            weight: 2,
            opacity: 1
          });
          layer.bringToFront();
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 1,
            opacity: 0.5
          });
        }
      });
    } else {
      // Simple tooltip for unlisted countries
      layer.bindTooltip(`<strong style="color: #ffffff;">${countryName}</strong>`, { 
        permanent: false,
        direction: 'top',
        className: 'country-tooltip'
      });
    }
  };

  // Custom Norway tooltip component
  const NorwayTooltip = () => {
    if (!norwegianData) return null;
    
    const color = getColorByRank(norwegianData.rank);
    
    // Get category name based on rank
    let categoryName = "Unknown";
    if (norwegianData.rank >= 1 && norwegianData.rank <= 10) categoryName = "Excellent";
    else if (norwegianData.rank >= 11 && norwegianData.rank <= 33) categoryName = "Favorable";
    else if (norwegianData.rank >= 34 && norwegianData.rank <= 62) categoryName = "Moderate";
    else if (norwegianData.rank >= 63 && norwegianData.rank <= 78) categoryName = "Restrictive";
    else categoryName = "Not Favorable";
    
    // Create simplified tooltip with less information
    const tooltipContent = `
      <div style="text-align: left; min-width: 230px; color: #f0f0f0;">
        <strong style="font-size: 14px; color: #ffffff;">${norwegianData.name}</strong>
        <br/>
        <span style="color: ${color}; font-weight: 600;">Rank: #${norwegianData.rank} - ${categoryName}</span>
        <br/>
        <small style="color: #e0e0e0;">Capital Gains Tax: ${norwegianData.capitalGainsTaxShort || norwegianData.capitalGainsTax}</small>
        <br/>
        <small style="color: #e0e0e0;">Residency Investment: ${norwegianData.residencyInvestment}</small>
        <br/>
        <small style="color: #e0e0e0;">Financial Services: ${norwegianData.financialServices}</small>
      </div>
    `;
  
    return (
      <Marker 
        position={NORWAY_POSITION} 
        opacity={0}
        eventHandlers={{
          click: () => {
            window.location.href = `/country/${norwegianData._id || norwegianData.id || 'no'}`;
          }
        }}
      >
        <Tooltip 
          direction="right" 
          offset={[10, 0]} 
          className="country-tooltip"
          permanent={false}
          interactive={true}
        >
          <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />
        </Tooltip>
      </Marker>
    );
  };
  
  return (
    <MapWrapper>
      <ContinentSelector>
        <ContinentButton 
          active={selectedContinent === 'world'} 
          onClick={() => setSelectedContinent('world')}
        >
          World
          <StatsTooltip>
            {Object.entries(continentStats.world || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.world.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.world.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
        
        <ContinentButton 
          active={selectedContinent === 'europe'} 
          onClick={() => setSelectedContinent('europe')}
        >
          EU
          <StatsTooltip>
            {Object.entries(continentStats.europe || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.europe.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.europe.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
        
        <ContinentButton 
          active={selectedContinent === 'northAmerica'} 
          onClick={() => setSelectedContinent('northAmerica')}
        >
          NA
          <StatsTooltip>
            {Object.entries(continentStats.northAmerica || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.northAmerica.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.northAmerica.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
        
        <ContinentButton 
          active={selectedContinent === 'southAmerica'} 
          onClick={() => setSelectedContinent('southAmerica')}
        >
          SA
          <StatsTooltip>
            {Object.entries(continentStats.southAmerica || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.southAmerica.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.southAmerica.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
        
        <ContinentButton 
          active={selectedContinent === 'asia'} 
          onClick={() => setSelectedContinent('asia')}
        >
          AS
          <StatsTooltip>
            {Object.entries(continentStats.asia || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.asia.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.asia.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
        
        <ContinentButton 
          active={selectedContinent === 'africa'} 
          onClick={() => setSelectedContinent('africa')}
        >
          AF
          <StatsTooltip>
            {Object.entries(continentStats.africa || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.africa.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.africa.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
        
        <ContinentButton 
          active={selectedContinent === 'oceania'} 
          onClick={() => setSelectedContinent('oceania')}
        >
          OC
          <StatsTooltip>
            {Object.entries(continentStats.oceania || {}).map(([cat, count]) => count > 0 && (
              <StatItem color={
                cat === 'excellent' ? Colors.countryExcellent :
                cat === 'favorable' ? Colors.countryFavorable :
                cat === 'moderate' ? Colors.countryModerate :
                cat === 'restrictive' ? Colors.countryRestrictive :
                Colors.countryNotFavorable
              } key={cat}>
                <span className="stat-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}:</span>
                <span className="stat-value">{count} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.oceania.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.oceania.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
      </ContinentSelector>
      
      <StyledMapContainer
        center={[30, 10]}
        zoom={2}
        minZoom={1.5}
        maxZoom={6}
        scrollWheelZoom={true}
        zoomControl={true}
        attributionControl={false}
        zoomAnimation={true}
        zoomSnap={0.25}
        zoomDelta={0.25}
        wheelDebounceTime={100}
        wheelPxPerZoomLevel={200}
        preferCanvas={true}
      >
        {/* Use a minimal base map without labels */}
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {geoJsonData && (
          <GeoJSON 
            data={geoJsonData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
        
        {/* Add custom Norway tooltip */}
        {norwegianData && <NorwayTooltip />}
        
        <MapController continent={selectedContinent} />
        <MapLegend />

        {loading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '10px 20px',
            borderRadius: '5px',
            color: 'white'
          }}>
            Loading map data...
          </div>
        )}
      </StyledMapContainer>
    </MapWrapper>
  );
};

export default WorldMap;