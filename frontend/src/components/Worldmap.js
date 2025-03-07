import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled, { useTheme } from 'styled-components';
import { CategoryDefinitions, getColorByRank } from './styles/Colors';

// Function to determine if a GeoJSON feature is a main territory or remote territory
const isMainTerritory = (countryCode, bounds) => {
  // Skip for countries that don't have the issue
  if (!countryCode) return true;
  
  const center = bounds.getCenter();
  
  switch (countryCode) {
    case 'NO': // Norway
      // Mainland Norway's latitude is typically between 58-71, longitude between 4-30
      // Exclude Svalbard which is typically above 74°N
      return center.lat < 74 && center.lng > 4 && center.lng < 30;
    
    case 'FR': // France
      // Check if this is mainland France vs. overseas territories
      return center.lat >= 41 && center.lat <= 52 && center.lng >= -5 && center.lng <= 10;
    
    case 'US': // United States
      // Check if this is mainland US vs. Alaska, Hawaii, etc.
      return center.lat >= 24 && center.lat <= 50 && center.lng >= -125 && center.lng <= -66;
    
    case 'RU': // Russia
      // This is a rough approximation for mainland Russia
      return center.lat <= 80;
      
    case 'DK': // Denmark
      // Exclude Greenland
      return center.lat < 60;
      
    // Add more countries with remote territories as needed
    
    default:
      return true;
  }
};

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

const LegendContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(30, 30, 30, 0.9);
  border: 1px solid ${({ theme }) => theme.colors.border || '#2D2D2D'};
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;
  width: 200px;
`;

const LegendTitle = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 13px;
  color: #fff;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background-color: ${props => props.color};
  margin-right: 8px;
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

// Loading overlay component
const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
  font-size: 18px;
  border-radius: 0 0 8px 8px;
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
  const theme = useTheme();
  return (
    <LegendContainer>
      <LegendTitle>Crypto-Friendliness Ranking</LegendTitle>
      <LegendItem>
        <LegendColor color={theme.colors.countryExcellent} />
        <span>Excellent (Ranks 1-10): 0% taxes, excellent infrastructure</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={theme.colors.countryFavorable} />
        <span>Favorable (Ranks 11-33): Low taxes, good infrastructure</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={theme.colors.countryModerate} />
        <span>Moderate (Ranks 34-62): Standard taxes, average support</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={theme.colors.countryRestrictive} />
        <span>Restrictive (Ranks 63-78): High taxes or regulations</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={theme.colors.countryNotFavorable} />
        <span>Not favorable (Ranks 79-89): Prohibitive for crypto</span>
      </LegendItem>
    </LegendContainer>
  );
}

// Modified function that will work with or without category property
const getCategoryForCountry = (country) => {
  if (!country) return 'notFavorable';
  
  // If category property exists, use it
  if (country.category) {
    if (country.category === 'Excellent') return 'excellent';
    if (country.category === 'Favorable') return 'favorable';
    if (country.category === 'Moderate') return 'moderate';
    if (country.category === 'Restrictive') return 'restrictive';
    if (country.category === 'Not favorable') return 'notFavorable';
  }
  
  // If no category property or it doesn't match, fallback to rank-based categorization
  const rank = parseInt(country.rank);
  // Use our centralized function to determine category by rank
  const color = getColorByRank(rank);
  
  // Return the category key based on the color
  if (color === CategoryDefinitions.excellent.color) return 'excellent';
  if (color === CategoryDefinitions.favorable.color) return 'favorable';
  if (color === CategoryDefinitions.moderate.color) return 'moderate';
  if (color === CategoryDefinitions.restrictive.color) return 'restrictive';
  return 'notFavorable';
};

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
  'US': 'northAmerica', 'CA': 'northAmerica', 'MX': 'northAmerica', 'PA': 'northAmerica', 'BS': 'northAmerica',
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

const WorldMap = ({ countries }) => {
  const theme = useTheme(); // Get theme using styled-components' useTheme hook
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('world');
  const [continentStats, setContinentStats] = useState({});
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  
  // Use our centralized category definitions
  const categories = CategoryDefinitions;
  
  // Fetch GeoJSON data and preprocess it
  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        // Show loading indicator
        setLoading(true);
        setMapReady(false);
        
        // Clean world map without labels
        const response = await axios.get(
          'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        );
        
        // Preprocess the GeoJSON data to add bounds for each feature
        const processedData = {
          ...response.data,
          features: response.data.features.map(feature => {
            // Create a temporary L.GeoJSON to get the bounds
            const tempGeoJSON = L.geoJSON({ type: feature.type, geometry: feature.geometry });
            feature.bounds = tempGeoJSON.getBounds();
            return feature;
          })
        };
        
        // Set the processed GeoJSON data
        setGeoJsonData(processedData);
        
        // Short delay to ensure browser has time to process before rendering
        setTimeout(() => {
          setLoading(false);
          
          // Wait a little longer before marking as ready to ensure smooth rendering
          setTimeout(() => {
            setMapReady(true);
          }, 200);
        }, 300);
      } catch (error) {
        console.error('Failed to fetch GeoJSON data:', error);
        setLoading(false);
        setMapReady(true); // Still mark as ready to show something
      }
    };
    
    fetchGeoData();
  }, []);
  
  // Calculate statistics for each continent based on all research
  useEffect(() => {
    if (countries && countries.length > 0) {
      // Initialize stats
      const stats = {
        world: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}),
        europe: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}),
        northAmerica: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}),
        southAmerica: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}),
        asia: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}),
        africa: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}),
        oceania: Object.keys(categories).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
      };
      
      // Count countries in each category per continent
      countries.forEach(country => {
        const category = getCategoryForCountry(country);
        const continent = countryToContinentMap[country.code] || 'world';
        
        // Increment global count
        stats.world[category] = (stats.world[category] || 0) + 1;
        
        // Increment continent count
        if (continent !== 'world') {
          stats[continent][category] = (stats[continent][category] || 0) + 1;
        }
      });
      
      setContinentStats(stats);
    }
  }, [countries]);
  
  // Access and configure the map when it's ready
  useEffect(() => {
    if (mapReady && mapRef.current) {
      const leafletMap = mapRef.current;
      
      // If leafletMap is available, we can configure performance settings
      if (leafletMap && typeof leafletMap.getRenderer === 'function') {
        const renderer = leafletMap.getRenderer(leafletMap);
        if (renderer) {
          // Increase the max size for better performance with all features visible
          renderer.options.padding = 2;
          
          // Set higher precision for rendering
          if (renderer.options) {
            renderer.options.tolerance = 0;
          }
        }
      }
    }
  }, [mapReady]);

  // Style function for GeoJSON features
  const style = (feature) => {
    // Get country code
    const countryCode = feature.properties.ISO_A2 || 
                       feature.properties.iso_a2 || 
                       (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
    
    if (!countryCode) {
      return {
        fillColor: '#333333',
        fillOpacity: 0.5,
        weight: 0.5,
        color: '#555555',
        opacity: 0.5
      };
    }
    
    // Find matching country in our data
    const country = countries.find(c => c.code === countryCode);
    
    if (country) {
      // Get category for the country using the fixed categorization function
      const categoryKey = getCategoryForCountry(country);
      const category = categories[categoryKey];
      
      // Check if this is a main territory before applying a stronger style
      const isMain = feature.bounds ? isMainTerritory(countryCode, feature.bounds) : true;
      
      return {
        fillColor: category.color,
        fillOpacity: isMain ? 0.8 : 0.6, // Slightly less opacity for territories
        weight: 1,
        color: '#FFFFFF',
        opacity: 0.7
      };
    }
    
    // Default style for unlisted countries
    return {
      fillColor: '#333333',
      fillOpacity: 0.5,
      weight: 0.5,
      color: '#555555',
      opacity: 0.5
    };
  };
  
  // Add interactions to each country - enhanced with detailed research info
  const onEachFeature = (feature, layer) => {
    const countryCode = feature.properties.ISO_A2 || 
                       feature.properties.iso_a2 || 
                       (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
    
    // Find a proper english name for the country
    const countryName = feature.properties.ADMIN || 
                       feature.properties.name || 
                       feature.properties.NAME || 
                       'Unknown Country';
    
    // Store bounds in the feature for later use
    if (!feature.bounds) {
      feature.bounds = layer.getBounds();
    }
    
    // Check if this is a main territory or a remote territory
    if (!isMainTerritory(countryCode, feature.bounds)) {
      // For remote territories, we'll still make them clickable but no tooltip
      if (countryCode) {
        const country = countries.find(c => c.code === countryCode);
        if (country) {
          layer.on({
            click: () => {
              window.location.href = `/country/${country.code || countryCode}`;
            }
          });
        }
      }
      return; // Skip adding tooltip for remote territories
    }
    
    // Find matching country in our data
    const country = countries.find(c => c.code === countryCode);
    
    if (country) {
      // Get category
      const categoryKey = getCategoryForCountry(country);
      const category = categories[categoryKey];
      
      // Create tooltip with more detailed information based on research - with improved readability
      const tooltipContent = `
        <div style="text-align: left; min-width: 230px; color: #f0f0f0;">
          <strong style="font-size: 14px; color: #ffffff;">${country.name}</strong>
          <br/>
          <span style="color: ${category.color}; font-weight: 600;">Rank: #${country.rank} - ${category.name}</span>
          <br/>
          <small style="color: #e0e0e0;">Capital Gains Tax: ${country.capitalGainsTax}</small>
          <br/>
          <small style="color: #e0e0e0;">Wealth Tax: ${country.wealthTax}</small>
          <br/>
          <small style="color: #e0e0e0;">Residency Investment: ${country.residencyInvestment}</small>
          <br/>
          <small style="color: #e0e0e0;">Financial Services: ${country.financialServices}</small>
          ${country.futureRisks ? `<br/><small style="color: #e0e0e0;">Future Risks: ${country.futureRisks}</small>` : ''}
          ${country.costOfLivingIndex ? `<br/><small style="color: #e0e0e0;">Cost of Living: ${country.costOfLivingIndex}</small>` : ''}
        </div>
      `;
      
      // Configure tooltip with additional options for better positioning
      const tooltipOptions = { 
        permanent: false,
        className: 'country-tooltip'
      };
      
      // Custom tooltip positioning for specific countries
      if (countryCode) {
        switch (countryCode) {
          case 'NO': // Norway
            tooltipOptions.direction = 'right';
            tooltipOptions.offset = L.point(10, 0);
            break;
          case 'SE': // Sweden
            tooltipOptions.direction = 'right';
            tooltipOptions.offset = L.point(5, 0);
            break;
          case 'FI': // Finland
            tooltipOptions.direction = 'right';
            tooltipOptions.offset = L.point(5, 0);
            break;
          case 'IS': // Iceland
            tooltipOptions.direction = 'bottom';
            break;
          case 'NZ': // New Zealand
            tooltipOptions.direction = 'left';
            break;
          case 'JP': // Japan
            tooltipOptions.direction = 'left';
            break;
          case 'AU': // Australia
            tooltipOptions.direction = 'top';
            break;
          default:
            tooltipOptions.direction = 'top';
        }
      } else {
        tooltipOptions.direction = 'top';
      }
      
      layer.bindTooltip(tooltipContent, tooltipOptions);
      
      // Add interactive effects with improved highlighting
      layer.on({
        click: () => {
          // Use _id if available, but prefer the consistent 'code' property
          window.location.href = `/country/${country.code || countryCode}`;
        },
        mouseover: (e) => {
          const layer = e.target;
          
          // More visible highlighting effect
          layer.setStyle({
            fillOpacity: 0.9,
            weight: 2,
            opacity: 1,
            color: '#FFFFFF' // White border for better visibility
          });
          
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
        },
        mouseout: (e) => {
          const layer = e.target;
          
          // Restore original style
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 1,
            opacity: 0.5,
            color: '#FFFFFF'
          });
        }
      });
    } else {
      // Simple tooltip for unlisted countries with improved styling
      const tooltipContent = `
        <div style="text-align: center; color: #f0f0f0;">
          <strong style="font-size: 14px; color: #ffffff;">${countryName}</strong>
          <br/>
          <small style="color: #e0e0e0;">No crypto data available</small>
        </div>
      `;
      
      layer.bindTooltip(tooltipContent, { 
        permanent: false,
        direction: 'top',
        className: 'country-tooltip'
      });
      
      // Add basic hover effect for countries without data
      layer.on({
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.8,
            weight: 1.5,
            opacity: 0.8,
            color: '#AAAAAA' // Lighter border for countries without data
          });
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.5,
            weight: 1,
            opacity: 0.5,
            color: '#555555'
          });
        }
      });
    }
  };
  
  // GeoJSON options to ensure complete preloading
  const geoJsonOptions = {
    style: style,
    onEachFeature: onEachFeature,
    // These settings ensure all features are rendered at once
    renderer: L.canvas({ padding: 2, tolerance: 0 }),
    // Disable chunked loading to render everything at once
    chunkedLoading: false,
    // Don't filter features for better panning experience
    filter: () => true
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
            {Object.keys(categories).map(cat => continentStats.world && continentStats.world[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.world[cat]} countries</span>
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
          Europe
          <StatsTooltip>
            {Object.keys(categories).map(cat => continentStats.europe && continentStats.europe[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.europe[cat]} countries</span>
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
          North America
          <StatsTooltip>
            {Object.keys(categories).map(cat => continentStats.northAmerica && continentStats.northAmerica[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.northAmerica[cat]} countries</span>
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
          South America
          <StatsTooltip>
            {Object.keys(categories).map(cat => continentStats.southAmerica && continentStats.southAmerica[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.southAmerica[cat]} countries</span>
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
          Asia
          <StatsTooltip>
            {Object.keys(categories).map(cat => continentStats.asia && continentStats.asia[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.asia[cat]} countries</span>
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
          Africa
          <StatsTooltip>
            {Object.keys(categories).map(cat => continentStats.africa && continentStats.africa[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.africa[cat]} countries</span>
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
          Oceania
          <StatsTooltip>
            {Object.keys(categories).map(cat => continentStats.oceania && continentStats.oceania[cat] > 0 && (
              <StatItem color={categories[cat].color} key={cat}>
                <span className="stat-name">{categories[cat].name}:</span>
                <span className="stat-value">{continentStats.oceania[cat]} countries</span>
              </StatItem>
            ))}
            <RegionalInsight>
              <strong>Top Country:</strong> {regionalInsights.oceania.topCountry}<br/>
              <strong>Trend:</strong> {regionalInsights.oceania.keyTrend}
            </RegionalInsight>
          </StatsTooltip>
        </ContinentButton>
      </ContinentSelector>
      
      <div style={{ position: 'relative' }}>
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
          // Set a key to force re-rendering when data changes
          key={`map-${mapReady ? 'ready' : 'loading'}`}
        >
          {/* Use a minimal base map without labels */}
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {geoJsonData && mapReady && (
            <GeoJSON 
              data={geoJsonData}
              {...geoJsonOptions}
            />
          )}
          
          <MapController continent={selectedContinent} />
          <MapLegend />
        </StyledMapContainer>
        
        {loading && (
          <LoadingOverlay>
            <div>
              <div style={{ marginBottom: '10px' }}>Loading map data...</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>This may take a moment to ensure smooth navigation</div>
            </div>
          </LoadingOverlay>
        )}
      </div>
    </MapWrapper>
  );
};

export default WorldMap;