import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ジオメモリーズ | 地図アルバムの作成</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="mt-10 text-center">Welcome to Geomemories</h1>
      </main>

      <footer></footer>
    </div>
  );
}
