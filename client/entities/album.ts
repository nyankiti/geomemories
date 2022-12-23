import { OutputBlockData } from '@editorjs/editorjs';
import { DocumentData, Timestamp } from 'firebase/firestore';

export type Album = {
  id: string;
  data: OutputBlockData[];
  title: string;
  updatedAt: { _seconds: number; _nanoseconds: number };
  startDateString?: string;
  endDateString?: string;
};

export const buildAlbum = (docData?: DocumentData): Album => {
  const block: Album = {
    id: docData?.id ?? '',
    data: docData?.data ?? [],
    title: docData?.title ?? '',
    updatedAt: docData?.updatedAt ?? Timestamp.now(),
    startDateString: docData?.startDateString,
    endDateString: docData?.endDateString,
  };
  return block;
};

export const initialAlbumData = {
  id: 'trial',
  title: 'trial',
  data: [],
  updatedAt: { _nanoseconds: 0, _seconds: 0 },
};
