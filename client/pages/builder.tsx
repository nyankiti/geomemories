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
import { OutputBlockData } from '@editorjs/editorjs';

type Props = {
  stringifiedBlocks: string;
};
const Builder: NextPage<Props> = ({ stringifiedBlocks }) => {
  const savedBlocks: OutputBlockData[] = JSON.parse(stringifiedBlocks);
  return (
    <div>
      <Head>
        <title>ジオメモリーズ | 地図アルバムの作成</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-4">
        <GoogleMapView
          initialMarker={savedBlocks
            .map((block) => {
              if (block.type == 'geom' && block.data.latlng) {
                return block.data.latlng;
              }
            })
            .filter((v) => v)}
        />
        <BlockEditorView savedBlocks={savedBlocks} />
      </main>
    </div>
  );
};

export default Builder;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth, getBlocks } from '../firebase/server';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const session = cookies.session || '';

    const user = await adminAuth
      .verifySessionCookie(session, true)
      .catch(() => null);

    // sessionがない場合はloginページに飛ばす
    if (!user) throw new Error();

    const res = await getBlocks(user.uid);

    if (!res?.data) throw new Error();

    return {
      props: { stringifiedBlocks: JSON.stringify(res.data) },
    };
  } catch (e) {
    console.log('error occured', e);
    return {
      props: { stringifiedBlocks: JSON.stringify([]) },
    };
  }
};
