# CryptoRelocate

An interactive map and ranking of crypto-friendly countries.

## Overview

CryptoRelocate helps users discover the most favorable countries for cryptocurrency enthusiasts, investors, and businesses. This application provides:

- An interactive world map highlighting crypto-friendly jurisdictions
- Detailed country rankings based on multiple factors
- Comprehensive information about tax policies, residency requirements, and more

## Tech Stack

This project is built using the MERN stack:

- **MongoDB**: Database for storing country information
- **Express**: Backend framework for API endpoints
- **React**: Frontend library for UI components
- **Node.js**: Runtime environment for the backend

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
   # In the backend directory
   npm run dev
   
   # In the frontend directory
   npm start
   ```

6. Visit `http://localhost:3000` in your browser to view the application.

## Features

- Interactive world map highlighting crypto-friendly countries
- Sortable and filterable country rankings
- Detailed country profiles with tax and residency information
- Mobile-responsive design with dark mode

## Data Sources

Our country data is based on comprehensive analysis from multiple sources including:
- Government websites
- Legal resources
- Financial publications
- Cryptocurrency regulatory reports

## License

This project is licensed under the MIT License - see the LICENSE file for details.