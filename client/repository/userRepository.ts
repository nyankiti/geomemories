import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/client';
/* entities */
import { User, buildUser } from 'entities/user';
import { OutputBlockData } from '@editorjs/editorjs';
import { Album } from 'entities/album';

const usersColRef = collection(db, 'users');

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const snap = await getDoc(doc(usersColRef, id));
    if (snap.exists()) {
      return buildUser(snap.data());
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const updateUser = async (id: string, updateUser: Partial<User>) => {
  try {
    await setDoc(doc(usersColRef, id), updateUser, { merge: true });
    return { result: true };
  } catch (e) {
    console.log(e);
    return { result: false };
  }
};

export const updateAuthName = async (name: string) => {
  auth.currentUser &&
    (await updateProfile(auth.currentUser, { displayName: name }));
};
export const updateAuthPhotoUrl = async (photoURL: string) => {
  auth.currentUser && (await updateProfile(auth.currentUser, { photoURL }));
};

export const createNewAlbum = async (
  userId: string,
  albumObj: Omit<Album, 'id' | 'data' | 'updatedAt'>,
): Promise<string | null> => {
  const newDoc = doc(collection(db, 'users', userId, 'albums'));
  try {
    await setDoc(newDoc, {
      ...albumObj,
      updatedAt: Timestamp.now(),
      id: newDoc.id,
    });
    return newDoc.id;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateAlbums = async (
  user_id: string,
  album_id: string,
  albumObj: Partial<Album>,
) => {
  const docRef = doc(db, 'users', user_id, 'albums', album_id);
  try {
    // プロトタイプ版は、1人一つで、user id と同じ id の blocks サブコレクションにデータを保存する
    await setDoc(
      docRef,
      {
        ...albumObj,
        updatedAt: Timestamp.now(),
      },
      { merge: true },
    );
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteAlbum = async (user_id: string, album_id: string) => {
  const docRef = doc(db, 'users', user_id, 'albums', album_id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
