import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { OutputBlockData } from '@editorjs/editorjs';
import { GeometoryObject } from 'entities/geometory';

export const blockDataState = atom<OutputBlockData[]>({
  key: 'blockDataState',
  default: [],
});

// blockDataのうち、geomに関するものだけをgoogle mapで使うので、selectorを用いて取り出す
export const markersSelector = selector<GeometoryObject[]>({
  key: 'markersSelector',
  get: ({ get }) =>
    get(blockDataState)
      .map((block) => {
        // 緯度経度が存在しないダミーのgeom blockを含めない
        if (block.type == 'geom' && block.data.latlng) {
          return block.data;
        }
      })
      .filter((v) => v),
});

export const useBlockDataState = () => {
  return useRecoilState(blockDataState);
};
export const useBlockDataStateValue = () => {
  return useRecoilValue(blockDataState);
};
export const useBlockDataStateSetter = () => {
  return useSetRecoilState(blockDataState);
};
export const useMarkersSelectorValue = () => {
  return useRecoilValue(markersSelector);
};
