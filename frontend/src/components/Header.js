import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const LogoImg = styled.img`
  height: 30px;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const Nav = styled.nav`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavItem = styled.li`
  font-weight: 500;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImg src="/bitcoin-logo.svg" alt="Bitcoin Logo" />
        CryptoRelocate
      </Logo>
      <Nav>
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/#rankings">Rankings</Link>
          </NavItem>
          <NavItem>
            <Link to="/#about">About</Link>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;