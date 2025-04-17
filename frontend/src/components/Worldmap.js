import React, { useState } from 'react';
import styled from 'styled-components';
import SvgComponent from './maps/SvgComponent';

// Import continent groups
import { africaGroup, europeGroup, asiaGroup, northAmericaGroup, southAmericaGroup, australiaGroup } from './maps/continent-groups';

const WorldMap = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);
    
    return (
      <div className="map-container">
        <SvgComponent 
          highlightRegion1={selectedRegion === 'region1'}
          onRegionClick={setSelectedRegion}
        />
      </div>
    );
  };

  export default WorldMap;