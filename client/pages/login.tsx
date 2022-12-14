import type { NextPage } from 'next';
import Head from 'next/head';
/* Components */
import LoginView from 'components/views/LoginView';

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>ジオメモリーズ | ログイン</title>
        <meta name="description" content="地図アルバムで質の高い思い出を" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LoginView />
      </main>
    </div>
  );
};

export default Login;

// module
import nookies from 'nookies';
import { GetServerSideProps } from 'next';
import { adminAuth } from '../firebase/server';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const session = cookies.session || '';

  const user = await adminAuth
    .verifySessionCookie(session, true)
    .catch(() => null);

  // userが既に存在する場合は、mypageに飛ばす
  if (user) {
    return {
      redirect: {
        destination: '/mypage',
        permanent: false,
      },
    };
  }
  // userが存在しない場合はそのまま表示
  return {
    props: {},
  };
};
