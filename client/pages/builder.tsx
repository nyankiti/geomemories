import type { NextPage } from 'next';
import Head from 'next/head';
/* Components */
import GoogleMapView from 'components/views/GoogleMapView';

const Builder: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ジオメモリーズ | 地図アルバムの作成</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>ここで地図を表示して場所を検索できるようにする</p>
        <GoogleMapView />
      </main>
    </div>
  );
};

export default Builder;
