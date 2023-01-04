import type { NextPage } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
/* globalState */
import { useProdMapStateSetter } from 'globalState/prodMapState';
/* Components */
const ProdMapView = dynamic(() => import('components/views/ProdMapView'), {
  ssr: false,
});
import ProdBlockView from 'components/views/ProdBlockView';

type Props = {
  stringifiedAlbum: string;
  initialLatLng: LatLng;
  initialZoom: number;
  album_id: string;
  user_id: string;
};
const Prod: NextPage<Props> = ({
  stringifiedAlbum,
  initialLatLng,
  initialZoom,
  album_id,
  user_id,
}) => {
  const savedAlbum: Album = JSON.parse(stringifiedAlbum);

  const setProdMapState = useProdMapStateSetter();
  useEffect(() => {
    setProdMapState({
      position: [initialLatLng.lat as number, initialLatLng.lng as number],
      zoom: initialZoom,
    });
  }, []);

  return (
    <div>
      <Head>
        <title>ジオメモリーズ | 地図アルバム</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        className="rounded bg-indigo-500 p-4 hover:opacity-50"
        onClick={() => {
          setProdMapState({
            position: [34.6089, 135.7306],
            zoom: 10,
          });
        }}
      >
        移動
      </button>

      <main className="py-4">
        <ProdMapView
          initialLatLng={initialLatLng}
          initialZoom={initialZoom}
          markers={savedAlbum.data
            .map((block) => {
              // 緯度経度が存在しないダミーのgeom blockを含めない
              if (block.type == 'geom' && block.data.latlng) {
                return block.data;
              }
            })
            .filter((v) => v)}
        />
        <ProdBlockView album={savedAlbum} />
      </main>
    </div>
  );
};

export default Prod;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth, getAlbum } from '../firebase/server';
import { Album } from 'entities/album';
import {
  calcBestFitZoom,
  calcMinMaxMeanLatLng,
  LatLng,
} from 'entities/geometory';
import BlockEditorView from 'components/views/BlockEditorView';

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

    // const initialLatLng = calcMeanLatLng(album.data);
    const initialLatLng = calcMinMaxMeanLatLng(album.data);
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
