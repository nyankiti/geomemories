import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
/* Components */
import AddAlbumModal from 'components/templates/AddAlbumModal';
import DeleteAlbumModal from 'components/templates/DeleteAlbumModal';
/* utils */
import { formatTime } from 'utils/time';
/* entities */
import { AlbumsWithThumbnail } from '../firebase/server';

type Props = {
  stringifiedAlbumsWithThumbnail: string;
  userId: string;
};

export type SelectedAlbum = {
  index: number;
  album: Omit<Album, 'data'>;
};

const Login: NextPage<Props> = ({ stringifiedAlbumsWithThumbnail, userId }) => {
  // const albums: Omit<Album, 'data'>[] = JSON.parse(stringifiedAlbums);
  const [albums, setAlbums] = useState<AlbumsWithThumbnail[]>(
    JSON.parse(stringifiedAlbumsWithThumbnail),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum>();

  const handleDeletePress = (selectedAlbum: SelectedAlbum) => {
    setDeleteModalVisible(true);
    setSelectedAlbum(selectedAlbum);
  };

  return (
    <div>
      <Head>
        <title>ジオメモリーズ | マイアルバム</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-100 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                アルバム名
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                最終編集日
              </th>
              <th className="border-b-2 border-gray-200 bg-gray-100 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, index) => {
              const formatedTime = formatTime(
                new Date(album.updatedAt._seconds * 1000),
              );
              return (
                <tr key={album.id}>
                  <td className="border-b border-gray-200 bg-white py-5 text-center text-sm">
                    <div className="flex items-center justify-center">
                      {/* 最初の画像をデータから取り出してサムネイルにしたい */}
                      {album.thumbnail.startsWith('http') && (
                        <div className="-my-4 h-14 w-14 flex-shrink-0">
                          <img
                            className="h-full w-full rounded object-contain"
                            src={album.thumbnail}
                            alt=""
                          />
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="whitespace-no-wrap font-semibold text-gray-900">
                          {album.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      {formatedTime}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white py-5 text-center text-sm">
                    <Link passHref href={`/builder?album_id=${album.id}`}>
                      <button className="m-2 rounded-full bg-green-200 bg-opacity-50 px-3 py-1 font-semibold leading-tight text-green-900 hover:opacity-60">
                        編集する
                      </button>
                    </Link>
                    <Link passHref href={`/prod?album_id=${album.id}`}>
                      <button className="m-2 rounded-full bg-blue-200 bg-opacity-50 px-3 py-1 font-semibold leading-tight text-blue-900 hover:opacity-60">
                        見る
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeletePress({ index, album })}
                      className="m-2 rounded-full bg-orange-200 bg-opacity-50 px-3 py-1 font-semibold leading-tight text-orange-900 hover:opacity-60"
                    >
                      消す
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="my-6 flex items-center justify-center">
          <button
            onClick={() => setModalVisible(true)}
            className="rounded-full bg-orange-200 bg-opacity-50 px-3 py-1 font-semibold leading-tight text-orange-900 hover:opacity-60"
          >
            アルバムを追加する
          </button>
        </div>
      </main>
      <AddAlbumModal
        userId={userId}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <DeleteAlbumModal
        userId={userId}
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        selectedAlbum={selectedAlbum}
        setAlbums={setAlbums}
      />
    </div>
  );
};

export default Login;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth, getAlbumWithThumbnail } from '../firebase/server';
import { Album } from 'entities/album';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const session = cookies.session || '';

    const user = await adminAuth
      .verifySessionCookie(session, true)
      .catch(() => null);

    // 未ログイン場合は、loginに飛ばす
    if (!user) throw new Error('no user');

    const albumsWithThumbnail = await getAlbumWithThumbnail(user.uid);

    return {
      props: {
        stringifiedAlbumsWithThumbnail: JSON.stringify(albumsWithThumbnail),
        userId: user.uid,
      },
    };
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
