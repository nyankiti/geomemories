import { collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/client';
/* entities */
import { User, buildUser } from 'entities/user';
import { OutputBlockData } from '@editorjs/editorjs';

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

export const addBlocks = async (id: string, blockData: OutputBlockData[]) => {
  const colRef = collection(db, 'users', id, 'blocks');
  try {
    // プロトタイプ版は、1人一つで、user id と同じ id の blocks サブコレクションにデータを保存する
    await setDoc(doc(colRef, id), {
      data: blockData,
      updatedAt: Timestamp.now(),
    });
  } catch (e) {
    console.log(e);
  }
};
