import React, { useState } from 'react';
/* components */
import LoginForm from 'components/templates/LoginForm';

const LoginView = () => {
  // SNSログインは、登録もログインも同じ動きをするので、見た目を切り替えるだけにする
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="min-h-screen px-4">
      <div className="flex flex-col  items-center">
        <div className="mt-14 max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
          <p className="text-3xl font-black">
            Sign {isSignIn ? 'in' : 'up'} to your account
          </p>

          <LoginForm />

          <p className="mt-12 text-sm font-light hover:opacity-60">
            {isSignIn ? (
              <button onClick={() => setIsSignIn(false)}>
                <span
                  role="button"
                  className="cursor-pointer text-purple-500 hover:underline"
                >
                  新規で会員登録する
                </span>
              </button>
            ) : (
              <button onClick={() => setIsSignIn(true)}>
                <span
                  role="button"
                  className="cursor-pointer text-purple-500 hover:underline"
                >
                  ログインする
                </span>
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
