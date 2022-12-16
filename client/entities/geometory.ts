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
