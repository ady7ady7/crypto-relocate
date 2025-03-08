// frontend/src/components/charts/ComparisonChart.js
import React from 'react';
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

  return (
    <ChartContainer>
      {title && <ChartTitle>{title}</ChartTitle>}
      
      <BarsContainer>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <SlideUp key={item.label} delay={`${index * 0.1}s`}>
              <BarContainer>
                <BarLabel>{item.label}</BarLabel>
                <BarWrapper>
                  <Bar 
                    width={`${percentage}%`} 
                    color={getBarColor(item.value)}
                    data-value={item.value}
                  />
                  <BarValue>{valueLabel ? `${item.value} ${valueLabel}` : item.value}</BarValue>
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
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  const sides = categories.length;
  
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

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g>
        {/* Background web */}
        {[0.2, 0.4, 0.6, 0.8, 1].map(p => createWeb(p))}
        
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
        
        {/* Category labels */}
        {categoryPoints.map((point, i) => {
          const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
          const labelOffset = 15;
          const x = point.x + (Math.cos(angle) * labelOffset);
          const y = point.y + (Math.sin(angle) * labelOffset);
          const anchor = 
            angle === -Math.PI / 2 ? 'middle' :
            angle < -Math.PI / 2 || angle > Math.PI / 2 ? 'end' : 'start';
          
          return (
            <text 
              key={`label-${i}`}
              x={x} 
              y={y} 
              fontSize="10" 
              textAnchor={anchor} 
              fill="#FFFFFF"
            >
              {categories[i]}
            </text>
          );
        })}
        
        {/* Data for each country */}
        {data.map((country, idx) => {
          const points = getDataPoints(country.values);
          const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');
          
          return (
            <g key={`country-${idx}`}>
              <polygon 
                points={polygonPoints} 
                fill={country.color} 
                fillOpacity="0.5" 
                stroke={country.color} 
                strokeWidth="2" 
              />
            </g>
          );
        })}
      </g>
    </svg>
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
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: right;
`;

const BarWrapper = styled.div`
  flex: 1;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
`;

const Bar = styled.div`
  height: 100%;
  width: ${props => props.width};
  background-color: ${props => props.color || props.theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: width 1s ease;
  position: relative;
  
  &::after {
    content: attr(data-value);
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
`;

const BarValue = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  font-weight: bold;
`;

// Mini stats card
const StatCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;

const StatCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatCardTitle = styled.h4`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin: 0;
`;

const StatCardValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatCardChange = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  
  &.good {
    color: ${({ theme }) => theme.colors.success};
  }
  
  &.bad {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const StatCardChart = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
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