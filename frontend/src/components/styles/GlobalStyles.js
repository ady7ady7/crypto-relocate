// frontend/src/components/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import Montserrat from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
  }
  
  /* Make sure inputs, buttons and other elements also use the font */
  button, input, select, textarea {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul {
    list-style: none;
  }
  
  button {
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyles;