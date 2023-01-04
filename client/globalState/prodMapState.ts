import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { DEFAULT_ZOOM, DEFAULT_LAT_LNG } from 'entities/geometory';

export const prodMapState = atom<{ position: [number, number]; zoom: number }>({
  key: 'prodMapState',
  default: {
    position: [DEFAULT_LAT_LNG.lat, DEFAULT_LAT_LNG.lng],
    zoom: DEFAULT_ZOOM,
  },
});

export const useProdMapState = () => {
  return useRecoilState(prodMapState);
};

export const useProdMapStateValue = () => {
  return useRecoilValue(prodMapState);
};

export const useProdMapStateSetter = () => {
  return useSetRecoilState(prodMapState);
};
