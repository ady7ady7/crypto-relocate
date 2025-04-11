// frontend/src/components/charts/ComparisonChart.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SlideUp } from '../animations';

// Horizontal comparison bar chart
export const HorizontalBarChart = ({ data, title, valueLabel, maxValue, thresholdColors }) => {
  // If no threshold colors are provided, use a single color
  const getBarColor = (value) => {
    if (!thresholdColors) return '#F7931A';
    
    // Find the appropriate color based on value thresholds
    const threshold = Object.keys(thresholdColors)
      .map(Number)
      .sort((a, b) => b - a)
      .find(threshold => value >= threshold);
      
    return threshold ? thresholdColors[threshold] : thresholdColors[0];
  };

  // Sort data in descending order for better visualization
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <ChartContainer>
      {title && <ChartTitle>{title}</ChartTitle>}
      
      <BarsContainer>
        {sortedData.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <SlideUp key={item.label} delay={`${index * 0.1}s`}>
              <BarContainer>
                <BarLabel>{item.label}</BarLabel>
                <BarWrapper>
                  <Bar 
                    width={`${percentage}%`} 
                    color={item.color || getBarColor(item.value)}
                    data-value={item.value}
                  />
                  <BarValue>{valueLabel ? `${item.value}` : item.value}</BarValue>
                </BarWrapper>
              </BarContainer>
            </SlideUp>
          );
        })}
      </BarsContainer>
    </ChartContainer>
  );
};

// Radar chart for comparison of multiple metrics
export const RadarChart = ({ data, categories, size = 300 }) => {
  // Increase the size to accommodate labels better
  const adjustedSize = size * 1.3;
  const centerX = adjustedSize / 2;
  const centerY = adjustedSize / 2;
  const radius = size * 0.3; // Smaller radius to ensure more space for labels
  const sides = categories.length;
  
  // Force distinct colors for better contrast regardless of country category
  const distinctColors = [
    '#4ab800', // Bright green for first country (always highest ranked)
    '#f8fe85', // Yellow for second country
    '#ffbd67'  // Orange for third country
  ];
  
  // Calculate points for each category axis
  const categoryPoints = categories.map((_, i) => {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });
  
  // Calculate points for the data polygon
  const getDataPoints = (values) => {
    return categories.map((_, i) => {
      const value = values[i] / 100; // Assuming values are percentages
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      return {
        x: centerX + radius * value * Math.cos(angle),
        y: centerY + radius * value * Math.sin(angle)
      };
    });
  };
  
  // Create radar webs (concentric polygons)
  const createWeb = (percentage) => {
    const points = categories.map((_, i) => {
      const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
      const dist = radius * percentage;
      return `${centerX + dist * Math.cos(angle)},${centerY + dist * Math.sin(angle)}`;
    }).join(' ');
    
    return <polygon points={points} fill="none" stroke="#444" strokeWidth="0.5" />;
  };

  // Modify opacity for better distinction (2nd and 3rd countries)
  const getCountryOpacity = (idx) => {
    // First country (highest rank) gets full opacity
    if (idx === 0) return 1;
    // Second country gets medium opacity
    if (idx === 1) return 0.9;
    // Third country gets lower opacity
    return 0.8;
  };

  return (
    <RadarChartContainer>
      <InteractionTip>
        <TipIcon>💡</TipIcon>
        Click on a country or data point for more details
      </InteractionTip>
      
      <svg width="100%" height="100%" viewBox={`0 0 ${adjustedSize} ${adjustedSize}`} preserveAspectRatio="xMidYMid meet">
        <g>
          {/* Background web */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((p, i) => (
            <React.Fragment key={`web-${i}`}>
              {createWeb(p)}
            </React.Fragment>
          ))}
          
          {/* Category axes */}
          {categoryPoints.map((point, i) => (
            <line 
              key={`axis-${i}`}
              x1={centerX} 
              y1={centerY} 
              x2={point.x} 
              y2={point.y} 
              stroke="#444" 
              strokeWidth="0.5" 
            />
          ))}
          
          {/* Draw data polygons with higher stroke width for better contrast */}
          {data.map((country, idx) => {
            const points = getDataPoints(country.values);
            const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
            const opacity = getCountryOpacity(idx);
            // Use distinct colors instead of country colors
            const color = distinctColors[idx] || country.color;
            
            return (
              <g 
                key={`country-${idx}`} 
                className="country-data"
                data-country-name={country.name}
                data-country-index={idx}
              >
                {/* First draw outlines with high contrast */}
                <polygon 
                  points={polygonPoints} 
                  fill="none" 
                  stroke={color} 
                  strokeWidth="3.5" 
                  strokeOpacity={opacity}
                  className="country-polygon"
                />
                
                {/* Then fill with semi-transparent color */}
                <polygon 
                  points={polygonPoints} 
                  fill={color} 
                  fillOpacity={opacity * 0.4} 
                  stroke="none" 
                  className="country-polygon"
                />
                
                {/* Add larger points at each vertex for better visibility */}
                {points.map((point, i) => (
                  <g 
                    key={`point-${idx}-${i}`}
                    className="data-point"
                    data-country-name={country.name}
                    data-country-index={idx}
                    data-category-idx={i}
                  >
                    {/* Outer glow for contrast */}
                    <circle 
                      cx={point.x} 
                      cy={point.y} 
                      r="6" 
                      fill="rgba(0,0,0,0.5)" 
                      className="point-shadow"
                    />
                    
                    {/* Main point */}
                    <circle 
                      cx={point.x} 
                      cy={point.y} 
                      r="5" 
                      fill={color} 
                      stroke="#fff"
                      strokeWidth="1.5"
                      fillOpacity={opacity}
                      className="point-circle"
                    />
                    
                    {/* Tooltip hitbox with hover data */}
                    <circle 
                      cx={point.x} 
                      cy={point.y} 
                      r="12" 
                      fill="transparent"
                      className="radar-point-hitbox"
                      data-country={country.name}
                      data-country-index={idx}
                      data-category={categories[i]}
                      data-value={country.values[i]}
                    />
                  </g>
                ))}
              </g>
            );
          })}
          
          {/* Category labels with better positioning - place AFTER the data to ensure they're on top */}
          {categoryPoints.map((point, i) => {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
            
            // Significantly increased label offset for better visibility
            const labelOffset = radius * 0.4; 
            const x = centerX + (radius + labelOffset) * Math.cos(angle);
            const y = centerY + (radius + labelOffset) * Math.sin(angle);
            
            // Adjust text-anchor based on position
            const anchor = 
              Math.abs(angle - (-Math.PI / 2)) < 0.1 ? 'middle' :
              Math.abs(angle - (Math.PI / 2)) < 0.1 ? 'middle' :
              angle > Math.PI / 2 || angle < -Math.PI / 2 ? 'end' : 'start';
            
            // Create background for better readability
            return (
              <g key={`label-${i}`}>
                {/* Text background/halo for better readability */}
                <text 
                  x={x} 
                  y={y} 
                  fontSize="13" 
                  textAnchor={anchor} 
                  fill="black"
                  strokeWidth="4"
                  stroke="rgba(30, 30, 30, 0.8)"
                  paintOrder="stroke"
                >
                  {categories[i]}
                </text>
                
                {/* Actual text */}
                <text 
                  x={x} 
                  y={y} 
                  fontSize="13" 
                  textAnchor={anchor} 
                  fill="white"
                  fontWeight="bold"
                >
                  {categories[i]}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      
      {/* Enhanced legend for countries with better contrast */}
      <ChartLegend>
        {data.map((country, idx) => {
          const opacity = getCountryOpacity(idx);
          // Use distinct colors instead of country colors
          const color = distinctColors[idx] || country.color;
          
          return (
            <LegendItem 
              key={`legend-${idx}`} 
              className="country-legend-item"
              data-country-name={country.name}
              data-country-index={idx}
            >
              <LegendColorBox color={color} opacity={opacity}>
                <LegendColorCircle color={color} opacity={opacity} />
              </LegendColorBox>
              <LegendText>{country.name}</LegendText>
            </LegendItem>
          );
        })}
      </ChartLegend>
      
      {/* Enhanced tooltip for displaying values on hover */}
      <RadarTooltip id="radar-tooltip">
        <span className="country"></span>
        <span className="value"></span>
      </RadarTooltip>
    </RadarChartContainer>
  );
};

// Panning Stats Card with mini chart
export const StatCard = ({ title, value, change, chartData, icon: Icon, decreaseIsBad = true }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;
  const changeClass = isPositive ? (decreaseIsBad ? 'bad' : 'good') : 
                     isNegative ? (decreaseIsBad ? 'good' : 'bad') : '';

  return (
    <StatCardContainer>
      <StatCardHeader>
        {Icon && <Icon size="20px" />}
        <StatCardTitle>{title}</StatCardTitle>
      </StatCardHeader>
      
      <StatCardValue>{value}</StatCardValue>
      
      {change !== undefined && (
        <StatCardChange className={changeClass}>
          {isPositive ? '↑' : isNegative ? '↓' : ''}
          {Math.abs(change)}%
        </StatCardChange>
      )}
      
      {chartData && (
        <StatCardChart>
          <MiniAreaChart 
            data={chartData} 
            height="30px" 
            color={isNegative ? (decreaseIsBad ? '#4CAF50' : '#F44336') : 
                 isPositive ? (decreaseIsBad ? '#F44336' : '#4CAF50') : 
                 '#F7931A'} 
          />
        </StatCardChart>
      )}
    </StatCardContainer>
  );
};

// Styled components
const ChartContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const BarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BarLabel = styled.div`
  width: 120px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondaryText || '#B3B3B3'};
  text-align: right;
`;

const BarWrapper = styled.div`
  flex: 1;
  height: 24px;
  background-color: ${props => props.theme.colors.secondaryBackground || '#333'};
  border-radius: ${props => props.theme.borderRadius.sm || '4px'};
  position: relative;
`;

const Bar = styled.div`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color || props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.sm || '4px'};
  transition: width 1s ease;
  position: relative;
`;

const BarValue = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text || '#FFFFFF'};
  font-size: 0.8rem;
  font-weight: bold;
`;

// Radar chart specific styled components
const RadarChartContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 390px; /* Increased height to accommodate the tooltip */
  margin-bottom: 20px;
  
  /* Add hover effect for visualization points */
  .radar-point-hitbox {
    cursor: pointer;
    &:hover {
      fill: rgba(255, 255, 255, 0.2);
    }
  }
  
  /* Make the SVG responsive */
  svg {
    width: 100%;
    height: 100%;
    max-width: 400px; /* Maximum width to maintain readability */
  }
  
  /* Styling for highlighting selected country */
  .country-data.dimmed {
    .country-polygon {
      stroke-opacity: 0.3;
      fill-opacity: 0.1;
    }
    
    .point-circle {
      fill-opacity: 0.3;
    }
    
    .point-shadow {
      opacity: 0.3;
    }
  }
  
  .country-data.highlighted {
    .country-polygon {
      stroke-opacity: 1;
      fill-opacity: 0.5;
    }
    
    .point-circle {
      fill-opacity: 1;
    }
    
    .point-shadow {
      opacity: 1;
    }
  }
  
  /* Styles for legend items when highlighting */
  .country-legend-item.dimmed {
    opacity: 0.4;
  }
  
  .country-legend-item.highlighted {
    transform: translateY(-3px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  @media (max-width: 768px) {
    height: 350px;
  }
  
  @media (max-width: 480px) {
    height: 330px;
  }
`;

// Interaction tip at the top of the chart
const InteractionTip = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accent || '#F7931A'};
  background-color: rgba(247, 147, 26, 0.1);
  border: 1px solid rgba(247, 147, 26, 0.2);
  border-radius: 20px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TipIcon = styled.span`
  margin-right: 6px;
  font-size: 1rem;
`;

const RadarTooltip = styled.div`
  position: absolute;
  background-color: rgba(20, 20, 20, 0.95);
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 1000;
  font-size: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  .country {
    font-weight: bold;
    display: block;
    margin-bottom: 6px;
    color: white;
  }
  
  .value {
    color: #e0e0e0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: rgba(20, 20, 20, 0.95) transparent transparent transparent;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 4px;
  padding: 10px;
  background-color: rgba(30, 30, 30, 0.7);
  border-radius: 8px;
  width: fit-content;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);
  }
`;

const LegendColorBox = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const LegendColorCircle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 0 4px ${props => props.color}; /* Glow effect */
  opacity: ${props => props.opacity || 1};
`;

const LegendText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text || '#FFFFFF'};
`;

// Mini stats card
const StatCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground || '#333'};
  border-radius: ${({ theme }) => theme.borderRadius.md || '8px'};
  padding: ${({ theme }) => theme.spacing.md || '1rem'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const StatCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm || '0.5rem'};
  margin-bottom: ${({ theme }) => theme.spacing.sm || '0.5rem'};
`;

const StatCardTitle = styled.h4`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondaryText || '#B3B3B3'};
  margin: 0;
`;

const StatCardValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text || '#FFFFFF'};
  margin-bottom: ${({ theme }) => theme.spacing.xs || '0.25rem'};
`;

const StatCardChange = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  
  &.good {
    color: ${({ theme }) => theme.colors.success || '#4CAF50'};
  }
  
  &.bad {
    color: ${({ theme }) => theme.colors.danger || '#F44336'};
  }
`;

const StatCardChart = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm || '0.5rem'};
`;

// Export these components from the module
export const MiniAreaChart = ({ data, width = '100%', height = '50px', color }) => {
  // Normalize data for the chart
  const normalizedData = normalizeData(data || [50, 60, 70, 60, 90, 80, 70]);
  
  return (
    <svg width={width} height={height} viewBox="0 0 100 25" preserveAspectRatio="none">
      <path
        d={generateAreaPath(normalizedData, 100, 25)}
        fill={color || '#F7931A'}
        fillOpacity="0.2"
        stroke={color || '#F7931A'}
        strokeWidth="1"
      />
    </svg>
  );
};

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