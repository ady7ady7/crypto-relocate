# CryptoRelocate Component Documentation

This documentation provides detailed information about the key components in the CryptoRelocate application, their functions, and interactions.

## Table of Contents

1. [Frontend Structure](#frontend-structure)
2. [Core Components](#core-components)
   - [Pages](#pages)
   - [Data Visualization](#data-visualization)
   - [UI Elements](#ui-elements)
3. [Backend Structure](#backend-structure)
4. [Data Flow](#data-flow)
5. [Styling System](#styling-system)
6. [Animation System](#animation-system)

## Frontend Structure

The frontend is organized around a component-based architecture using React:

```
frontend/src/
├── api/                # API utilities
├── components/         # Reusable UI components
├── pages/              # Page-level components
├── utils/              # Helper functions
└── App.js              # Application entry point
```

### Components Directory Structure

```
components/
├── animations/         # Animation utilities
├── charts/             # Data visualization components
├── disclosure/         # Expandable and collapsible elements
├── illustrations/      # Icons and illustrations
├── styles/             # Global styles and theme
├── visualizations/     # Custom visual elements
├── EnhancedCountryRankings.js  # Country table with filtering
├── EnhancedHeader.js           # Application header
├── FeatureHighlights.js        # Feature showcase
├── FeaturedCountries.js        # Highlighted countries
├── InfiniteScroll.js           # Lazy loading
├── NewsletterSignup.js         # Email subscription
├── Skeletons.js                # Loading states
└── WorldMap.js                 # Interactive map
```

## Core Components

### Pages

#### HomePage.js

The main landing page that orchestrates multiple components:

**Functions:**
- Loads and displays the interactive world map
- Shows featured countries and their rankings
- Displays key features and benefits
- Includes a newsletter signup component
- Manages loading states and error handling

**Key Code Sections:**
```javascript
useEffect(() => {
  const fetchCountries = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/countries');
      setCountries(data);
      // Simulate loading for a better UI experience with skeletons
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError('Error fetching countries data. Please try again later.');
      setLoading(false);
    }
  };

  fetchCountries();
}, []);
```

#### EnhancedCountryPage.js

Provides detailed information about a specific country:

**Functions:**
- Displays comprehensive country data with animated visualizations
- Shows tax analysis with comparisons to standard tiers
- Provides residency information and requirements
- Analyzes future risks and economic considerations
- Suggests similar countries based on rankings
- Displays financial service availability

**Key Feature - Liquid Sphere Visualization:**
```javascript
const calculateSphereFill = (value, type) => {
  if (type === 'capitalGainsTax') {
    // For capital gains tax - 0% is best (95% fill max to keep animation visible)
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return 30; // Default for non-numeric
    return Math.max(5, Math.min(95, 95 - (numericValue * 2.4))); // 0% = 95%, 40% = 0%
  }
  
  // Other types...
};
```

### Data Visualization

#### LiquidSphere.js

Custom visualization component for displaying metrics through animated liquid-filled spheres:

**Functions:**
- Renders a sphere with liquid animation
- Shows percentage-based filling based on provided value
- Uses color-coding to indicate quality/rating
- Displays labels and additional context
- Animates waves and pulses for visual engagement

**Animation and Styling:**
```javascript
const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%) translateZ(0);
  }
  100% {
    transform: translateX(100%) translateZ(0);
  }
`;

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const Liquid = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.fillPercentage}%;
  background: ${props => props.color};
  transition: height 1s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  border-radius: 0 0 50% 50% / 0 0 15% 15%;
  animation: ${props => props.fillPercentage > 85 ? pulseAnimation : 'none'} 3s infinite ease-in-out;
  
  // Wave animations...
`;
```

#### WorldMap.js

Interactive geographical visualization of country data:

**Functions:**
- Renders a color-coded world map based on country rankings
- Provides tooltips with country information on hover
- Allows filtering by continent with statistics
- Supports touch and click interactions for navigation
- Shows loading states and handles errors

**Geographic Data Processing:**
```javascript
const style = (feature) => {
  // Get country code from different possible property names
  const countryCode = feature.properties.ISO_A2 || 
                     feature.properties.iso_a2 || 
                     (feature.properties.ISO_A3 ? feature.properties.ISO_A3.substring(0, 2) : null);
  
  // Find matching country and apply styling
  const country = countries.find(c => c.code === countryCode);
  
  if (country) {
    const color = country.category ? getCategoryColor(country.category) : getColorByRank(country.rank);
    
    return {
      fillColor: color,
      fillOpacity: 0.7,
      weight: 1,
      color: '#FFFFFF',
      opacity: 0.5
    };
  }
  
  // Default style...
};
```

#### ComparisonChart.js

Collection of data visualization components for comparisons:

**Functions:**
- Provides horizontal bar charts for comparing metrics
- Creates radar charts for multi-dimensional analysis
- Generates mini area charts for trend visualization
- Supports color-coding by thresholds
- Handles animation and responsiveness

**Bar Chart Implementation:**
```javascript
export const HorizontalBarChart = ({ data, title, valueLabel, maxValue, thresholdColors }) => {
  const getBarColor = (value) => {
    if (!thresholdColors) return '#F7931A';
    
    // Find the appropriate color based on value thresholds
    const threshold = Object.keys(thresholdColors)
      .map(Number)
      .sort((a, b) => b - a)
      .find(threshold => value >= threshold);
      
    return threshold ? thresholdColors[threshold] : thresholdColors[0];
  };

  // Chart rendering...
};
```

### UI Elements

#### EnhancedCountryRankings.js

Comprehensive country listing with advanced features:

**Functions:**
- Displays a sortable and filterable table of countries
- Provides search functionality for finding specific countries
- Allows selection of countries for comparison
- Offers infinite scrolling for performant loading
- Shows category filtering and visual indicators

**Country Selection for Comparison:**
```javascript
const toggleCountrySelection = (country) => {
  setSelectedCountries(prev => {
    const isSelected = prev.some(c => c._id === country._id);
    
    if (isSelected) {
      return prev.filter(c => c._id !== country._id);
    } else {
      // Limit to maximum 3 countries for comparison
      if (prev.length >= 3) {
        return [...prev.slice(1), country];
      }
      return [...prev, country];
    }
  });
};
```

#### disclosure/index.js

Collection of UI components for progressive disclosure:

**Functions:**
- Provides collapsible sections for organizing content
- Implements expandable details for progressive information
- Creates tabbed interfaces for organization
- Offers tooltips for contextual help
- Supports modal dialogs for focused content

**Collapsible Component:**
```javascript
export const Collapsible = ({ title, children, initiallyExpanded = false, icon: Icon }) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  
  return (
    <CollapsibleContainer>
      <CollapsibleHeader 
        onClick={() => setIsExpanded(!isExpanded)}
        expanded={isExpanded}
      >
        {Icon && <Icon size="20px" />}
        <CollapsibleTitle>{title}</CollapsibleTitle>
        <CollapsibleIcon expanded={isExpanded}>
          {/* Icon SVG */}
        </CollapsibleIcon>
      </CollapsibleHeader>
      
      <CollapsibleContent expanded={isExpanded}>
        {children}
      </CollapsibleContent>
    </CollapsibleContainer>
  );
};
```

#### Skeletons.js

Loading state placeholders for UI elements:

**Functions:**
- Provides loading indicators for various UI components
- Creates shimmer animations for visual feedback
- Maintains layout stability during content loading
- Offers variations for different content types
- Ensures responsive sizing for different screens

**Skeleton Implementation:**
```javascript
export const CountryDetailSkeleton = () => (
  <div>
    <SkeletonText height="40px" width="200px" />
    <SkeletonText height="24px" width="90%" />
    <SkeletonText height="24px" width="85%" />
    <SkeletonText height="24px" width="80%" />
    
    <SkeletonRect height="300px" style={{ marginTop: '20px', marginBottom: '20px' }} />
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '30px' }}>
      {/* Skeleton grid items */}
    </div>
  </div>
);
```

## Backend Structure

### Models

#### Country.js

Mongoose schema for country data:

```javascript
const CountrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String, 
    required: true,
    unique: true
  },
  rank: {
    type: Number,
    required: true
  },
  capitalGainsTax: {
    type: String,
    required: true
  },
  // Other fields...
});
```

### Controllers

#### countryController.js

API logic for handling country data requests:

```javascript
// @desc    Get all countries
// @route   GET /api/countries
// @access  Public
const getCountries = async (req, res) => {
  try {
    const countries = await Country.find({}).sort({ rank: 1 });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single country by ID
// @route   GET /api/countries/:id
// @access  Public
const getCountryById = async (req, res) => {
  // Implementation...
};
```

## Data Flow

The application follows a clear data flow pattern:

1. **Data Fetching**: 
   - API requests in page components fetch data from the backend
   - Loading states are shown using skeleton components
   - Error handling provides user feedback

2. **Data Processing**:
   - Raw country data is transformed for visualization
   - Sorting, filtering, and comparison operations
   - Calculation of derived metrics (sphere fill levels, colors)

3. **Data Visualization**:
   - Processed data is passed to visualization components
   - Components handle their own internal state and animations
   - User interactions can trigger data refetching or transformations

4. **User Interaction**:
   - Components respond to user input (clicks, searches, filters)
   - Stateful components manage selection, expansion, and comparison
   - Navigation between views preserves context where appropriate

## Styling System

The application uses a comprehensive styled-components theme:

```javascript
export const theme = {
  colors: {
    // Colors from Colors.js
    background: '#121212',
    secondaryBackground: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#B3B3B3',
    accent: '#F7931A', // Bitcoin gold
    // Other colors...
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    round: '50%'
  },
  // Other theme properties...
};
```

## Animation System

The application uses a robust animation system defined in `animations/index.js`:

```javascript
// Animation keyframes
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Animation Mixins
export const fadeInAnimation = css`
  animation: ${fadeIn} 0.5s ease forwards;
`;

// Animated Components
export const FadeIn = styled.div`
  opacity: 0;
  ${fadeInAnimation}
  animation-delay: ${props => props.delay || '0s'};
  animation-duration: ${props => props.duration || '0.5s'};
`;

// Intersection Observer Hook for scroll animations
export const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  // Implementation...

  return [ref, inView];
};
```

This animation system provides:
- Reusable animation keyframes and mixins
- Scroll-triggered animations using Intersection Observer
- Staggered animations for lists and collections
- Performance-optimized transitions and effects
