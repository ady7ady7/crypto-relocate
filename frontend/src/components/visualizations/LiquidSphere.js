// frontend/src/components/visualizations/LiquidSphere.js
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Wave animation effect
const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%) translateZ(0);
  }
  100% {
    transform: translateX(100%) translateZ(0);
  }
`;

// Pulse animation for outstanding values
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const SphereContainer = styled.div`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 auto;
`;

const Sphere = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  border: 3px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.15);
    z-index: 10;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -10%;
    width: 120%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0) 60%
    );
    transform: scale(1.8) translateY(-30%) rotate(-20deg);
    pointer-events: none;
  }
`;

const Liquid = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.fillPercentage}%;
  background: ${props => props.color};
  transition: height 1s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  border-radius: 0 0 50% 50% / 0 0 15% 15%;
  animation: ${props => props.fillPercentage > 85 ? pulseAnimation : 'none'} 3s infinite ease-in-out;
  
  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10%;
    width: 120%;
    height: 20px;
    background: ${props => props.color};
    border-radius: 50%;
    animation: ${waveAnimation} ${props => 3 + Math.random() * 2}s infinite linear;
    opacity: 0.8;
  }

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -10%;
    width: 120%;
    height: 10px;
    background: ${props => props.color};
    border-radius: 50%;
    animation: ${waveAnimation} ${props => 2 + Math.random() * 2}s infinite linear reverse;
    opacity: 0.3;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  text-align: center;
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.text || '#FFFFFF'};
`;

const Value = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => props.color || props.theme.colors.accent || '#F7931A'};
`;

const AdditionalInfo = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.secondaryText || '#B3B3B3'};
  margin-top: 5px;
`;

const LiquidSphere = ({ 
  label,
  value,
  size = 120,
  color = '#4CAF50',
  fillPercentage = 50,
  additionalInfo 
}) => {
  const sphereRef = useRef(null);
  
  useEffect(() => {
    // Add any additional initialization logic here if needed
    const sphere = sphereRef.current;
    if (sphere) {
      // Could add more dynamic effects here
    }
  }, []);

  return (
    <div>
      <SphereContainer size={size} ref={sphereRef}>
        <Sphere>
          <Liquid 
            fillPercentage={fillPercentage} 
            color={color}
          />
        </Sphere>
      </SphereContainer>
      <LabelContainer>
        <Label>{label}</Label>
        <Value color={color}>{value}</Value>
        {additionalInfo && <AdditionalInfo>{additionalInfo}</AdditionalInfo>}
      </LabelContainer>
    </div>
  );
};

export default LiquidSphere;