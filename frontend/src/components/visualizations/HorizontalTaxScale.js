// frontend/src/components/visualizations/HorizontalTaxScale.js
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Pulse animation for the marker
const pulseBorder = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const ScaleContainer = styled.div`
  width: 100%;
  margin: 20px 0 40px;
  position: relative;
`;

const ScaleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  padding-bottom: 10px;
  border-bottom: 1px dotted ${props => props.theme.colors.border || '#333'};
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const CountryLabel = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text || '#FFFFFF'};
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ScaleWrapper = styled.div`
  position: relative;
  padding: 35px 0 25px;
  margin: 0 10px;
`;

const Scale = styled.div`
  width: 100%;
  height: 18px;
  border-radius: 9px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to right,
    #4CAF50, /* 0% - Excellent (green) */
    #8BC34A, /* ~10% - Good (light green) */
    #CDDC39, /* ~20% - Fair (lime) */
    #FFC107, /* ~30% - Moderate (amber) */
    #FF9800, /* ~40% - Poor (orange) */
    #F44336  /* 50%+ - Bad (red) */
  );
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const TierMarks = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 20px;
`;

const TierMark = styled.div`
  position: absolute;
  left: ${props => props.position}%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: ${props => props.theme.colors.secondaryText || '#B3B3B3'};
  text-align: center;
  
  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    height: 4px;
    width: 1px;
    background-color: ${props => props.theme.colors.secondaryText || '#B3B3B3'};
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
  
  @media (max-width: 360px) {
    /* Hide the middle values on very small screens to prevent overlap */
    &:nth-child(2), &:nth-child(4) {
      visibility: hidden;
    }
  }
`;

const Marker = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.position}%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: ${props => props.color || '#FFFFFF'};
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 5;
  animation: ${pulseBorder} 2s infinite;

  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid white;
  }
  
  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
  }
`;

const ValueLabel = styled.div`
  position: absolute;
  top: -40px;
  left: ${props => props.position}%;
  transform: translateX(-50%);
  background-color: ${props => props.color || '#FFFFFF'};
  color: ${props => props.textColor || '#000000'};
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid ${props => props.color || '#FFFFFF'};
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 5px 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 4px 8px;
  }
`;

const InfoText = styled.div`
  margin-top: 30px;
  padding: 0 5px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondaryText || '#B3B3B3'};
  line-height: 1.6;
  text-align: justify;
  
  @media (max-width: 768px) {
    margin-top: 25px;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    font-size: 0.8rem;
    line-height: 1.5;
  }
`;

/**
 * HorizontalTaxScale - A gradient scale showing tax rates with a country marker
 * 
 * @param {string} countryName - The name of the country
 * @param {string} taxValue - The tax rate as a string (e.g. "0%", "25%")
 * @param {number} maxTaxRate - The maximum tax rate to display on the scale (default: 50)
 * @param {string} infoText - Optional explanatory text to display below the scale
 */
const HorizontalTaxScale = ({ 
  countryName, 
  taxValue, 
  maxTaxRate = 50,
  infoText
}) => {
  // Parse the tax rate from the string (e.g. "15%" -> 15)
  const numericTaxRate = parseFloat(taxValue) || 0;
  
  // Calculate the position as a percentage of the expanded scale (from -5% to 55%)
  // Convert numerical positions to match our tier markings positions
  const calculateScalePosition = (rate) => {
    // Adjust the tax rate to fit our scale that goes from 0% to 50%+
    const adjustedRate = Math.min(50, Math.max(0, rate));
    
    // Calculate position to match tier markings
    // 0% = 8.33%, 10% = 25%, 20% = 41.67%, 30% = 58.33%, 40% = 75%, 50%+ = 91.67%
    return 8.33 + (adjustedRate / 50) * (91.67 - 8.33);
  };
  
  const position = calculateScalePosition(numericTaxRate);
  
  // Get the appropriate color based on the tax rate
  const getMarkerColor = (rate) => {
    if (rate === 0) return '#4CAF50'; // Excellent (green)
    if (rate < 10) return '#8BC34A'; // Good (light green)
    if (rate < 20) return '#CDDC39'; // Fair (lime)
    if (rate < 30) return '#FFC107'; // Moderate (amber)
    if (rate < 40) return '#FF9800'; // Poor (orange)
    return '#F44336'; // Bad (red)
  };
  
  const markerColor = getMarkerColor(numericTaxRate);
  
  // Calculate text color for the value label (dark text on light backgrounds)
  const getTextColor = (color) => {
    return ['#4CAF50', '#8BC34A', '#CDDC39'].includes(color) ? '#000000' : '#FFFFFF';
  };

  return (
    <ScaleContainer>
      <ScaleHeader>
        <CountryLabel>{countryName} Capital Gains Tax</CountryLabel>
      </ScaleHeader>
      
      <ScaleWrapper>
        <ValueLabel 
          position={position} 
          color={markerColor}
          textColor={getTextColor(markerColor)}
        >
          {taxValue}
        </ValueLabel>
        
        <Scale />
        
        <Marker position={position} color={markerColor} />
        
        <TierMarks>
          <TierMark position={8.33}>0%</TierMark>
          <TierMark position={25}>10%</TierMark>
          <TierMark position={41.67}>20%</TierMark>
          <TierMark position={58.33}>30%</TierMark>
          <TierMark position={75}>40%</TierMark>
          <TierMark position={91.67}>50%+</TierMark>
        </TierMarks>
      </ScaleWrapper>
      
      {infoText && <InfoText>{infoText}</InfoText>}
    </ScaleContainer>
  );
};

export default HorizontalTaxScale;