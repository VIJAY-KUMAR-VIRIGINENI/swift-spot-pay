import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Tooltip, Marker, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuBar from './MenuBar';

toast.configure({
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

function ParkingZone() {
  const zone1Center = { lat: 39.1380992, lng: -84.5119488 };
  const zone2Center = { lat: 39.1080992, lng: -84.4919488 };
  const [currentZone, setCurrentZone] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const markerIconMarkup = renderToStaticMarkup(<FaMapMarkerAlt size={50} color="red" />);
  const markerIconDataUrl = `data:image/svg+xml;base64,${btoa(markerIconMarkup)}`;

  const customMarkerIcon = L.icon({
    iconUrl: markerIconDataUrl,
    iconSize: [50, 55], 
    popupAnchor: [0, -20] 
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
      const distanceToZone1 = Math.hypot(latitude - zone1Center.lat, longitude - zone1Center.lng);
      const distanceToZone2 = Math.hypot(latitude - zone2Center.lat, longitude - zone2Center.lng);
      if (distanceToZone1 < distanceToZone2) {
        setCurrentZone('Parking Zone 1');
        toast('You are in Parking Zone 1');
      } else {
        setCurrentZone('Parking Zone 2');
        toast('You are in Parking Zone 2');
      }
    }, (error) => {
      console.error("Error getting user's location", error);
    });
  }, []);

  return (
    <>
      <MenuBar />
      <MapContainer
        style={{ height:'100vh' }}
        center={zone1Center}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={zone1Center} radius={2000} pathOptions={{ color: 'blue', fillColor: 'blue' }}>
          <Tooltip permanent>Parking Zone 1</Tooltip>
        </Circle>
        <Circle center={zone2Center} radius={2000} pathOptions={{ color: 'red', fillColor: 'red' }}>
          <Tooltip permanent>Parking Zone 2</Tooltip>
        </Circle>
        {currentPosition && <Marker position={currentPosition} icon={customMarkerIcon} />}
        <ZoomControl position="bottomright" />
      </MapContainer>
      <ToastContainer />
    </>
  );
}

export default ParkingZone;