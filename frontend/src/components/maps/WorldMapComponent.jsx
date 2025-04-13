import React from 'react';
import { africaPath, europePath, asiaPath, northAmericaPath, southAmericaPath, australiaPath } from './continent-paths';

const WorldMapComponent = (props) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 2000 1000"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <g id="world-map">
        <path id="africa" d={africaPath} />
        <path id="europe" d={europePath} />
        <path id="asiapacific" d={asiaPath} />
        <path id="north-america" d={northAmericaPath} />
        <path id="south-america" d={southAmericaPath} />
        <path id="australia" d={australiaPath} />
      </g>
    </svg>
  );
};

export default WorldMapComponent;