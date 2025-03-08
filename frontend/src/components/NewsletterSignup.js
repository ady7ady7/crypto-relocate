// frontend/src/components/NewsletterSignup.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { ScrollReveal, pulseAnimation } from './animations';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };
  
  return (
    <ScrollReveal>
      <NewsletterSection>
        <NewsletterContainer>
          <NewsletterContent>
            <NewsletterTitle>Stay Updated</NewsletterTitle>
            <NewsletterDescription>
              Get the latest updates on crypto regulations, tax changes, and new residency opportunities.
            </NewsletterDescription>
            
            {submitted ? (
              <SuccessMessage>
                <SuccessIcon>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </SuccessIcon>
                <div>Thanks for subscribing! Check your email for confirmation.</div>
              </SuccessMessage>
            ) : (
              <NewsletterForm onSubmit={handleSubmit}>
                <NewsletterInput
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <SubscribeButton type="submit">Subscribe</SubscribeButton>
              </NewsletterForm>
            )}
          </NewsletterContent>
          
          <NewsletterDecoration>
            <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </NewsletterDecoration>
        </NewsletterContainer>
      </NewsletterSection>
    </ScrollReveal>
  );
};

// Styled components
const NewsletterSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const NewsletterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const NewsletterContent = styled.div`
  flex: 2;
  padding-right: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const NewsletterTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const NewsletterDescription = styled.p`
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 500px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SubscribeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  ${pulseAnimation}
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentHover};
  }
`;

const NewsletterDecoration = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.border};
  opacity: 0.2;
  
  svg {
    width: 100%;
    height: auto;
    max-width: 200px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.success}22;
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.success};
`;

const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NewsletterSignup;