import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from 'react-bootstrap/Button';
import { FaCar,FaTruck } from 'react-icons/fa';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renderToStaticMarkup } from 'react-dom/server';

// Convert the SVG icon to a data URL
const carIconMarkup = renderToStaticMarkup(<FaCar size={50} />);
const carIconDataUrl = `data:image/svg+xml;base64,${btoa(carIconMarkup)}`;

// Create a custom Leaflet icon
const customIcon = L.icon({
  iconUrl: carIconDataUrl,
  iconSize: [50, 55], 
  popupAnchor: [0, -20] 
});

function MapPlaceholder() {
  return (
    <p>
      Map of Cincinnati.{' '}
    </p>
  )
}

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      map.flyTo([latitude, longitude], map.getZoom());
      console.log("***********************",{latitude},{longitude})
    }, (error) => {
      console.error("Error getting user's location", error);
    });
  }, []);

  return position === null ? null : (
    <Marker position={position} icon={customIcon} raiseOnHover={true}>
      <Popup>Click to Park Here</Popup>
    </Marker>
  );
}

function MyMap() {
  const [buttonState, setButtonState] = useState({ color: 'success', text: 'Park Me' });
  const [firstClickTime, setFirstClickTime] = useState(null);
  const [position, setPosition] = useState({ lat: 39.1380992, lng: -84.5119488 });

  const handleClick = () => {
    if (buttonState.color === 'success') {
      // First click
      setButtonState({ color: 'danger', text: 'Parked' });
      setFirstClickTime(new Date());
      toast('Car parked!');
    } else {
      // Second click
      const duration = new Date() - firstClickTime;
      toast(`Duration: ${duration / 1000} seconds\nLatitude: ${position.lat}\nLongitude: ${position.lng}`);
      setButtonState({ color: 'success', text: 'Park Me' });
      setFirstClickTime(null);
    }
  };

  return (
    <>
      <MapContainer
        style={{ height:'100vh' }}
        center={position}
        zoom={30}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <Button variant={buttonState.color} className="rounded-pill" style={{ position: 'fixed', bottom: '20px', right: '10px', zIndex: 999, opacity: 1 }} onClick={handleClick}>{buttonState.text}</Button>
      </MapContainer>
      <ToastContainer />
    </>
  );
}

export default MyMap;