import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { OutputBlockData } from '@editorjs/editorjs';

if (!getApps()?.length) {
  initializeApp({
    credential: cert(
      // 環境変数から認証情報を取得
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string),
    ),
  });
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();

export const getBlocks = async (
  id: string,
): Promise<{ data: OutputBlockData[]; updateAt: Timestamp } | null> => {
  // const colRef = collection(db, 'users', id, 'blocks');
  const docRef = adminDB
    .collection('users')
    .doc(id)
    .collection('blocks')
    .doc(id);

  try {
    const snap = await docRef.get();
    if (snap.exists) {
      return snap.data() as { data: OutputBlockData[]; updateAt: Timestamp };
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};
