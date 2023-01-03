import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapContainerStyle } from 'styles/mapStyle';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
/* types */
import { GeometoryObject, LatLng } from 'entities/geometory';

// next.jsでバグるassetsのパスを修正
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  initialLatLng: LatLng;
  initialZoom: number;
  markers: GeometoryObject[];
};

const ProdMapView = ({ initialLatLng, initialZoom, markers }: Props) => {
  return (
    <MapContainer
      center={[initialLatLng.lat as number, initialLatLng.lng as number]}
      // leftletで適切なinitialZoomの算出し直す必要がある
      zoom={initialZoom + 1}
      scrollWheelZoom={false}
      style={mapContainerStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, i) => {
        const position = [marker.latlng.lat, marker.latlng.lng] as [
          number,
          number,
        ];
        return (
          <Marker key={i} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ProdMapView;
