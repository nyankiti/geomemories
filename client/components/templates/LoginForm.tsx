import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { loginWithSocial } from 'libs/auth';

const LoginForm = () => {
  return (
    <div className="flex flex-col">
      <button
        className="mt-10 hover:opacity-60 focus:outline-none"
        onClick={() => loginWithSocial('google')}
      >
        <div className="flex items-center justify-center rounded-full border border-gray-300 p-2">
          <FcGoogle size={38} />
          <p className="ml-3">Googleでログイン</p>
        </div>
      </button>
      <button
        className="mt-4 hover:opacity-60 focus:outline-none"
        onClick={() => loginWithSocial('twitter')}
      >
        <div className="flex items-center justify-center rounded-full border border-gray-300 p-2">
          <FaTwitter size={38} style={{ color: '#1DA1F2' }} />
          <p className="ml-3">Twitterでログイン</p>
        </div>
      </button>
    </div>
  );
};

export default LoginForm;
