// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/styles/GlobalStyles';
import { theme } from './components/styles/Theme';
import EnhancedHeader from './components/EnhancedHeader';
import HomePage from './pages/HomePage';
import EnhancedCountryPage from './pages/EnhancedCountryPage';
import FAQPage from './pages/FAQPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <EnhancedHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:id" element={<EnhancedCountryPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;