// frontend/src/components/illustrations/Icons.js
import React from 'react';
import styled from 'styled-components';

// Base Icon Component
const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '24px'};
  height: ${props => props.size || '24px'};
  color: ${props => props.color || 'currentColor'};
`;

// Tax-related Icons
export const TaxIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"></path>
      <path d="M21 16H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"></path>
      <path d="M10 10v6"></path>
      <path d="M14 10v6"></path>
    </svg>
  </IconWrapper>
);

export const WealthIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
      <path d="M12 18V6"></path>
    </svg>
  </IconWrapper>
);

// Residency Icons
export const ResidencyIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  </IconWrapper>
);

export const PassportIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2"></rect>
      <circle cx="12" cy="10" r="3"></circle>
      <path d="M7 16h10"></path>
    </svg>
  </IconWrapper>
);

// Financial Services Icons
export const BankIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  </IconWrapper>
);

export const CryptoIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8h6M9 12h6M9 16h6"></path>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  </IconWrapper>
);

// Risk Icon
export const RiskIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
      <path d="M17.0001 2H7.0001C5.1058 2 3.4087 3.1059 2.6967 4.89L1.0001 9.89C0.5238 11.21 0.5238 12.79 1.0001 14.11L2.6967 19.11C3.4087 20.89 5.1058 22 7.0001 22H17.0001C18.8944 22 20.5915 20.89 21.3034 19.11L23.0001 14.11C23.4764 12.79 23.4764 11.21 23.0001 9.89L21.3034 4.89C20.5915 3.1059 18.8944 2 17.0001 2Z"></path>
    </svg>
  </IconWrapper>
);

// Other useful icons
export const SortIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  </IconWrapper>
);

export const FilterIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  </IconWrapper>
);

export const InfoIcon = ({ size, color }) => (
  <IconWrapper size={size} color={color}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  </IconWrapper>
);

// Category Rating Component
export const RatingDots = ({ rating, max = 5, activeColor, inactiveColor }) => {
  const dots = [];
  
  for (let i = 0; i < max; i++) {
    dots.push(
      <RatingDot 
        key={i}
        active={i < rating}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
      />
    );
  }
  
  return <RatingContainer>{dots}</RatingContainer>;
};

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RatingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active 
    ? props.activeColor || props.theme.colors.accent 
    : props.inactiveColor || props.theme.colors.border};
  transition: background-color 0.2s ease;
`;

// Mini Chart Components
export const MiniAreaChart = ({ data, width = '100%', height = '50px', color }) => (
  <svg width={width} height={height} viewBox="0 0 100 25" preserveAspectRatio="none">
    <path
      d={generateAreaPath(normalizeData(data), 100, 25)}
      fill={color || '#F7931A'}
      fillOpacity="0.2"
      stroke={color || '#F7931A'}
      strokeWidth="1"
    />
  </svg>
);

// Helper function to normalize data to values between 0 and 1
const normalizeData = (data) => {
  if (!data || data.length === 0) return [];
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  if (range === 0) return data.map(() => 0.5);
  
  return data.map(value => (value - min) / range);
};

// Helper function to generate SVG path for area chart
const generateAreaPath = (data, width, height) => {
  if (!data || data.length === 0) return '';
  
  const segmentWidth = width / (data.length - 1);
  
  // Generate points for the path
  let pathPoints = data.map((value, index) => 
    `${index * segmentWidth},${height - (value * height)}`
  ).join(' L ');
  
  // Create a complete path with a baseline
  return `M 0,${height} L ${pathPoints} L ${width},${height} Z`;
};