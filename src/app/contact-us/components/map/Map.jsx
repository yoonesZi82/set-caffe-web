"use client";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ position, children }) {
  const redIcon = L.icon({
    iconUrl: "image/location-pin.png",
    iconSize: [55, 55],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  return (
    <>
      <MapContainer
        className="rounded-[10px] w-full h-[300px]"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={redIcon}>
          <Popup>
            <h1 className="font-medium text-2xl text-dark-blue-color">
              I'm here🖐️
            </h1>
          </Popup>
        </Marker>
      </MapContainer>

      <div className="relative z-[999] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.5)] mx-[50px] mt-[-73px] pt-[7px] pr-5 pb-[15px] pl-[7px]">
        {children}
      </div>
    </>
  );
}
