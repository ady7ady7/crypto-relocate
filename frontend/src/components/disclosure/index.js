// frontend/src/components/disclosure/index.js
import React, { useState } from 'react';
import styled from 'styled-components';

// Collapsible Component
export const Collapsible = ({ title, children, initiallyExpanded = false, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  return (
    <CollapsibleContainer>
      <CollapsibleHeader 
        onClick={() => setIsExpanded(!isExpanded)}
        expanded={isExpanded}
      >
        {Icon && <Icon size="20px" />}
        <CollapsibleTitle>{title}</CollapsibleTitle>
        <CollapsibleIcon expanded={isExpanded}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </CollapsibleIcon>
      </CollapsibleHeader>
      
      <CollapsibleContent expanded={isExpanded}>
        {children}
      </CollapsibleContent>
    </CollapsibleContainer>
  );
};

// Read More Component
export const ReadMore = ({ text, maxChars = 150, btnText = "Read more" }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Don't truncate if text is shorter than maxChars
  if (text.length <= maxChars) {
    return <p>{text}</p>;
  }
  
  const truncatedText = expanded
    ? text
    : `${text.substring(0, maxChars)}...`;
  
  return (
    <div>
      <p>{truncatedText}</p>
      <ReadMoreButton onClick={() => setExpanded(!expanded)}>
        {expanded ? "Show less" : btnText}
      </ReadMoreButton>
    </div>
  );
};

// Tabbed Panel
export const TabbedPanel = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabbedContainer>
      <TabsHeader>
        {tabs.map((tab, index) => (
          <TabButton 
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon && <tab.icon size="16px" />}
            {tab.label}
          </TabButton>
        ))}
      </TabsHeader>
      
      <TabContent>
        {tabs[activeTab].content}
      </TabContent>
    </TabbedContainer>
  );
};

// InfoTooltip Component
export const InfoTooltip = ({ content, children, position = 'top' }) => {
  return (
    <TooltipContainer>
      {children}
      <TooltipContent position={position}>
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

// Accordion Group - for multiple collapsibles
export const AccordionGroup = ({ items, allowMultiple = false }) => {
  const [expandedItems, setExpandedItems] = useState(
    allowMultiple ? [] : null
  );
  
  const toggleItem = (index) => {
    if (allowMultiple) {
      setExpandedItems(prev => 
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setExpandedItems(prev => prev === index ? null : index);
    }
  };
  
  const isExpanded = (index) => {
    return allowMultiple
      ? expandedItems.includes(index)
      : expandedItems === index;
  };
  
  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader 
            onClick={() => toggleItem(index)}
            expanded={isExpanded(index)}
          >
            {item.icon && <item.icon size="18px" />}
            <AccordionTitle>{item.title}</AccordionTitle>
            <AccordionIcon expanded={isExpanded(index)}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </AccordionIcon>
          </AccordionHeader>
          
          <AccordionContent expanded={isExpanded(index)}>
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

// Details component with inline expanding
export const ExpandableDetails = ({ summary, children }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <DetailsContainer>
      <DetailsSummary onClick={() => setExpanded(!expanded)}>
        {summary}
        <DetailsIcon expanded={expanded}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {expanded ? (
              <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
              <polyline points="6 9 12 15 18 9"></polyline>
            )}
          </svg>
        </DetailsIcon>
      </DetailsSummary>
      
      <DetailsContent expanded={expanded}>
        {children}
      </DetailsContent>
    </DetailsContainer>
  );
};

// Styled Components
const CollapsibleContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
`;

const CollapsibleHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, expanded }) => 
    expanded ? theme.colors.secondaryBackground : theme.colors.background};
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
`;

const CollapsibleTitle = styled.h3`
  flex: 1;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const CollapsibleIcon = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

const CollapsibleContent = styled.div`
  max-height: ${({ expanded }) => expanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${({ expanded, theme }) => expanded ? theme.spacing.md : '0 ' + theme.spacing.md};
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TabbedContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ active, theme }) => 
    active ? theme.colors.secondaryBackground : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.accent : theme.colors.secondaryText};
  border: none;
  cursor: pointer;
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
  
  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
  
  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

const TooltipContent = styled.div`
  position: absolute;
  visibility: hidden;
  opacity: 0;
  z-index: 100;
  width: 200px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  
  ${({ position }) => {
    if (position === 'top') {
      return `
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
      `;
    } else if (position === 'bottom') {
      return `
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 5px;
      `;
    } else if (position === 'left') {
      return `
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 5px;
      `;
    } else if (position === 'right') {
      return `
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 5px;
      `;
    }
  }}
  
  &::after {
    content: '';
    position: absolute;
    
    ${({ position }) => {
      if (position === 'top') {
        return `
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: ${({ theme }) => theme.colors.secondaryBackground} transparent transparent transparent;
        `;
      } else if (position === 'bottom') {
        return `
          bottom: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent ${({ theme }) => theme.colors.secondaryBackground} transparent;
        `;
      } else if (position === 'left') {
        return `
          top: 50%;
          left: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent ${({ theme }) => theme.colors.secondaryBackground};
        `;
      } else if (position === 'right') {
        return `
          top: 50%;
          right: 100%;
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent ${({ theme }) => theme.colors.secondaryBackground} transparent transparent;
        `;
      }
    }}
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondaryText};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const AccordionContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const AccordionItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme, expanded }) => 
    expanded ? theme.colors.secondaryBackground : theme.colors.background};
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
`;

const AccordionTitle = styled.h3`
  flex: 1;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const AccordionIcon = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

const AccordionContent = styled.div`
  max-height: ${({ expanded }) => expanded ? '1000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${({ expanded, theme }) => expanded ? theme.spacing.md : '0 ' + theme.spacing.md};
`;

const DetailsContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DetailsSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DetailsIcon = styled.div`
  transition: transform 0.3s ease;
  transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
`;

const DetailsContent = styled.div`
  max-height: ${({ expanded }) => expanded ? '500px' : '0'};
  opacity: ${({ expanded }) => expanded ? '1' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  padding-left: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ expanded, theme }) => expanded ? theme.spacing.xs : '0'};
  margin-bottom: ${({ expanded, theme }) => expanded ? theme.spacing.md : '0'};
`;