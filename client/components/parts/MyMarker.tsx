/*
https://developers.google.com/maps/documentation/javascript/examples/marker-accessibility
ここの実装は、上の例にあるように、一つのInfoWindowを使い回すように変更することもできる。
そうした方が、省エネな感じがする。
ただし、二つのInfoWindowを一緒に表示することができなくなる。
*/
import React, { useRef } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { GeometoryObject, LatLng } from 'entities/geometory';
/* const */
import { BASE_COLOR } from 'libs/globalConst';

type Props = {
  marker: GeometoryObject;
  index: number;
};

const MyMarker = ({ marker, index }: Props) => {
  const infoWindowRef = useRef<google.maps.InfoWindow>();
  const markerRef = useRef<google.maps.Marker>();
  const handleMarkerClick = () => {
    if (infoWindowRef.current) {
      infoWindowRef.current.open({
        anchor: markerRef.current,
      });
    }
  };
  return (
    <React.Fragment>
      <InfoWindow
        position={marker.latlng}
        onLoad={(ref) => {
          // infoWindowは最初は非表示
          ref.close();
          infoWindowRef.current = ref;
        }}
      >
        <>
          <h3 className="text-sm">
            {index + 1}. {marker.name}
          </h3>
        </>
      </InfoWindow>
      <Marker
        position={marker.latlng}
        onClick={handleMarkerClick}
        animation={google.maps.Animation.DROP}
        clickable={true}
        onLoad={(ref) => (markerRef.current = ref)}
        icon={{
          path: 'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z',
          strokeColor: BASE_COLOR,
          fillColor: BASE_COLOR,
          fillOpacity: 1,
          scale: 1.5,
          anchor: new google.maps.Point(12, 23),
          labelOrigin: new google.maps.Point(12, 10),
        }}
        label={{
          color: 'white',
          fontFamily: 'sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          text: String(index + 1),
        }}
      />
    </React.Fragment>
  );
};

export default MyMarker;
