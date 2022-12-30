import { OutputBlockData } from '@editorjs/editorjs';

export type LatLng = google.maps.LatLng | google.maps.LatLngLiteral;

export type GeometoryObject = {
  adr_address: string;
  formatted_address: string;
  formatted_phone_number?: string; // 場所ではなく、地名の場合は電話番号は存在しない
  latlng: LatLng;
  name: string;
  place_id: string;
  vicinity: string;
  website?: string;
  googleMapUrl: string;
  // Googleとは別で画像を登録する
  imageUrl?: string;
};

export const InitialGeometoryObj: GeometoryObject = {
  adr_address: '',
  formatted_address: '',
  latlng: {
    lat: 34.6089,
    lng: 135.7306,
  },
  name: '',
  place_id: '',
  vicinity: '',
  googleMapUrl: '',
};

// とりあえずデフォルトの地図中心はとりあえず斑鳩町に指定。
export const DEFAULT_LAT_LNG = { lat: 34.6089, lng: 135.7306 };
export const DEFAULT_ZOOM = 8;

export const calcMeanLatLng = (data: OutputBlockData[]): LatLng => {
  let latSum = 0;
  let lngSum = 0;
  let geomBlockcount = 0;
  data.forEach((block) => {
    if (block.type == 'geom' && block.data.latlng) {
      latSum += block.data.latlng.lat;
      lngSum += block.data.latlng.lng;
      geomBlockcount += 1;
    }
  });
  if (geomBlockcount == 0) {
    return DEFAULT_LAT_LNG;
  } else {
    // 少数第五位を四捨五入する
    const lat = Math.round((latSum / geomBlockcount) * 10000) / 10000;
    const lng = Math.round((lngSum / geomBlockcount) * 10000) / 10000;
    return { lat, lng };
  }
};

export const calcBestFitZoom = (data: OutputBlockData[]): number => {
  const latLngArray: LatLng[] = [];
  data.forEach((block) => {
    if (block.type == 'geom' && block.data.latlng) {
      latLngArray.push({
        lat: block.data.latlng.lat,
        lng: block.data.latlng.lng,
      });
    }
  });
  if (latLngArray.length == 0) {
    // geometoryObjectがない場合は、デフォルト値を返す
    return DEFAULT_ZOOM;
  } else {
    let max_dist = 0;
    for (let i = 0; i < latLngArray.length; i++) {
      for (let j = i + 1; j < latLngArray.length; j++) {
        const x_i = latLngArray[i].lat as number,
          y_i = latLngArray[i].lng as number,
          x_j = latLngArray[j].lat as number,
          y_j = latLngArray[j].lng as number;
        const temp_dist = Math.sqrt((x_i - x_j) ** 2 + (y_i - y_j) ** 2);
        max_dist = Math.max(max_dist, temp_dist);
      }
    }
    // 以下の max_dist の変換公式は、「地図の最適なzoom初期値の算出アルゴリズム」にまとめた
    const ans = -1.011 * Math.log(max_dist) + 8.3528;
    return Math.round(ans * 100) * 0.01; // 少数第三位で四捨五入
  }
};
