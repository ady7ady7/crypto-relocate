// frontend/src/components/maps/CountryCoordinates.js

// Desktop coordinates (for larger screens)
export const desktopCoordinates = [
    // United Arab Emirates (Asia, Middle East)
    { id: 'uae', name: 'United Arab Emirates', continent: 'asmeapacific', x: 61.5, y: 35.5 },
    
    // Switzerland (Europe)
    { id: 'switzerland', name: 'Switzerland', continent: 'europe', x: 49.5, y: 20.5 },
    
    // Malta (Europe)
    { id: 'malta', name: 'Malta', continent: 'europe', x: 51.5, y: 28.5 },
    
    // Singapore (Asia, Pacific)
    { id: 'singapore', name: 'Singapore', continent: 'asmeapacific', x: 74.5, y: 49 },
    
    // Portugal (Europe)
    { id: 'portugal', name: 'Portugal', continent: 'europe', x: 46.5, y: 26 },
    
    // Georgia (Asia, Middle East)
    { id: 'georgia', name: 'Georgia', continent: 'asmeapacific', x: 58, y: 24 },
    
    // El Salvador (North America)
    { id: 'el_salvador', name: 'El Salvador', continent: 'north_america', x: 24.5, y: 41 },
    
    // Mauritius (Africa)
    { id: 'mauritius', name: 'Mauritius', continent: 'africa', x: 62, y: 64 },
    
    // Paraguay (South America)
    { id: 'paraguay', name: 'Paraguay', continent: 'south_america', x: 33, y: 66 },
    
    // Hong Kong (Asia, Pacific)
    { id: 'hong_kong', name: 'Hong Kong', continent: 'asmeapacific', x: 76.5, y: 37 }
  ];
  
  // Mobile coordinates (for smaller screens)
  // These will need to be adjusted based on testing on mobile devices
  export const mobileCoordinates = [
    // United Arab Emirates (Asia, Middle East)g
    { id: 'uae', name: 'United Arab Emirates', continent: 'asmeapacific', x: 61.5, y: 44.5 },
    
    // Switzerland (Europe) g
    { id: 'switzerland', name: 'Switzerland', continent: 'europe', x: 49.5, y: 38.5 },
    
    // Malta (Europe) g
    { id: 'malta', name: 'Malta', continent: 'europe', x: 51.5, y: 41 },
    
    // Singapore (Asia, Pacific)g
    { id: 'singapore', name: 'Singapore', continent: 'asmeapacific', x: 74.5, y: 49 },
    
    // Portugal (Europe)g
    { id: 'portugal', name: 'Portugal', continent: 'europe', x: 45.5, y: 40 },
    
    // Georgia (Asia, Middle East) g
    { id: 'georgia', name: 'Georgia', continent: 'asmeapacific', x: 58, y: 39 },
    
    // El Salvador (North America)g
    { id: 'el_salvador', name: 'El Salvador', continent: 'north_america', x: 23.5, y: 46 },
    
    // Mauritius (Africa) - g
    { id: 'mauritius', name: 'Mauritius', continent: 'africa', x: 63, y: 56 },
    
    // Paraguay (South America) - g
    { id: 'paraguay', name: 'Paraguay', continent: 'south_america', x: 32, y: 57 },
    
    // Hong Kong (Asia, Pacific) - mobile adjusted
    { id: 'hong_kong', name: 'Hong Kong', continent: 'asmeapacific', x: 77.5, y: 45 }
  ];
  
  // Export a function to get coordinates based on device type
  export const getCountryCoordinates = (isMobile = false) => {
    return isMobile ? mobileCoordinates : desktopCoordinates;
  };