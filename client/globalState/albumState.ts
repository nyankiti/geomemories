import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  DefaultValue,
} from 'recoil';
import { OutputBlockData } from '@editorjs/editorjs';
import { GeometoryObject } from 'entities/geometory';
import { Album, initialAlbumData } from 'entities/album';

export const albumState = atom<Album>({
  key: 'albumState',
  default: initialAlbumData,
});

export const blockSelector = selector<OutputBlockData[]>({
  key: 'blockSelector',
  get: ({ get }) => get(albumState).data,
  set: ({ set, get }, newValue) => {
    // selectorをリセットした場合、DefaultValueとなる
    if (newValue instanceof DefaultValue) {
      set(albumState, initialAlbumData);
    } else {
      const prevAlbumData = get(albumState);
      set(albumState, { ...prevAlbumData, data: newValue });
    }
  },
});

// blockDataのうち、geomに関するものだけをgoogle mapで使うので、selectorを用いて取り出す
export const markersSelector = selector<GeometoryObject[]>({
  key: 'markersSelector',
  get: ({ get }) =>
    get(albumState)
      .data.map((block) => {
        // 緯度経度が存在しないダミーのgeom blockを含めない
        if (block.type == 'geom' && block.data.latlng) {
          return block.data;
        }
      })
      .filter((v) => v),
});

// export const meanLatLngSelector = selector<LatLng>({
//   key: 'meanLatLngSelector',
//   get: ({ get }) => {
//     const blocks = get(albumState).data;
//     let latSum = 0;
//     let lngSum = 0;
//     let geomBlockcount = 0;
//     blocks.forEach((block) => {
//       if (block.type == 'geom' && block.data.latlng) {
//         latSum += block.data.latlng.lat;
//         lngSum += block.data.latlng.lng;
//         geomBlockcount += 1;
//       }
//     });
//     if (geomBlockcount == 0) {
//       // とりあえずデフォルトのセンターを斑鳩町に指定。
//       return { lat: 34.6089, lng: 135.7306 };
//     } else {
//       return { lat: latSum / geomBlockcount, lng: lngSum / geomBlockcount };
//     }
//   },
// });

export const useAlbumState = () => {
  return useRecoilState(albumState);
};
export const useAlbumStateValue = () => {
  return useRecoilValue(albumState);
};
export const useAlbumStateSetter = () => {
  return useSetRecoilState(albumState);
};
export const useBlockSelector = () => {
  return useRecoilState(blockSelector);
};
export const useBlockSelectorValue = () => {
  return useRecoilValue(blockSelector);
};
export const useMarkersSelectorValue = () => {
  return useRecoilValue(markersSelector);
};
