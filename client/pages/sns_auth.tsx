import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
/* firebase */
import { getRedirectResult } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { auth } from '../firebase/client';
/* repository */
import { getUser, updateUser } from 'repository/userRepository';
import { createNewAlbum } from 'repository/userRepository';
/* hooks */
import { useAuth } from 'context/authContext';
/* entities */
import { User } from 'entities/user';
import { Album } from 'entities/album';

const SNSAuth: NextPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  useEffect(() => {
    handleSigninRedirect();
  }, []);

  const handleSigninRedirect = async () => {
    const result = await getRedirectResult(auth);
    if (result) {
      // This is the signed-in user
      const loginedUser = result.user;

      const existingUsers = await getUser(loginedUser.uid);

      if (existingUsers) {
        // 既に登録されている情報を優先してfirestoreを更新する
        await updateUser(loginedUser.uid, {
          name: existingUsers.name ?? loginedUser.displayName ?? '',
          photoURL: existingUsers.photoURL ?? loginedUser.phoneNumber ?? '',
          updatedAt: Timestamp.now(),
          signinProviderId:
            existingUsers.signinProviderId ??
            loginedUser.providerData[0].providerId,
        });
        setUser((prevVal) => {
          if (prevVal) {
            return {
              ...prevVal,
              name: existingUsers.name ?? loginedUser.displayName ?? '',
              photoURL: existingUsers.photoURL ?? loginedUser.phoneNumber ?? '',
              updatedAt: Timestamp.now(),
              signinProviderId:
                existingUsers.signinProviderId ??
                loginedUser.providerData[0].providerId,
            };
          }
        });
      } else {
        // ユーザーデータの新規作成
        const newUser: User = {
          id: loginedUser.uid,
          name: loginedUser.displayName ?? '',
          email: loginedUser.email ?? '',
          photoURL: loginedUser.photoURL ?? undefined,
          createdAt: Timestamp.now(),
          signinProviderId: loginedUser.providerData[0].providerId,
          role: 'regular',
        };
        await updateUser(loginedUser.uid, newUser);
        setUser(newUser);
      }

      const jwt = await result.user.getIdToken();
      // Cookieにセッションを付与する
      await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ jwt }),
      });

      // お試しでアルバムを作ったユーザーはlocalStorageに保存されている。
      const stringifiedPassedAlbum = localStorage.getItem('album');
      if (stringifiedPassedAlbum) {
        const passedAlbum = JSON.parse(stringifiedPassedAlbum) as Album;
        const { id: _, ...newAlbum } = passedAlbum;
        localStorage.removeItem('album');
        const newAlubmId = await createNewAlbum(result.user.uid, newAlbum);
        if (newAlubmId) {
          // firebaseへの連続書き込みを防ぐために 0.2 秒待つ
          setTimeout(() => {
            router.push(`/builder?album_id=${newAlubmId}`);
          }, 200);
        }
      } else {
        router.push('/myalbums');
      }
    } else {
      // 各種SNSからのredirectではない場合、トップページに戻す
      router.push('/');
    }
  };

  return (
    <div>
      <Head>
        <title>Quote me | sign up</title>
        <meta name="description" content="名言と出会える、管理できる場所" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="mt-24 flex flex-col items-center justify-center">
          <AiOutlineLoading3Quarters
            className="animate-spin text-gray-500"
            size={48}
          />
          <p className="pt-2 text-gray-500">now loading...</p>
        </div>
      </main>
    </div>
  );
};

export default SNSAuth;
