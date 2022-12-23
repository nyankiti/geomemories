import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { OutputBlockData } from '@editorjs/editorjs';
import { buildFirestoreBlock, FirestoreBlock } from 'entities/block';

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

export const getBlock = async (
  userId: string,
  blockId: string,
): Promise<FirestoreBlock | null> => {
  try {
    const docRef = adminDB
      .collection('users')
      .doc(userId)
      .collection('blocks')
      .doc(blockId);

    const snap = await docRef.get();
    if (snap.exists) {
      return buildFirestoreBlock(snap.data());
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

// 指定したユーザーのすべてのアルバムの情報取り出す
export const getBlocks = async (userId: string) => {
  const blocks: FirestoreBlock[] = [];
  const blockColRef = adminDB
    .collection('users')
    .doc(userId)
    .collection('blocks');
  const snapshot = await blockColRef.get();
  snapshot.forEach((doc) => {
    if (doc.exists) {
      blocks.push(buildFirestoreBlock(doc.data()));
    }
  });
  return blocks;
};

export const getBlockTitles = async (userId: string) => {
  const titles: Omit<FirestoreBlock, 'data'>[] = [];
  const blockColRef = adminDB
    .collection('users')
    .doc(userId)
    .collection('blocks');
  const snapshot = await blockColRef.get();
  snapshot.forEach((doc) => {
    if (doc.exists) {
      const docData = doc.data();
      titles.push({
        id: doc.id,
        title: docData.title ?? '',
        updatedAt: docData.updatedAt,
      });
    }
  });
  return titles;
};
