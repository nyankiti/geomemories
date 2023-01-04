import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L, { Layer } from 'leaflet';
/* globalState */
import { useProdMapStateValue } from 'globalState/prodMapState';

const MapLogic = () => {
  const map = useMap();
  const prodMapState = useProdMapStateValue();

  useEffect(() => {
    console.log('called');
    map.flyTo(prodMapState.position, prodMapState.zoom, {
      animate: true,
    });
    map.eachLayer((layer: any) => {
      if (layer._latlng) {
        if (
          layer._latlng.lat == prodMapState.position[0] &&
          layer._latlng.lng == prodMapState.position[1]
        ) {
          layer.openPopup();
        }
      }
    });
  }, [prodMapState]);

  return null;
};

export default MapLogic;
