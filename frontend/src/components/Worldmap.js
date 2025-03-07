import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';


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
      <LegendTitle>Crypto-Friendliness Ranking</LegendTitle>
      <LegendItem>
        <LegendColor color="#4CAF50" />
        <span>Excellent (Ranks 1-5): 0% taxes, excellent infrastructure</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#8BC34A" />
        <span>Favorable (Ranks 6-30): Low taxes, good infrastructure</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#FFC107" />
        <span>Moderate (Ranks 31-50): Standard taxes, average support</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#FF9800" />
        <span>Restrictive (Ranks 51-70): High taxes or regulations</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#555555" />
        <span>Not favorable (Ranks 71-89): Prohibitive for crypto</span>
      </LegendItem>
    </LegendContainer>
  );
}

const categories = {
  excellent: {
    name: 'Excellent',
    color: '#4CAF50', // Vivid green
    description: 'Excellent crypto environment with minimal taxation'
  },
  favorable: {
    name: 'Favorable',
    color: '#8BC34A', // Light green
    description: 'Favorable crypto environment with some taxation'
  },
  moderate: {
    name: 'Moderate',
    color: '#FFC107', // Amber/yellow
    description: 'Moderate crypto environment with standard taxation'
  },
  restrictive: {
    name: 'Restrictive',
    color: '#FF9800', // Orange
    description: 'Restrictive crypto environment with high taxation'
  },
  notFavorable: {
    name: 'Not Favorable',
    color: '#555555', // Grey
    description: 'Not favorable for crypto activities'
  }
};

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
  
  if (rank >= 1 && rank <= 5) return 'excellent';
  if (rank >= 6 && rank <= 30) return 'favorable';
  if (rank >= 31 && rank <= 50) return 'moderate';
  if (rank >= 51 && rank <= 70) return 'restrictive';
  
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
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState('world');
  const [continentStats, setContinentStats] = useState({});
  
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



  
  // Style function for GeoJSON features - updated with comprehensive categorization
  const style = (feature) => {
    // Get country code
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
    
    // Find matching country in our data
    const country = countries.find(c => c.code === countryCode);
    
    if (country) {
      // Get category for the country using the fixed categorization function
      const categoryKey = getCategoryForCountry(country);
      const category = categories[categoryKey];
      
      return {
        fillColor: category.color,
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
    const countryCode = feature.properties.ISO_A2 || 
                       feature.properties.iso_a2 || 
                       (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
    
    // Find a proper english name for the country
    const countryName = feature.properties.ADMIN || 
                       feature.properties.name || 
                       feature.properties.NAME || 
                       'Unknown Country';
    
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
      
      layer.bindTooltip(tooltipContent, { 
        permanent: false,
        direction: 'top',
        className: 'country-tooltip'
      });
      
      // Add interactive effects
      layer.on({
        click: () => {
          window.location.href = `/country/${country.id || countryCode.toLowerCase()}`;
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