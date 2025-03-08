// frontend/src/components/animations/index.js
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animation keyframes
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Animation Mixins
export const fadeInAnimation = css`
  animation: ${fadeIn} 0.5s ease forwards;
`;

export const slideUpAnimation = css`
  animation: ${slideUp} 0.5s ease forwards;
`;

export const slideInAnimation = css`
  animation: ${slideIn} 0.5s ease forwards;
`;

export const pulseAnimation = css`
  animation: ${pulse} 1.5s ease infinite;
`;

// Hover animation mixins
export const hoverScale = css`
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

export const hoverElevate = css`
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;

export const hoverHighlight = css`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

// Animated Components
export const FadeIn = styled.div`
  opacity: 0;
  ${fadeInAnimation}
  animation-delay: ${props => props.delay || '0s'};
  animation-duration: ${props => props.duration || '0.5s'};
`;

export const SlideUp = styled.div`
  opacity: 0;
  transform: translateY(20px);
  ${slideUpAnimation}
  animation-delay: ${props => props.delay || '0s'};
  animation-duration: ${props => props.duration || '0.5s'};
`;

export const SlideIn = styled.div`
  opacity: 0;
  transform: translateX(-20px);
  ${slideInAnimation}
  animation-delay: ${props => props.delay || '0s'};
  animation-duration: ${props => props.duration || '0.5s'};
`;

// Staggered entrance animation for list items
export const StaggeredList = ({ children, staggerAmount = 0.1 }) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <FadeIn key={index} delay={`${index * staggerAmount}s`}>
          <SlideUp delay={`${index * staggerAmount}s`}>
            {child}
          </SlideUp>
        </FadeIn>
      ))}
    </>
  );
};

// Intersection Observer Hook for scroll animations
export const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [ref, inView];
};

// Scroll Animation Component
export const ScrollReveal = ({ children, ...props }) => {
  const [ref, inView] = useInView(props);
  
  return (
    <div 
      ref={ref} 
      style={{ 
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {children}
    </div>
  );
};