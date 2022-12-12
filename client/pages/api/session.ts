import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';
import { adminAuth } from '../../firebase/server';

export default async function sessionApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(404).send('Not Found');

  // Tokenの有効期限
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日

  // セッションCookieを作成するためのjwtを取得
  const jwt = (JSON.parse(req.body).jwt || '').toString();

  // Cookieに保存するセッションIDを作成する
  const sessionCookie = await adminAuth.createSessionCookie(jwt, { expiresIn });

  // Cookieのオプション
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: '/',
  };

  // セッションIDをCookieに設定する
  setCookie({ res }, 'session', sessionCookie, options);

  res.send(JSON.stringify({ status: 'success' }));
}
