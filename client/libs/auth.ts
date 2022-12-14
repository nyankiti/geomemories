import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/client';

// FirebaseErrorかどうかの判定を自作
type FirebaseError = {
  code: string;
  message: string;
  name: string;
};

const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e;
};

const provider = {
  google: new GoogleAuthProvider(),
  twitter: new TwitterAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export const loginWithSocial = async (
  providerName: 'google' | 'twitter' | 'facebook',
) => {
  try {
    // リダイレクト先を指定するために、先にurl履歴を書き換えておく
    window.history.pushState(null, '', '/sns_auth');
    await signInWithRedirect(auth, provider[providerName]);
  } catch (e) {
    console.log(e);
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  // セッションCookieを削除するAPIでログアウトさせる
  await fetch('/api/sessionLogout', { method: 'POST' });
};
