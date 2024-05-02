import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Replace 'YOUR_API_KEY' with your actual LocationIQ API key
const LOCATIONIQ_API_KEY = 'pk.ae45d00dbf4eb39c34b670ac0b4d7c37';

// Fix the default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function LocationMarker({ onLocationSelected }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lng}&format=json`);
        if (!response.ok) throw new Error('Failed to fetch address');
        const data = await response.json();
        onLocationSelected(data.display_name);
      } catch (error) {
        console.error('Error fetching address:', error);
        onLocationSelected('Unable to fetch address');
      }
    },
  });

  return null; // This component does not render anything itself
}

function MapComponent({ onLocationSelected }) {
  const mapStyle = {
    height: '40vw',
    width: '34vw',
  };

  return (
    <MapContainer center={[7.8731, 80.7718]} zoom={8} style={mapStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker onLocationSelected={onLocationSelected} />
    </MapContainer>
  );
}

export default MapComponent;
