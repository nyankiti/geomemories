// google map上で選択した情報をblockに反映させるための橋渡しとなるglobal state
import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { GeometoryObject } from 'entities/geometory';

export const passedGeomObjState = atom<GeometoryObject>({
  key: 'passedGeomObjState',
  default: undefined,
});

export const usePassedGeomObjState = () => {
  return useRecoilState(passedGeomObjState);
};
export const usePassedGeomObjValue = () => {
  return useRecoilValue(passedGeomObjState);
};
export const usePassedGeomObjSetter = () => {
  return useSetRecoilState(passedGeomObjState);
};
