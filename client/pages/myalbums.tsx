import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
/* Components */
import AddAlbumModal from 'components/templates/AddAlbumModal';
/* utils */
import { formatTime } from 'utils/time';

type Props = {
  stringifiedAlbums: string;
};
const Login: NextPage<Props> = ({ stringifiedAlbums }) => {
  const albums: Omit<FirestoreBlock, 'data'>[] = JSON.parse(stringifiedAlbums);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
            {albums.map((album) => {
              const formatedTime = formatTime(
                new Date(album.updatedAt._seconds * 1000),
              );
              return (
                <tr key={album.id}>
                  <td className="border-b border-gray-200 bg-white py-5 text-center text-sm">
                    {/* <div className="flex items-center"> */}
                    {/* 最初の画像をデータから取り出してサムネイルにしたい */}
                    {/* <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-full w-full rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      />
                    </div> */}
                    <div className="ml-3">
                      <p className="whitespace-no-wrap font-semibold text-gray-900">
                        {album.title}
                      </p>
                    </div>
                    {/* </div> */}
                  </td>
                  <td className="border-b border-gray-200 bg-white py-5 text-center text-sm">
                    <p className="whitespace-no-wrap text-gray-900">
                      {formatedTime}
                    </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white py-5 text-center text-sm">
                    <Link passHref href={`builer/${album.id}`}>
                      <button className="m-2 rounded-full bg-green-200 bg-opacity-50 px-3 py-1 font-semibold leading-tight text-green-900 hover:opacity-60">
                        編集する
                      </button>
                    </Link>
                    <Link passHref href={`prod/${album.id}`}>
                      <button className="m-2 rounded-full bg-blue-200 bg-opacity-50 px-3 py-1 font-semibold leading-tight text-blue-900 hover:opacity-60">
                        見る
                      </button>
                    </Link>
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
      <AddAlbumModal visible={modalVisible} setVisible={setModalVisible} />
    </div>
  );
};

export default Login;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth, getBlockTitles } from '../firebase/server';
import { FirestoreBlock } from 'entities/block';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const session = cookies.session || '';

    const user = await adminAuth
      .verifySessionCookie(session, true)
      .catch(() => null);

    // 未ログイン場合は、loginに飛ばす
    if (!user) throw new Error('no user');

    const albums = await getBlockTitles(user.uid);

    return {
      props: {
        stringifiedAlbums: JSON.stringify(albums),
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
