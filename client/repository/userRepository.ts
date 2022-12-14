import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase/client';
/* entities */
import { User, buildUser } from 'entities/user';

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
