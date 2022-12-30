import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
/* Components */
import GoogleMapView from 'components/views/GoogleMapView';
const BlockEditorView = dynamic(
  () => import('components/views/BlockEditorView'),
  {
    ssr: false,
  },
);
import { initialAlbumData } from 'entities/album';
import { DEFAULT_LAT_LNG, DEFAULT_ZOOM } from 'entities/geometory';

// このページは未ログインのユーザーしかアクセスされない
const Trial: NextPage = () => {
  const { user } = useAuth();
  return (
    <div>
      <Head>
        <title>ジオメモリーズ | 地図アルバムの作成</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-4">
        <GoogleMapView
          initialZoom={DEFAULT_ZOOM}
          initialLatLng={DEFAULT_LAT_LNG}
        />
        <BlockEditorView
          savedAlbum={initialAlbumData}
          user_id={'trial'}
          album_id={'trial'}
        />
      </main>
    </div>
  );
};

export default Trial;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth } from '../../firebase/server';
import { useAuth } from 'context/authContext';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const session = cookies.session || '';

    const user = await adminAuth
      .verifySessionCookie(session, true)
      .catch(() => null);

    if (user) throw new Error();

    return {
      props: {},
    };
  } catch (e) {
    // ログイン済みのユーザーはアルバム一覧に飛ばす
    return {
      redirect: {
        destination: '/myalbums',
        permanent: false,
      },
    };
  }
};
