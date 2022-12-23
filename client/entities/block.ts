import { OutputBlockData } from '@editorjs/editorjs';
import { DocumentData, Timestamp } from 'firebase/firestore';

export type FirestoreBlock = {
  id: string;
  data: OutputBlockData[];
  title: string;
  updatedAt: { _seconds: number; _nanoseconds: number };
  startDateString: string;
  endDateString: string;
};

export const buildFirestoreBlock = (docData?: DocumentData): FirestoreBlock => {
  const block: FirestoreBlock = {
    id: docData?.id ?? '',
    data: docData?.data ?? [],
    title: docData?.title ?? '',
    updatedAt: docData?.updatedAt ?? Timestamp.now(),
    startDateString: docData?.startDateString,
    endDateString: docData?.endDateString,
  };
  return block;
};
