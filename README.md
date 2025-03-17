# CryptoRelocate

An interactive map and ranking of crypto-friendly countries with detailed visualizations and analysis.

![CryptoRelocate App](https://raw.githubusercontent.com/yourusername/crypto-relocate/main/screenshot.png)

## Overview

CryptoRelocate helps users discover the most favorable countries for cryptocurrency enthusiasts, investors, and businesses. This application provides:

- An interactive world map highlighting crypto-friendly jurisdictions
- Detailed country rankings with filtering and comparison capabilities
- Comprehensive country profiles with animated visualizations
- Advanced data analysis of tax policies, residency requirements, and financial infrastructure

## Tech Stack

This project is built using the MERN stack:

- **MongoDB**: Database for storing country information
- **Express**: Backend framework for API endpoints
- **React**: Frontend library for UI components
- **Node.js**: Runtime environment for the backend

## Project Structure

```
crypto-relocate/
├── backend/                 # Server-side code
│   ├── config/              # Database connection
│   ├── controllers/         # Route controllers
│   ├── data/                # Seed data
│   ├── models/              # Mongoose schemas
│   └── routes/              # API route definitions
├── frontend/                # Client-side code
│   ├── public/              # Static assets
│   └── src/
│       ├── api/             # API client setup
│       ├── components/      # Reusable components
│       │   ├── animations/  # Animation utilities
│       │   ├── charts/      # Data visualization
│       │   ├── disclosure/  # Expandable elements
│       │   ├── illustrations/# Icons and SVGs
│       │   ├── styles/      # Global styling
│       │   └── visualizations/ # Custom visual elements
│       ├── pages/           # Page components
│       └── utils/           # Utility functions
└── README.md               # Project documentation
```

## Key Components

### Frontend Components

#### Pages

1. **HomePage**
   - Entry point for the application
   - Displays the world map, featured countries, and rankings
   - Provides category explanations and newsletter signup

2. **EnhancedCountryPage**
   - Detailed view of a single country's crypto-friendliness
   - Displays tax policies, residency requirements, and financial services
   - Shows interactive liquid sphere visualizations for key metrics
   - Provides risk analysis and similar country recommendations

#### Visualization Components

1. **WorldMap**
   - Interactive map with color-coded countries
   - Continent filtering with regional statistics
   - Tooltips showing key country information
   - Click/tap navigation to country detail pages

2. **LiquidSphere**
   - Animated visualization for quantitative data
   - Displays metrics via liquid-filled spheres with wave animations
   - Color-coded based on the metric's favorability
   - Responsive sizing with enhanced visual effects

3. **EnhancedCountryRankings**
   - Sortable, filterable table of countries
   - Search functionality for finding specific countries
   - Country comparison feature for up to 3 selections
   - Radar and bar charts for visual comparison

#### Utility Components

1. **Disclosure Components**
   - Collapsible sections for organizing content
   - Expandable details for progressive disclosure
   - Modal dialogs for focused information
   - Tooltips for contextual help

2. **Animation Components**
   - Scroll-triggered reveal animations
   - Staggered entrance effects for lists
   - Hover interactions for enhanced user experience
   - Transition effects for smoother navigation

3. **Skeleton Components**
   - Loading state placeholders for country data
   - Animated shimmer effect for loading states
   - Responsive sizing for different screen dimensions

### Backend Components

1. **Country Model**
   - Schema definition for country data
   - Fields for tax rates, residency requirements, financial services
   - Additional metadata for rankings and descriptions

2. **Country Controller**
   - API logic for retrieving country data
   - Support for fetching by ID, code, or all countries
   - Error handling and response formatting

3. **API Routes**
   - RESTful endpoints for accessing country data
   - Support for filtering and sorting
   - Data seeding endpoint for development

## Visual Design Features

### Color System

The application uses a color-coded system to represent country categories:

- **Excellent** (Green, #4ef037): Top-tier crypto-friendly countries with minimal taxation
- **Favorable** (Light Green, #5be7a9): Good options with some taxation
- **Moderate** (Yellow, #f8fe85): Average crypto environment with standard taxation
- **Restrictive** (Orange, #ffbd67): Limited crypto-friendliness with high taxation
- **Not Favorable** (Red, #ff6464): Unsuitable or prohibitive for crypto activities

### Liquid Sphere Visualizations

The country detail pages feature animated "liquid spheres" that visualize:

1. **Capital Gains Tax**: Lower percentages fill the sphere more (green to orange)
2. **Wealth Tax**: Binary representation (full green for 0%, low amber for any tax)
3. **Financial Services**: Quality rating from "World-class" (full) to "Minimal" (nearly empty)

These visualizations include:
- Wave animations that simulate liquid movement
- Pulse effects for outstanding values
- Color-coding based on the favorability of each metric
- Informative tooltips explaining the significance

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/crypto-relocate.git
   cd crypto-relocate
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Seed the database:
   ```
   # Start the backend server
   npm run dev
   
   # Visit http://localhost:5000/api/seed in your browser to seed the database
   ```

5. Start the development servers:
   ```
   # In the root directory
   npm run dev
   ```

6. Visit `http://localhost:3000` in your browser to view the application.

## Data Sources

Our country data is based on comprehensive analysis from multiple sources including:
- Government websites
- Legal resources
- Financial publications
- Cryptocurrency regulatory reports

## Future Enhancements

- Dark/light theme toggle
- User accounts for saving favorite countries
- Real-time news integration for regulatory updates
- Mobile app version with offline capability
- Interactive tax calculator for different crypto scenarios

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- Your Name - Lead Developer

## Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Special appreciation to cryptocurrency legal experts who provided insights
