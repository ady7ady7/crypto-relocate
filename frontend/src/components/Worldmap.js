// frontend/src/components/WorldMap.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from './styles/Colors';
import { ReactComponent as ContinentsMap } from './maps/Continents.svg';
import { getCountryCoordinates } from './maps/CountryCoordinates';

// Main container that takes full viewport height
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 75vh;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 50vh; // Reduced from 60vh to 50vh to save space on mobile
    min-height: 300px; // Ensure it's still visible
  }
`;

// Define a globe SVG icon component
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.58 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" />
  </svg>
);

// The map fills the entire container
const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Sidebar positioned absolutely in the bottom left corner
const Sidebar = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 10;
  max-height: 75%;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

// Mobile dropdown shown only on mobile devices
const MobileDropdown = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

// Styled select element for mobile
const ContinentSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 1rem;
  
  option {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

// Label for mobile dropdown
const DropdownLabel = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

// Continent option in sidebar
const ContinentOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  color: ${({ active, theme }) => active ? Colors.accent : theme.colors.text};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${Colors.accent};
  }
`;

// Globe icon container
const IconContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: ${({ theme }) => theme.spacing.sm};
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ active }) => active ? Colors.accent : '#e5e5e5'};
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// The SVG map
const StyledMap = styled(ContinentsMap)`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  
  /* Remove any borders */
  stroke: none;
  border: none;
  outline: none;
  
  /* Apply styling to continent groups */
  g {
    transition: all 0.3s ease;
    fill: #e5e5e5; /* Light gray as default */
    
    &:hover {
      cursor: pointer;
      fill: #D2B48C; /* Light brown color for hover effect (was previously for active) */
    }
    
    &.active {
      fill: ${Colors.accent}; /* Bitcoin gold for active continent (was previously for hover) */
    }
  }
`;

// Styled marker for excellent countries
const CountryMarker = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.countryExcellent};
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
  z-index: 5;
  transition: all 0.3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  cursor: pointer; /* Make clickable for mobile */
  
  /* Fixed positions that don't change with responsive sizing */
  top: ${props => props.y}%;
  left: ${props => props.x}%;
`;

// Tooltip that appears on hover or tap
const MarkerTooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translate(-50%, -100%);
  margin-top: -10px;
  z-index: 10;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease;
  pointer-events: none;
  
  /* Fixed position */
  top: ${props => props.y}%;
  left: ${props => props.x}%;
`;

const WorldMap = ({ countries = [] }) => {
  const [activeContinent, setActiveContinent] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  // Define continents
  const continents = [
    { id: 'north_america', name: 'North America' },
    { id: 'south_america', name: 'South America' },
    { id: 'europe', name: 'Europe' },
    { id: 'asmeapacific', name: 'Asia, Middle East, Pacific' },
    //{ id: 'oceania', name: 'Oceania' },  -- na razie wyłączamy Oceanię, nie ma powodu zeby była tbh
    { id: 'africa', name: 'Africa' }
  ];

  // Check if device is likely mobile based on screen width
  const [isMobile, setIsMobile] = useState(false);
  const [excellentCountries, setExcellentCountries] = useState([]);
  
  // Update mobile state on window resize and component mount
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768; // Common breakpoint for mobile devices
      setIsMobile(mobile);
      setExcellentCountries(getCountryCoordinates(mobile));
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Filter excellent countries by active continent
  const filteredExcellentCountries = activeContinent
    ? excellentCountries.filter(country => country.continent === activeContinent)
    : [];
  
  // Handle continent selection
  const handleContinentSelect = (continentId) => {
    setActiveContinent(continentId === activeContinent ? null : continentId);
    
    // This would filter countries by continent in a real implementation
    const continentCountries = countries.filter(country => 
      country.continent === continentId || country.region === continentId
    );
    
    console.log(`Selected continent: ${continentId}`);
    console.log('Countries in continent:', continentCountries);
  };
  
  // Handle country marker interactions (hover and click for mobile)
  const handleMarkerInteraction = (country) => {
    setHoveredCountry(country);
  };
  
  const handleMarkerMouseLeave = () => {
    setHoveredCountry(null);
  };
  
  // Handle touch events for mobile devices
  const handleMarkerTouch = (country, event) => {
    event.preventDefault(); // Prevent additional events
    setHoveredCountry(prevCountry => 
      prevCountry && prevCountry.id === country.id ? null : country
    );
  };
  
  // Update map when active continent changes
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Remove active class from all continents
    continents.forEach(continent => {
      const element = mapRef.current.querySelector(`#${continent.id}`);
      if (element) {
        element.classList.remove('active');
      }
    });
    
    // Add active class to selected continent
    if (activeContinent) {
      const activeElement = mapRef.current.querySelector(`#${activeContinent}`);
      if (activeElement) {
        activeElement.classList.add('active');
      }
    }
  }, [activeContinent]);
  
  return (
    <MapContainer ref={mapContainerRef}>
      {/* The map fills the entire container */}
      <MapWrapper>
        <StyledMap
          ref={mapRef}
          onClick={(e) => {
            const targetGroup = e.target.closest('g');
            if (targetGroup?.id) {
              const isContinent = continents.some(c => c.id === targetGroup.id);
              if (isContinent) {
                handleContinentSelect(targetGroup.id);
              }
            }
          }}
        />
        
        {/* Country markers for excellent rated countries */}
        {filteredExcellentCountries.map((country) => (
          <CountryMarker
            key={country.id}
            x={country.x}
            y={country.y}
            visible={activeContinent === country.continent}
            onMouseEnter={() => handleMarkerInteraction(country)}
            onMouseLeave={handleMarkerMouseLeave}
            onClick={(e) => handleMarkerTouch(country, e)}
            onTouchStart={(e) => handleMarkerTouch(country, e)}
          />
        ))}
        
        {/* Tooltip for country information - positioned relative to country marker */}
        {hoveredCountry && (
          <MarkerTooltip
            visible={hoveredCountry !== null}
            x={hoveredCountry.x}
            y={hoveredCountry.y - 3} // Position slightly above the marker
          >
            {hoveredCountry.name} - Excellent
          </MarkerTooltip>
        )}
      </MapWrapper>
      
      {/* Sidebar overlay on desktop - now in bottom left */}
      <Sidebar>
        {continents.map(continent => (
          <ContinentOption
            key={continent.id}
            active={activeContinent === continent.id}
            onClick={() => handleContinentSelect(continent.id)}
          >
            <IconContainer active={activeContinent === continent.id}>
              <GlobeIcon />
            </IconContainer>
            {continent.name}
          </ContinentOption>
        ))}
      </Sidebar>
      
      {/* Mobile dropdown overlay */}
      <MobileDropdown>
        <DropdownLabel>Select a continent from the list</DropdownLabel>
        <ContinentSelect
          value={activeContinent || ''}
          onChange={(e) => handleContinentSelect(e.target.value)}
        >
          <option value="">-- Select continent --</option>
          {continents.map(continent => (
            <option key={continent.id} value={continent.id}>
              {continent.name}
            </option>
          ))}
        </ContinentSelect>
      </MobileDropdown>
    </MapContainer>
  );
};

export default React.memo(WorldMap);