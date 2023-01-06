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
  share_url: string;
};
const Prod: NextPage<Props> = ({
  stringifiedAlbum,
  initialLatLng,
  initialZoom,
  album_id,
  share_url,
}) => {
  const album: Album = JSON.parse(stringifiedAlbum);

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
      <main className="py-4">
        <p>共有用url: {share_url}</p>
        <ProdMapView
          initialLatLng={initialLatLng}
          initialZoom={initialZoom}
          markers={album.data
            .map((block) => {
              // 緯度経度が存在しないダミーのgeom blockを含めない
              if (block.type == 'geom' && block.data.latlng) {
                return block.data;
              }
            })
            .filter((v) => v)}
        />
        <ProdBlockView album={album} />
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
  getFirstGeomLatLng,
} from 'entities/geometory';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const session = cookies.session || '';

    // sessionがない かつ uidがクエリで渡されていない場合はloginページに飛ばす
    let user_id = ctx.query.uid as string | undefined;

    console.log(user_id);
    if (!user_id) {
      const user = await adminAuth
        .verifySessionCookie(session, true)
        .catch(() => null);
      if (!user) throw new Error();
      user_id = user.uid;
    }

    const album_id = ctx.query.album_id;
    if (!album_id || Array.isArray(album_id)) {
      throw new Error('queryパラメータがありません');
    }

    const album = await getAlbum(user_id, album_id);

    if (!album) {
      // データが取得できなかった場合はマイアルバムページへリダイレクト
      return {
        redirect: {
          destination: '/myalbums',
          permanent: false,
        },
      };
    }

    // const initialLatLng = calcMinMaxMeanLatLng(album.data);
    const initialLatLng = getFirstGeomLatLng(album.data);
    // const initialZoom = calcBestFitZoom(album.data);
    const initialZoom = 12;

    return {
      props: {
        stringifiedAlbum: JSON.stringify(album),
        initialLatLng,
        initialZoom,
        album_id,
        share_url: `/prod?album_id=${album_id}&uid=${user_id}`,
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
