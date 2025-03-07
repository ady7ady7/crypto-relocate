// Common color definitions for the application
// These are also included in the theme.js file, but this separate file
// allows for easy importing of just color values when needed

export const Colors = {
    // Application UI colors
    background: '#121212',
    secondaryBackground: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#B3B3B3',
    accent: '#F7931A', // Bitcoin gold
    accentHover: '#E78318',
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#F44336',
    border: '#2D2D2D',
    
    // Country category colors
    countryExcellent: '#4CAF50', // Vivid green
    countryFavorable: '#8BC34A', // Light green
    countryModerate: '#FFC107', // Amber/yellow
    countryRestrictive: '#FF9800', // Orange
    countryNotFavorable: '#555555', // Grey
  };
  
  // For use outside styled-components context
  export const getCategoryColor = (category) => {
    switch (category) {
      case 'Excellent': return Colors.countryExcellent;
      case 'Favorable': return Colors.countryFavorable;
      case 'Moderate': return Colors.countryModerate;
      case 'Restrictive': return Colors.countryRestrictive;
      case 'Not favorable': 
      case 'Not Favorable': return Colors.countryNotFavorable;
      default: return Colors.accent;
    }
  };
  
  // Get color by rank
  export const getColorByRank = (rank) => {
    if (rank >= 1 && rank <= 5) return Colors.countryExcellent;
    if (rank >= 6 && rank <= 30) return Colors.countryFavorable;
    if (rank >= 31 && rank <= 50) return Colors.countryModerate;
    if (rank >= 51 && rank <= 70) return Colors.countryRestrictive;
    return Colors.countryNotFavorable;
  };
  
  // Export category definitions for reuse
  export const CategoryDefinitions = {
    excellent: {
      name: 'Excellent',
      color: Colors.countryExcellent,
      description: 'Excellent crypto environment with minimal taxation'
    },
    favorable: {
      name: 'Favorable',
      color: Colors.countryFavorable,
      description: 'Favorable crypto environment with some taxation'
    },
    moderate: {
      name: 'Moderate',
      color: Colors.countryModerate,
      description: 'Moderate crypto environment with standard taxation'
    },
    restrictive: {
      name: 'Restrictive',
      color: Colors.countryRestrictive,
      description: 'Restrictive crypto environment with high taxation'
    },
    notFavorable: {
      name: 'Not Favorable',
      color: Colors.countryNotFavorable,
      description: 'Not favorable for crypto activities'
    }
  };
  
  export default Colors;