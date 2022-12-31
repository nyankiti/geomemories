import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { OutputBlockData } from '@editorjs/editorjs';
import { buildAlbum, Album } from 'entities/album';

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

export const getAlbum = async (
  userId: string,
  blockId: string,
): Promise<Album | null> => {
  try {
    const docRef = adminDB
      .collection('users')
      .doc(userId)
      .collection('albums')
      .doc(blockId);

    const snap = await docRef.get();
    if (snap.exists) {
      return buildAlbum(snap.data());
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

// 指定したユーザーのすべてのアルバムの情報取り出す
export const getAlbums = async (userId: string) => {
  const albums: Album[] = [];
  const albumColRef = adminDB
    .collection('users')
    .doc(userId)
    .collection('albums');
  const snapshot = await albumColRef.get();
  snapshot.forEach((doc) => {
    if (doc.exists) {
      albums.push(buildAlbum(doc.data()));
    }
  });
  return albums;
};

export type AlbumsWithThumbnail = Omit<Album, 'data'> & { thumbnail: string };

export const getAlbumWithThumbnail = async (userId: string) => {
  const albumsWithThumbnail: AlbumsWithThumbnail[] = [];

  const blockColRef = adminDB
    .collection('users')
    .doc(userId)
    .collection('albums');
  const snapshot = await blockColRef.get();

  snapshot.forEach((doc) => {
    if (doc.exists) {
      const docData = buildAlbum(doc.data());
      let thumbnailUrl = '';
      docData.data.forEach((block) => {
        if (block.type == 'image' && block.data.file && block.data.file.url) {
          thumbnailUrl = block.data.file.url;
        } else if (block.type == 'geom' && block.data.imageUrl) {
          thumbnailUrl = block.data.imageUrl;
        }
      });

      albumsWithThumbnail.push({
        id: doc.id,
        title: docData.title ?? '',
        updatedAt: docData.updatedAt,
        thumbnail: thumbnailUrl,
      });
    }
  });
  return albumsWithThumbnail;
};
