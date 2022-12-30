import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
/* Components */
import GoogleMapView from 'components/views/GoogleMapView';
import AlbumTitleForm from 'components/templates/AlbumTitleForm';
const BlockEditorView = dynamic(
  () => import('components/views/BlockEditorView'),
  {
    ssr: false,
  },
);

type Props = {
  stringifiedAlbum: string;
  initialLatLng: LatLng;
  initialZoom: number;
  album_id: string;
  user_id: string;
};
const Builder: NextPage<Props> = ({
  stringifiedAlbum,
  initialLatLng,
  initialZoom,
  album_id,
  user_id,
}) => {
  const album: Album = JSON.parse(stringifiedAlbum);
  return (
    <div>
      <Head>
        <title>ジオメモリーズ | 地図アルバムの作成</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-4">
        <AlbumTitleForm />
        <GoogleMapView
          initialLatLng={initialLatLng}
          initialZoom={initialZoom}
        />
        <BlockEditorView
          savedAlbum={album}
          album_id={album_id}
          user_id={user_id}
        />
      </main>
    </div>
  );
};

export default Builder;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth, getAlbum } from '../../firebase/server';
import { Album } from 'entities/album';
import { calcBestFitZoom, calcMeanLatLng, LatLng } from 'entities/geometory';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const session = cookies.session || '';

    const user = await adminAuth
      .verifySessionCookie(session, true)
      .catch(() => null);

    // sessionがない場合はloginページに飛ばす
    if (!user) throw new Error();

    const album_id = ctx.query.album_id;
    if (!album_id || Array.isArray(album_id)) {
      throw new Error('queryパラメータがありません');
    }

    const album = await getAlbum(user.uid, album_id);

    if (!album) {
      // データが取得できなかった場合はマイアルバムページへリダイレクト
      return {
        redirect: {
          destination: '/myalbums',
          permanent: false,
        },
      };
    }

    const initialLatLng = calcMeanLatLng(album.data);
    const initialZoom = calcBestFitZoom(album.data);

    return {
      props: {
        stringifiedAlbum: JSON.stringify(album),
        initialLatLng,
        initialZoom,
        album_id,
        user_id: user.uid,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
