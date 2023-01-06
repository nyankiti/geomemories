import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapContainerStyle } from 'styles/mapStyle';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
/* components */
import MapLogic from 'components/templates/MapLogic';
/* globalState */
import { useProdMapStateValue } from 'globalState/prodMapState';
/* types */
import { GeometoryObject, LatLng } from 'entities/geometory';
import clsx from 'clsx';

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
      // style={mapContainerStyle}
      style={{ height: '50vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapLogic />

      {markers.map((marker, i) => {
        const position = [marker.latlng.lat, marker.latlng.lng] as [
          number,
          number,
        ];
        return (
          <Marker key={i} position={position}>
            <Popup>
              <div className={clsx(marker.imageUrl && 'w-32')}>
                <h3 className="text-sm">
                  {i + 1}. {marker.name}
                </h3>
                {marker.imageUrl && (
                  <img src={marker.imageUrl} alt={marker.name} />
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default ProdMapView;
