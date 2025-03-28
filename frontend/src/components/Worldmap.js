import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Tooltip } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { getCategoryColor, Colors } from './styles/Colors';
import { Link } from 'react-router-dom';

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
  
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
    padding: 5px 10px;
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
  
  @media (max-width: 768px) {
    width: 180px;
    padding: 8px;
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
    max-width: 250px;
  }
  
  .country-popup {
    background-color: rgba(24, 24, 24, 0.95);
    border: 1px solid #444;
    border-radius: 4px;
    padding: 12px;
    font-size: 13px;
    color: #f0f0f0;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.4);
    max-width: 280px;
    
    .leaflet-popup-content-wrapper {
      background-color: rgba(24, 24, 24, 0.95);
      border-radius: 4px;
    }
    
    .leaflet-popup-tip {
      background-color: rgba(24, 24, 24, 0.95);
    }
    
    .leaflet-popup-close-button {
      color: #f0f0f0;
    }
  }
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 350px;
  }
`;

// MapController component to handle map view changes
function MapController({ continent }) {
  const map = useMap();
  
  // Define continent boundaries and zoom levels
  const continentViews = {
    world: { center: [20, 10], zoom: 2 },
    eu: { center: [50, 10], zoom: 4 },
    na: { center: [40, -95], zoom: 3 },
    sa: { center: [-20, -60], zoom: 3 },
    as: { center: [30, 90], zoom: 3 },
    af: { center: [0, 20], zoom: 3 },
    oc: { center: [-25, 135], zoom: 3.5 }
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

// Map Legend component - simplified version
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

// Helper function to detect touch devices
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};

const WorldMap = ({ countries }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('world');
  const [continentStats, setContinentStats] = useState({});
  const [norwegianData, setNorwegianData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const mapRef = useRef(null);
  
  // Detect touch device
  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

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
      const stats = {
        world: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        eu: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        na: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        sa: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        as: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        af: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 },
        oc: { excellent: 0, favorable: 0, moderate: 0, restrictive: 0, notFavorable: 0 }
      };
      
      // Count countries in each category per continent
      countries.forEach(country => {
        // Normalize the category name (lowercase and remove spaces)
        let categoryKey = (country.category || "").toLowerCase().replace(/\s+/g, "");
        // Handle "Not favorable" special case
        if (categoryKey === "notfavorable") categoryKey = "notFavorable";
        
        // Use both US and USA for United States
        let continent = countryToContinentMap[country.code] || 'world';
        
        // Increment global count
        stats.world[categoryKey]++;
        
        // Increment continent count
        if (continent !== 'world') {
          stats[continent][categoryKey]++;
        }
      });
      
      setContinentStats(stats);
    }
  }, [countries]);

  // Create tooltip content
  const createTooltipContent = (country) => {
    const color = getCategoryColor(country.category);
    
    return `
      <div style="text-align: left; min-width: 230px; color: #f0f0f0;">
        <strong style="font-size: 14px; color: #ffffff;">${country.name}</strong>
        <br/>
        <span style="color: ${color}; font-weight: 600;">Rank: #${country.rank} - ${country.category}</span>
        <br/>
        <small style="color: #e0e0e0;">Capital Gains Tax: ${country.capitalGainsTaxShort || country.capitalGainsTax}</small>
        <br/>
        <small style="color: #e0e0e0;">Residency Investment: ${country.residencyInvestment}</small>
        <br/>
        <small style="color: #e0e0e0;">Financial Services: ${country.financialServices}</small>
      </div>
    `;
  };
  
  // Create popup content
  const createPopupContent = (country) => {
    const color = getCategoryColor(country.category);
    
    return `
      <div style="min-width: 220px; color: #f0f0f0;">
        <strong style="font-size: 16px; color: #ffffff; display: block; margin-bottom: 8px;">${country.name}</strong>
        <span style="color: ${color}; font-weight: 600; display: block; margin-bottom: 10px;">
          Rank: #${country.rank} - ${country.category}
        </span>
        <div style="margin-bottom: 5px;"><span style="font-weight: 500;">Capital Gains Tax:</span> ${country.capitalGainsTaxShort || country.capitalGainsTax}</div>
        <div style="margin-bottom: 5px;"><span style="font-weight: 500;">Residency Investment:</span> ${country.residencyInvestment}</div>
        <div style="margin-bottom: 10px;"><span style="font-weight: 500;">Financial Services:</span> ${country.financialServices}</div>
        <a href="/country/${country.code.toLowerCase()}" style="display: block; background-color: #F7931A; color: white; text-align: center; padding: 8px; border-radius: 4px; text-decoration: none; font-weight: 500;">
          View Country Details
        </a>
      </div>
    `;
  };
  
  // Handle click event for touch devices
  const handleCountryClick = (e, country, map) => {
    if (isTouch) {
      setSelectedCountry(country);
      
      // Add popup at the clicked location
      L.popup({
        className: 'country-popup',
        closeButton: true
      })
      .setLatLng(e.latlng)
      .setContent(createPopupContent(country))
      .openOn(map);
    } else {
      // Desktop click behavior - use country code for navigation (lowercase)
      window.location.href = `/country/${country.code.toLowerCase()}`;
    }
  };
  
  // Style function for GeoJSON features
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
    
    // Find matching country in our data - try both the exact code and USA/US alternatives for United States
    const country = countries.find(c => {
      // Handle special case for United States (both US and USA codes might be used)
      if (countryCode === 'US' || countryCode === 'USA') {
        return c.code === 'US' || c.code === 'USA';
      }
      return c.code === countryCode;
    });
    
    if (country) {
      // Get color directly from the country's category
      const color = getCategoryColor(country.category);
      
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
  
  // Add tooltips and interactions to each country
  const onEachFeature = (feature, layer) => {
    // Get country code from different possible property names
    const countryCode = feature.properties.ISO_A2 || 
                       feature.properties.iso_a2 || 
                       (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
    
    // Find a proper english name for the country
    const countryName = feature.properties.ADMIN || 
                       feature.properties.name || 
                       feature.properties.NAME || 
                       'Unknown Country';
    
    // Find matching country in our data - handle USA/US special case
    let country = countries.find(c => {
      // Handle special case for United States (both US and USA codes might be used)
      if (countryCode === 'US' || countryCode === 'USA') {
        return c.code === 'US' || c.code === 'USA';
      }
      return c.code === countryCode;
    });
    
    // Special handling for Norway
    if (countryCode === 'NO' && norwegianData) {
      country = norwegianData;
    }
    
    if (country) {
      // Create tooltip with detailed information
      const tooltipContent = createTooltipContent(country);
      
      if (!isTouch) {
        // Desktop hover behavior
        layer.bindTooltip(tooltipContent, { 
          permanent: false,
          direction: 'top',
          className: 'country-tooltip'
        });
      }
      
      // Interactive effects
      layer.on({
        click: (e) => {
          // Get the map instance
          const map = e.target._map || mapRef.current;
          
          // Handle click based on device type
          handleCountryClick(e, country, map);
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

  // Update regionalInsights based on the top ranked countries in each region
  const regionalInsights = {
    world: {
      topCountry: "United Arab Emirates", // Rank 1 in your data
      keyTrend: "CARF implementation for 48+ countries by 2026"
    },
    eu: {
      topCountry: "Switzerland", // Top European country
      keyTrend: "MiCA regulations implementation by 2025"
    },
    as: {
      topCountry: "United Arab Emirates", // Top Asian/Middle Eastern country
      keyTrend: "FATF Travel Rule adoption for cross-border transfers"
    },
    na: {
      topCountry: "El Salvador", // Top North American country
      keyTrend: "FIT Act may classify crypto as commodities vs. securities"
    },
    sa: {
      topCountry: "Paraguay", // Top South American country
      keyTrend: "Brazil leads in regulated crypto ETFs and adoption"
    },
    af: {
      topCountry: "Mauritius", // Top African country (rank 8)
      keyTrend: "Nigeria proposing 7.5% VAT on crypto services"
    },
    oc: {
      topCountry: "Palau", // Top Oceanian country (rank 23)
      keyTrend: "Australia implementing FIFO accounting rules for traders"
    }
  };

  // Comprehensive country-to-continent mapping (greatly expanded from research)
  const countryToContinentMap = {
    // Europe (expanded from European research document)
    'CH': 'eu', 'MT': 'eu', 'PT': 'eu', 'DE': 'eu', 'GB': 'eu', 'FR': 'eu', 'IT': 'eu',
    'ES': 'eu', 'NL': 'eu', 'BE': 'eu', 'SE': 'eu', 'DK': 'eu', 'FI': 'eu', 'NO': 'eu',
    'IE': 'eu', 'AT': 'eu', 'GR': 'eu', 'PL': 'eu', 'CZ': 'eu', 'HU': 'eu', 'RO': 'eu',
    'SI': 'eu', 'EE': 'eu', 'HR': 'eu', 'BG': 'eu', 'SK': 'eu', 'LV': 'eu', 'LT': 'eu',
    'CY': 'eu', 'LU': 'eu', 'IS': 'eu', 'GE': 'eu', 'MC': 'eu', 'RS': 'eu', 'LI': 'eu',
    
    // Asia (comprehensive list from Asian research document)
    'AE': 'as', 'SG': 'as', 'JP': 'as', 'KR': 'as', 'MY': 'as', 'TH': 'as', 'TR': 'as', 'IN': 'as',
    'ID': 'as', 'VN': 'as', 'PH': 'as', 'SA': 'as', 'QA': 'as', 'IL': 'as', 'KZ': 'as', 'HK': 'as',
    'BN': 'as', 'MM': 'as', 'LK': 'as', 'KW': 'as', 'KH': 'as', 'OM': 'as', 'JO': 'as', 'LB': 'as',
    'AM': 'as', 'AZ': 'as', 'BT': 'as', 'CN': 'as', 'IR': 'as', 'IQ': 'as', 'KP': 'as',
    
    // North America (expanded with Caribbean nations)
    'US': 'na', 'USA': 'na', 'CA': 'na', 'MX': 'na', 'PA': 'na', 'BS': 'na',
    'CR': 'na', 'SV': 'na', 'GT': 'na', 'HN': 'na', 'NI': 'na',
    'JM': 'na', 'DO': 'na', 'CU': 'na', 'HT': 'na', 'BZ': 'na',
    'BB': 'na', 'LC': 'na', 'AG': 'na', 'KY': 'na', 'TT': 'na',
    
    // South America (all countries from South American research)
    'BR': 'sa', 'AR': 'sa', 'CO': 'sa', 'CL': 'sa', 'PE': 'sa',
    'UY': 'sa', 'EC': 'sa', 'BO': 'sa', 'PY': 'sa', 'VE': 'sa',
    'GY': 'sa', 'SR': 'sa', 'GF': 'sa',
    
    // Africa (comprehensive list from African research document)
    'ZA': 'af', 'EG': 'af', 'NG': 'af', 'KE': 'af', 'MA': 'af', 'GH': 'af', 'TZ': 'af',
    'UG': 'af', 'RW': 'af', 'ET': 'af', 'MU': 'af', 'SC': 'af', 'NA': 'af', 'ZW': 'af',
    'CM': 'af', 'CI': 'af', 'SN': 'af', 'TN': 'af', 'DZ': 'af', 'AO': 'af', 'MZ': 'af',
    'ZM': 'af', 'BW': 'af', 'GA': 'af', 'CD': 'af', 'SD': 'af', 'ML': 'af', 'BF': 'af',
    
    // Oceania (based on Oceanian research document)
    'AU': 'oc', 'NZ': 'oc', 'FJ': 'oc', 'PG': 'oc', 'SB': 'oc', 'VU': 'oc',
    'WS': 'oc', 'TO': 'oc', 'KI': 'oc', 'MH': 'oc', 'TV': 'oc', 'NR': 'oc',
    'PW': 'oc', 'CK': 'oc', 'NU': 'oc'
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
active={selectedContinent === 'eu'} 
onClick={() => setSelectedContinent('eu')}
>
EU
<StatsTooltip>
  {Object.entries(continentStats.eu || {}).map(([cat, count]) => count > 0 && (
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
    <strong>Top Country:</strong> {regionalInsights.eu.topCountry}<br/>
    <strong>Trend:</strong> {regionalInsights.eu.keyTrend}
  </RegionalInsight>
</StatsTooltip>
</ContinentButton>

<ContinentButton 
active={selectedContinent === 'na'} 
onClick={() => setSelectedContinent('na')}
>
NA
<StatsTooltip>
  {Object.entries(continentStats.na || {}).map(([cat, count]) => count > 0 && (
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
    <strong>Top Country:</strong> {regionalInsights.na.topCountry}<br/>
    <strong>Trend:</strong> {regionalInsights.na.keyTrend}
  </RegionalInsight>
</StatsTooltip>
</ContinentButton>

<ContinentButton 
active={selectedContinent === 'sa'} 
onClick={() => setSelectedContinent('sa')}
>
SA
<StatsTooltip>
  {Object.entries(continentStats.sa || {}).map(([cat, count]) => count > 0 && (
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
    <strong>Top Country:</strong> {regionalInsights.sa.topCountry}<br/>
    <strong>Trend:</strong> {regionalInsights.sa.keyTrend}
  </RegionalInsight>
</StatsTooltip>
</ContinentButton>

<ContinentButton 
active={selectedContinent === 'as'} 
onClick={() => setSelectedContinent('as')}
>
AS
<StatsTooltip>
  {Object.entries(continentStats.as || {}).map(([cat, count]) => count > 0 && (
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
    <strong>Top Country:</strong> {regionalInsights.as.topCountry}<br/>
    <strong>Trend:</strong> {regionalInsights.as.keyTrend}
  </RegionalInsight>
</StatsTooltip>
</ContinentButton>

<ContinentButton 
active={selectedContinent === 'af'} 
onClick={() => setSelectedContinent('af')}
>
AF
<StatsTooltip>
  {Object.entries(continentStats.af || {}).map(([cat, count]) => count > 0 && (
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
    <strong>Top Country:</strong> {regionalInsights.af.topCountry}<br/>
    <strong>Trend:</strong> {regionalInsights.af.keyTrend}
  </RegionalInsight>
</StatsTooltip>
</ContinentButton>

<ContinentButton 
active={selectedContinent === 'oc'} 
onClick={() => setSelectedContinent('oc')}
>
OC
<StatsTooltip>
  {Object.entries(continentStats.oc || {}).map(([cat, count]) => count > 0 && (
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
    <strong>Top Country:</strong> {regionalInsights.oc.topCountry}<br/>
    <strong>Trend:</strong> {regionalInsights.oc.keyTrend}
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
ref={mapRef}
whenCreated={(map) => {
mapRef.current = map;
}}
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