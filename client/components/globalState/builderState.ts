import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import { OutputData } from '@editorjs/editorjs';

export const builderState = atom<OutputData>({
  key: 'builderState',
  default: undefined,
});

export const useBuilderState = () => {
  return useRecoilState(builderState);
};
export const useBuilderStateValue = () => {
  return useRecoilValue(builderState);
};
export const useBuilderStateSetter = () => {
  return useSetRecoilState(builderState);
};
