// 現行のauto completeは料金がかさむ可能性があるので、いずれはプレースライブラリを用いた、自分の実装に変更したい。
import React, { useCallback, useRef, useState, FormEvent } from 'react';
import {
  GoogleMap,
  LoadScriptNext,
  StandaloneSearchBox,
} from '@react-google-maps/api';
import clsx from 'clsx';
import axios, { AxiosRequestConfig } from 'axios';
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
  const mapRef = useRef<google.maps.Map>();
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const searchVal = e.target['search'].value;
    const request = {
      query: searchVal,
      // 返して欲しいデータタイプを指定
      fields: ['name', 'geometry', 'photos', 'icon', 'place_id'],
    };
    const service = new google.maps.places.PlacesService(
      mapRef.current as google.maps.Map,
    );
    try {
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
        }
      });

      // const res = await axios.get(
      //   encodeURI(
      //     `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchVal}&inputtype=textquery&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
      //   ),
      // );
      // console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
      libraries={['places']}
      region="JP"
      language="ja"
    >
      <GoogleMap
        id="map"
        onLoad={handleMapLoad}
        mapContainerStyle={mapContainerStyle}
        zoom={8} // デフォルトズーム倍率を指定します。
        center={{
          lat: 43.048225,
          lng: 141.49701,
        }} // 札幌周辺にデフォルトのセンターを指定しました。
        options={options}
      >
        <MapSearchBar />
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default GoogleMapView;
