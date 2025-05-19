import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { desktopCoordinates } from './maps/CountryCoordinates';
import { getCategoryColor } from './styles/Colors';

// Main container for bubbles
const BubblesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 15;
`;

// Individual country bubble
const CountryBubble = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color || '#F7931A'};
  border: 2px solid #FFFFFF;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-width 0.3s ease;
  pointer-events: auto;
  z-index: 15;
  cursor: pointer;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    &:hover {
      width: 18px;
      height: 18px;
      z-index: 25;
    }
  }
  
  &.active {
    width: 18px;
    height: 18px;
    z-index: 25;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.accent};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 10px;
    height: 10px;
    border-width: 1.5px;
    
    &.active {
      width: 15px;
      height: 15px;
    }
  }
`;

// Tooltip container that will be rendered in a portal
const TooltipPortal = styled.div`
  position: fixed; /* Change to fixed positioning */
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  border-radius: 6px;
  min-width: 180px;
  width: max-content;
  max-width: 220px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0;
  z-index: 9999; /* Extremely high to ensure it's above everything */
  pointer-events: auto;
  transition: opacity 0.3s ease;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  
  &::after {
    content: '';
    position: absolute;
    border-width: 6px;
    border-style: solid;
  }
  
  &.tooltip-arrow-bottom::after {
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border-color: rgba(0, 0, 0, 0.85) transparent transparent transparent;
  }
  
  &.tooltip-arrow-top::after {
    bottom: 100%;
    left: 50%;
    margin-left: -6px;
    border-color: transparent transparent rgba(0, 0, 0, 0.85) transparent;
  }
`;

// Country name header in the tooltip
const TooltipHeader = styled.div`
  background-color: ${props => props.color || '#F7931A'};
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px 6px 0 0;
  text-align: center;
  font-size: 14px;
`;

// Tooltip content
const TooltipContent = styled.div`
  padding: 8px 12px;
  font-size: 12px;
`;

// Individual info line in tooltip
const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  gap: 10px;
  
  span:first-child {
    font-weight: 500;
    color: #ccc;
  }
  
  span:last-child {
    font-weight: 600;
  }
`;

// "Click to learn more" prompt
const LearnMorePrompt = styled.div`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  text-align: center;
  padding: 6px 0;
  font-size: 11px;
  font-weight: 500;
  border-radius: 0 0 6px 6px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

const CountryBubbles = ({ countries = [], activeContinent = null }) => {
  const containerRef = useRef();
  const bubbleRefs = useRef({});
  const [bubblePositions, setBubblePositions] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, placement: 'bottom' });
  const navigate = useNavigate();
  
  // Calculate tooltip position based on bubble position
  const calculateTooltipPosition = (countryId) => {
    const bubbleEl = bubbleRefs.current[countryId];
    if (!bubbleEl) return { top: 0, left: 0, placement: 'bottom' };
    
    const rect = bubbleEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Default position below the bubble
    let top = rect.bottom + 8;
    let left = rect.left + rect.width / 2;
    let placement = 'bottom';
    
    // Check if tooltip would extend below viewport
    const tooltipHeight = 180; // Approximate height, adjust as needed
    const tooltipWidth = 200;  // Approximate width, adjust as needed
    
    // If tooltip would go below viewport, place it above the bubble
    if (top + tooltipHeight > viewportHeight) {
      top = rect.top - 8;
      placement = 'top';
    }
    
    // Check horizontal positioning
    if (left + tooltipWidth / 2 > viewportWidth) {
      left = viewportWidth - tooltipWidth / 2 - 10;
    } else if (left - tooltipWidth / 2 < 10) {
      left = tooltipWidth / 2 + 10;
    }
    
    return { top, left, placement };
  };
  
  // Handle bubble mouse enter (desktop)
  const handleBubbleMouseEnter = (country) => {
    if (window.innerWidth >= 768) { // Desktop only
      setHoveredCountry(country.id);
      setTooltipPosition(calculateTooltipPosition(country.id));
    }
  };
  
  // Handle bubble mouse leave (desktop)
  const handleBubbleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Desktop only
      setHoveredCountry(null);
    }
  };
  
  // Handle bubble click
  const handleBubbleClick = (country, event) => {
    if (window.innerWidth < 768) { // Mobile behavior
      event.preventDefault(); // Prevent navigation on first click
      
      if (activeCountry === country.id) {
        // Navigate to country page on second click
        navigate(`/country/${country.id}`);
      } else {
        // Set as active on first click (show tooltip)
        setActiveCountry(country.id);
        setTooltipPosition(calculateTooltipPosition(country.id));
      }
    } else {
      // Desktop behavior: navigate directly
      navigate(`/country/${country.id}`);
    }
  };
  
  // Handle "Click to learn more" button click
  const handleLearnMoreClick = (countryId, event) => {
    event.stopPropagation(); // Prevent the bubble click handler from firing
    navigate(`/country/${countryId}`);
  };
  
  // Close active tooltip when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If we click outside a bubble or tooltip, clear active country
      if (activeCountry && 
          !event.target.closest('.country-bubble') && 
          !event.target.closest('.tooltip-portal')) {
        setActiveCountry(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeCountry]);
  
  // Calculate bubble positions based on container size and map aspect ratio
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Original map aspect ratio (adjust these values to match your SVG viewBox)
    const originalMapWidth = 468;
    const originalMapHeight = 239;
    const mapAspectRatio = originalMapWidth / originalMapHeight;
    
    const calculatePositions = () => {
      const container = containerRef.current;
      if (!container) return [];
      
      const { width, height } = container.getBoundingClientRect();
      
      // Current container aspect ratio
      const containerAspectRatio = width / height;
      
      // Calculate scaling factors based on aspect ratio differences
      let scaleX = 1;
      let scaleY = 1;
      let offsetX = 0;
      let offsetY = 0;
      
      if (containerAspectRatio > mapAspectRatio) {
        // Container is wider than the map's aspect ratio
        const actualMapWidth = height * mapAspectRatio;
        offsetX = (width - actualMapWidth) / 2; // Center the map horizontally
        scaleX = actualMapWidth / originalMapWidth;
        scaleY = height / originalMapHeight;
      } else {
        // Container is taller than the map's aspect ratio
        const actualMapHeight = width / mapAspectRatio;
        offsetY = (height - actualMapHeight) / 2; // Center the map vertically
        scaleX = width / originalMapWidth;
        scaleY = actualMapHeight / originalMapHeight;
      }
      
      // Calculate positions with the map's scale and offset
      return desktopCoordinates.map(country => {
        // Convert percentage coordinates to actual pixels
        const xPos = (country.x / 100) * originalMapWidth * scaleX + offsetX;
        const yPos = (country.y / 100) * originalMapHeight * scaleY + offsetY;
        
        return {
          ...country,
          xPosition: xPos,
          yPosition: yPos
        };
      });
    };
    
    // Set initial positions
    setBubblePositions(calculatePositions());
    
    // Use requestAnimationFrame for smooth updates during resize
    let rafId = null;
    const handleResize = () => {
      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      // Schedule a new animation frame
      rafId = requestAnimationFrame(() => {
        setBubblePositions(calculatePositions());
        
        // Update tooltip position if any is active
        if (activeCountry) {
          setTooltipPosition(calculateTooltipPosition(activeCountry));
        } else if (hoveredCountry) {
          setTooltipPosition(calculateTooltipPosition(hoveredCountry));
        }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [activeCountry, hoveredCountry]);
  
  // Render tooltip content and create portal
  const renderTooltip = () => {
    // Determine which country to show in tooltip
    const countryId = activeCountry || hoveredCountry;
    if (!countryId) return null;
    
    // Find country data
    const country = bubblePositions.find(c => c.id === countryId);
    if (!country) return null;
    
    // Find matching data
    const countryData = countries.find(c => 
      c.code?.toLowerCase() === country.id || 
      c.name?.toLowerCase() === country.name.toLowerCase()
    );
    
    // Get appropriate color
    const color = countryData?.category 
      ? getCategoryColor(countryData.category) 
      : '#F7931A';
    
    // Determine whether tooltip should be shown
    const show = activeCountry === countryId || hoveredCountry === countryId;
    
    return createPortal(
      <TooltipPortal 
        className={`tooltip-portal tooltip-arrow-${tooltipPosition.placement}`}
        style={{
          top: tooltipPosition.placement === 'top' ? 
            `${tooltipPosition.top - 8}px` : `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: 'translate(-50%, 0)'
        }}
        show={show}
      >
        <TooltipHeader color={color}>
          {country.name}
          {countryData?.rank && ` (#${countryData.rank})`}
        </TooltipHeader>
        
        <TooltipContent>
          <InfoLine>
            <span>Capital Gains:</span>
            <span>{countryData?.capitalGainsTax || 'N/A'}</span>
          </InfoLine>
          <InfoLine>
            <span>Financial Services:</span>
            <span>{countryData?.financialServices || 'N/A'}</span>
          </InfoLine>
        </TooltipContent>
        
        <LearnMorePrompt 
          onClick={(e) => handleLearnMoreClick(country.id, e)}
        >
          Click to learn more
        </LearnMorePrompt>
      </TooltipPortal>,
      document.body
    );
  };
  
  return (
    <>
      <BubblesContainer ref={containerRef}>
        {bubblePositions.map(country => {
          // Only show bubbles for the active continent if one is selected
          const visible = !activeContinent || country.continent === activeContinent;
          
          // Find matching country data from the app's country list
          const countryData = countries.find(c => 
            c.code?.toLowerCase() === country.id || 
            c.name?.toLowerCase() === country.name.toLowerCase()
          );
          
          // Get appropriate color from the country's category
          const color = countryData?.category 
            ? getCategoryColor(countryData.category) 
            : '#F7931A'; // Default to accent color
          
          // Check if this is the active country (for mobile)
          const isActive = activeCountry === country.id;
            
          return (
            <CountryBubble
              key={country.id}
              ref={el => bubbleRefs.current[country.id] = el}
              className={`country-bubble ${isActive ? 'active' : ''}`}
              style={{
                left: `${country.xPosition}px`, 
                top: `${country.yPosition}px`,
                display: visible ? 'block' : 'none'
              }}
              color={color}
              onClick={(e) => handleBubbleClick(country, e)}
              onMouseEnter={() => handleBubbleMouseEnter(country)}
              onMouseLeave={handleBubbleMouseLeave}
            />
          );
        })}
      </BubblesContainer>
      
      {/* Render tooltip in portal */}
      {renderTooltip()}
    </>
  );
};

export default CountryBubbles;