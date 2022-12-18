import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { OutputBlockData } from '@editorjs/editorjs';

export const blockDataState = atom<OutputBlockData[]>({
  key: 'blockDataState',
  default: undefined,
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
