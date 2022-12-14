import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScriptNext,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import clsx from 'clsx';
import { mapStyles } from 'styles/mapStyle';
/* components */
import MapSearchBar from 'components/templates/MapSearchBar';

const mapContainerStyle = {
  height: '60vh',
  width: '100%',
};
// 地図の大きさを指定します。

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
};

const GoogleMapView = () => {
  const searchBoxRef = useRef<google.maps.places.SearchBox>();
  const handleSearchBoxLoad = (ref: google.maps.places.SearchBox) =>
    (searchBoxRef.current = ref);

  const handlePlacesChanged = () => {
    // クリックされた地域のデータが手に入る
    console.log(searchBoxRef.current?.getPlaces());
  };

  return (
    <>
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
        libraries={['places']}
      >
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8} // デフォルトズーム倍率を指定します。
          center={{
            lat: 34.6089,
            lng: 135.7306,
          }} // とりあえずデフォルトのセンターを斑鳩町に指定。
          options={options}
        >
          <StandaloneSearchBox
            onLoad={handleSearchBoxLoad}
            onPlacesChanged={handlePlacesChanged}
          >
            <MapSearchBar />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScriptNext>
    </>
  );
};

export default GoogleMapView;
