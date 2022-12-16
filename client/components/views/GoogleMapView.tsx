import React, { useRef, useState, useMemo } from 'react';
import {
  GoogleMap,
  LoadScriptNext,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import clsx from 'clsx';
import { mapStyles } from 'styles/mapStyle';
/* components */
import MapSearchBar from 'components/templates/MapSearchBar';
import SpotPickModal from 'components/templates/SpotPickModal';
/* types */
import {
  GeometoryObject,
  LatLng,
  InitialGeometoryObj,
} from 'entities/geometory';

// 地図の大きさを指定します。
const mapContainerStyle = {
  height: '60vh',
  width: '100%',
};
const libraries: (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[] = ['places'];

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};

const GoogleMapView = () => {
  // ref
  const mapRef = useRef<google.maps.Map>();
  const searchBoxRef = useRef<google.maps.places.SearchBox>();
  // state
  const [markers, setMarkers] = useState<LatLng[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGeometory, setSelectedGeometory] =
    useState<GeometoryObject>(InitialGeometoryObj);
  // 初期center位置は、duseMemoを使わないと、再レンダリング時に初期値に戻ってしまう
  const center = useMemo<LatLng>(
    () => ({
      lat: 34.6089,
      lng: 135.7306, // とりあえずデフォルトのセンターを斑鳩町に指定。
    }),
    [],
  );

  const handlePlacesChanged = () => {
    // クリックされた地域のデータが手に入る
    console.log(searchBoxRef.current?.getPlaces());
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const lat = places[0].geometry?.location?.lat();
      const lng = places[0].geometry?.location?.lng();
      if (lat && lng) {
        mapRef.current?.panTo({ lat, lng });
        mapRef.current?.setZoom(10);
        setSelectedGeometory({
          adr_address: places[0].adr_address ?? '',
          formatted_address: places[0].formatted_address ?? '',
          formatted_phone_number: places[0].formatted_phone_number,
          latlng: { lat, lng },
          name: places[0].name ?? '',
          place_id: places[0].place_id ?? '',
          vicinity: places[0].vicinity ?? '',
          googleMapUrl: places[0].url ?? '',
          website: places[0].website,
        });
        setModalVisible(true);
      }
    }
  };

  const handleRegister = () => {
    setMarkers((prev) => [...prev, selectedGeometory.latlng]);
    setModalVisible(false);
  };

  const renderMarkers = () => {
    return markers.map((marker, i) => (
      <Marker key={i} onLoad={(m) => console.log(m)} position={marker} />
    ));
  };

  return (
    <>
      <SpotPickModal
        visible={modalVisible}
        setVisible={setModalVisible}
        geometoryObj={selectedGeometory}
        handleRegister={handleRegister}
      />
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
        libraries={libraries}
        region="JP"
        language="ja"
      >
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8} // デフォルトズーム倍率を指定します。
          center={center}
          options={options}
          onLoad={(ref) => {
            mapRef.current = ref;
          }}
        >
          <>
            <StandaloneSearchBox
              onLoad={(ref) => {
                searchBoxRef.current = ref;
              }}
              onPlacesChanged={handlePlacesChanged}
            >
              <MapSearchBar />
            </StandaloneSearchBox>
            {renderMarkers()}
          </>
        </GoogleMap>
      </LoadScriptNext>
    </>
  );
};

export default GoogleMapView;
