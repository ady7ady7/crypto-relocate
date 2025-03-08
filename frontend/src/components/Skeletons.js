// frontend/src/components/Skeletons.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.secondaryBackground} 25%, 
    ${({ theme }) => theme.colors.border} 37%, 
    ${({ theme }) => theme.colors.secondaryBackground} 63%);
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const SkeletonText = styled(SkeletonBase)`
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonCircle = styled(SkeletonBase)`
  height: ${props => props.size || '50px'};
  width: ${props => props.size || '50px'};
  border-radius: 50%;
`;

export const SkeletonRect = styled(SkeletonBase)`
  height: ${props => props.height || '100px'};
  width: ${props => props.width || '100%'};
`;

// Country card skeleton
export const CountryCardSkeleton = () => (
  <TableRow>
    <RankCell><SkeletonText height="24px" width="24px" /></RankCell>
    <CountryNameCell><SkeletonText height="24px" width="150px" /></CountryNameCell>
    <TableCell><SkeletonText height="24px" width="80px" /></TableCell>
    <TableCell><SkeletonText height="24px" width="80px" /></TableCell>
    <TableCell><SkeletonText height="24px" width="120px" /></TableCell>
    <TableCell><SkeletonText height="24px" width="100px" /></TableCell>
  </TableRow>
);

// Map skeleton
export const MapSkeleton = () => (
  <SkeletonRect height="500px" width="100%" />
);

// Country detail page skeleton
export const CountryDetailSkeleton = () => (
  <div>
    <SkeletonText height="40px" width="200px" />
    <SkeletonText height="24px" width="90%" />
    <SkeletonText height="24px" width="85%" />
    <SkeletonText height="24px" width="80%" />
    
    <SkeletonRect height="300px" style={{ marginTop: '20px', marginBottom: '20px' }} />
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '30px' }}>
      <div>
        <SkeletonText height="20px" width="100px" />
        <SkeletonText height="30px" width="80%" />
      </div>
      <div>
        <SkeletonText height="20px" width="120px" />
        <SkeletonText height="30px" width="70%" />
      </div>
      <div>
        <SkeletonText height="20px" width="140px" />
        <SkeletonText height="30px" width="90%" />
      </div>
      <div>
        <SkeletonText height="20px" width="110px" />
        <SkeletonText height="30px" width="60%" />
      </div>
    </div>
  </div>
);

// Styled components for the table rows and cells (copied from CountryRankings to match)
const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const RankCell = styled(TableCell)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent};
`;

const CountryNameCell = styled(TableCell)`
  font-weight: 500;
`;