// frontend/src/components/FeatureHighlights.js
import React from 'react';
import styled from 'styled-components';
import { ScrollReveal } from './animations';
import { TaxIcon, WealthIcon, ResidencyIcon, BankIcon } from './illustrations/Icons';
import { Colors } from './styles/Colors';

const FeatureHighlights = () => {
  const features = [
    {
      title: 'Tax Optimization',
      description: 'Discover countries with favorable capital gains tax policies for crypto investments.',
      icon: TaxIcon,
      color: Colors.success
    },
    {
      title: 'Wealth Preservation',
      description: 'Find jurisdictions without wealth taxes to protect your crypto assets.',
      icon: WealthIcon,
      color: Colors.countryFavorable
    },
    {
      title: 'Residency Programs',
      description: 'Explore residency and citizenship options through investment programs.',
      icon: ResidencyIcon,
      color: Colors.warning
    },
    {
      title: 'Financial Services',
      description: 'Access crypto-friendly banking and financial infrastructure.',
      icon: BankIcon,
      color: Colors.accent
    }
  ];

  return (
    <FeaturesSection>
      <ScrollReveal>
        <SectionTitle>Key Features</SectionTitle>
      </ScrollReveal>
      
      <FeaturesGrid>
        {features.map((feature, index) => (
          <ScrollReveal key={index}>
            <FeatureCard>
              <FeatureIconWrapper color={feature.color}>
                <feature.icon size="32px" />
              </FeatureIconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          </ScrollReveal>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
};

// Styled components
const FeaturesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  min-height: 260px; /* Set a minimum height for all cards */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
  
  @media (max-width: 768px) {
    min-height: 230px;
  }
  
  @media (max-width: 576px) {
    min-height: auto; /* Allow cards to adjust to content on mobile */
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const FeatureIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => `${color}22`};
  color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
  line-height: 1.5;
  /* Make sure the text takes the same height regardless of content length */
  flex-grow: 1;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

export default FeatureHighlights;