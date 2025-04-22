// frontend/src/components/WorldMap.js
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Colors } from './styles/Colors';
import { ReactComponent as ContinentsMap } from './maps/Continents.svg';


const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  
  svg {
    width: 100%;
    height: 100%;
    
    g {
      transition: fill 0.3s ease;
      
      &:hover {
        cursor: pointer;
        filter: drop-shadow(0 0 8px ${Colors.accent});
      }
    }
  }
`;

const WorldMap = ({ countries = [] }) => {
  const svgRef = useRef(null);
  const [activeRegion, setActiveRegion] = useState(null);

  // Add interaction handlers
  const handleRegionClick = (regionId) => {
    console.log('Selected region:', regionId);
    setActiveRegion(regionId);
  };

  return (
    <MapContainer>
      <ContinentsMap
        ref={svgRef}
        data-tip=""
        onClick={(e) => {
          const targetGroup = e.target.closest('g');
          if (targetGroup?.id) handleRegionClick(targetGroup.id);
        }}
      />
    </MapContainer>
  );
};

export default React.memo(WorldMap);
