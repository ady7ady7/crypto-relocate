import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const StyledMapContainer = styled(MapContainer)`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  
  .leaflet-container {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
  }
  
  .leaflet-tile {
    filter: grayscale(100%) invert(100%) contrast(70%) hue-rotate(180deg) brightness(80%) !important;
  }
`;

const WorldMap = ({ countries }) => {
  const navigate = useNavigate();
  
  // This is a placeholder - in a real app, you would need a GeoJSON file with country boundaries
  // and you would highlight countries based on their ISO codes matching your data
  
  const countryCodes = countries.map(country => country.code);
  
  const onEachFeature = (feature, layer) => {
    const countryCode = feature.properties.ISO_A2;
    
    if (countryCodes.includes(countryCode)) {
      const country = countries.find(c => c.code === countryCode);
      
      layer.setStyle({
        fillColor: '#F7931A',
        fillOpacity: 0.7,
        weight: 1,
        color: '#F7931A',
        opacity: 1
      });
      
      layer.on({
        click: () => {
          navigate(`/country/${country._id}`);
        },
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.9,
            weight: 2
          });
        },
        mouseout: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillOpacity: 0.7,
            weight: 1
          });
        }
      });
      
      layer.bindTooltip(`
        <strong>${feature.properties.NAME}</strong><br/>
        Rank: ${country.rank}
      `, { sticky: true });
    } else {
      layer.setStyle({
        fillColor: '#2D2D2D',
        fillOpacity: 0.5,
        weight: 1,
        color: '#3D3D3D',
        opacity: 0.5
      });
    }
  };

  return (
    <StyledMapContainer
      center={[20, 0]}
      zoom={2}
      minZoom={2}
      maxZoom={6}
      scrollWheelZoom={true}
      zoomControl={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Note: In a real implementation, you would import a GeoJSON file here */}
      {/* <GeoJSON data={countriesGeoJSON} onEachFeature={onEachFeature} /> */}
      
      {/* For the purpose of this example, we'll display a message */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
        textAlign: 'center'
      }}>
        Map visualization would display here with actual GeoJSON data.<br/>
        Highlighted countries would be: {countries.map(c => c.name).join(', ')}
      </div>
    </StyledMapContainer>
  );
};

export default WorldMap;