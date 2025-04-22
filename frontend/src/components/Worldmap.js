// frontend/src/components/WorldMap.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Colors } from './styles/Colors';
import { ReactComponent as ContinentsMap } from './maps/Continents.svg';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh; /* Increased from 60vh to 70vh */
  min-height: 450px; /* Increased from 400px to 450px */
  /* Removed border-radius for more seamless experience */
  overflow: hidden;
  /* Removed box-shadow to eliminate the border effect */
  transition: transform 0.3s ease;
  
  /* Add hover effect to the entire component, but without shadow */
  &:hover {
    transform: scale(1.02);
  }
  
  /* Make sure the SVG fills the container properly */
  svg {
    width: 100%;
    height: 100%; 
    display: block; /* Prevents extra space at bottom */
    object-fit: contain; /* Ensures the SVG maintains proper proportions */
    /* Removed any potential default margins/padding */
    margin: 0;
    padding: 0;
    
    /* Style for continent groups */
    g {
      transition: all 0.3s ease;
      fill: ${({ theme }) => theme.colors.secondaryBackground || '#1E1E1E'};
      
      /* Highlight the entire continent on hover, not just borders */
      &:hover {
        cursor: pointer;
        fill: ${Colors.accent};
        filter: drop-shadow(0 0 10px ${Colors.accent});
      }
    }
  }
  
  /* Responsive adjustments for different screen sizes */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 90vh;
    min-height: 350px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 90vh;
    min-height: 300px;
  }
`;

// Optional tooltip component that can be added later
const MapTooltip = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
`;

const WorldMap = ({ countries = [] }) => {
  const svgRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);
  
  // Connect countries data with regions
  const getCountriesForRegion = (regionId) => {
    // This would filter countries by region when API is properly set up
    return countries.filter(country => country.region === regionId);
  };

  // Add interaction handlers
  const handleRegionClick = (regionId) => {
    console.log('Selected region:', regionId);
    setActiveRegion(regionId);
    
    // Here you could navigate to a filtered view of countries in this region
    // For example: history.push(`/region/${regionId}`);
    
    // Or display countries from this region in a popup/sidebar
    const regionCountries = getCountriesForRegion(regionId);
    console.log('Countries in region:', regionCountries);
  };

  return (
    <MapContainer>
      <ContinentsMap
        ref={svgRef}
        data-tip=""
        style={{ width: '100%', height: '100%' }} /* Enforce full size */
        preserveAspectRatio="xMidYMid meet" /* Ensure proper centering and scaling */
        onClick={(e) => {
          const targetGroup = e.target.closest('g');
          if (targetGroup?.id) handleRegionClick(targetGroup.id);
        }}
      />
    </MapContainer>
  );
};

export default React.memo(WorldMap);