import { Dispatch, SetStateAction, useContext } from 'react';
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebase/client';
/* repository */
import { getUser } from 'repository/userRepository';
/* entitiy */
import { User } from 'entities/user';

export type UserContextType = {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
};

const AuthContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    // ログイン状態を監視し、変化があったら発動
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const appUser = await getUser(firebaseUser.uid);
        appUser && setUser(appUser);
      } else {
        // ログインしていない場合、ユーザー情報を空にする
        setUser(null);
      }
      // アプリのアンマウントと同時に監視を終了する
      return () => {
        unsubscribe();
      };
    });

    // refresh tokenをサーバーサイドに反映する
    onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const jwt = await firebaseUser.getIdToken();
        // Cookieにセッションを付与する
        await fetch('/api/session', {
          method: 'POST',
          body: JSON.stringify({ jwt }),
        });
      }
    });
  }, []);

  // プロバイダーを作成し、配布物を格納する
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// コンテクストを受け取るメソッドを定義
export const useAuth = () => useContext(AuthContext);
