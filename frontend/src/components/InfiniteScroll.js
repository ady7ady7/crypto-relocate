// frontend/src/components/InfiniteScroll.js
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SkeletonText } from './Skeletons';

// Reusable infinite scroll component
const InfiniteScroll = ({ 
  data, 
  renderItem, 
  loadMore, 
  hasMore, 
  loading, 
  loadingComponent,
  threshold = 100 // distance from bottom to trigger loading
}) => {
  const [showLoader, setShowLoader] = useState(false);
  const observer = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // use viewport as root
      rootMargin: `0px 0px ${threshold}px 0px`,
      threshold: 0.1
    };

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    }, options);

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current && loadingRef.current) {
        observer.current.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, loading, loadMore, threshold]);

  useEffect(() => {
    setShowLoader(loading && hasMore);
  }, [loading, hasMore]);

  return (
    <div>
      {data.map((item, index) => renderItem(item, index))}
      
      {showLoader && (
        <LoadingContainer ref={loadingRef}>
          {loadingComponent || (
            <>
              <SkeletonText height="20px" width="100%" />
              <SkeletonText height="20px" width="80%" />
              <SkeletonText height="20px" width="60%" />
            </>
          )}
        </LoadingContainer>
      )}
      
      {!showLoader && hasMore && <div ref={loadingRef} />}
    </div>
  );
};

// Styled components
const LoadingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export default InfiniteScroll;