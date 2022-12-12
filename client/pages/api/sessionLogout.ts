import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { adminAuth } from '../../firebase/server';

export default async function sessionLogoutApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(404).send('Not Found');

  // Cookieに保存されているセッションIDを取得する
  const sessionId = parseCookies({ req }).session || '';

  // セッションIDから認証情報を取得する
  const decodedClaims = await adminAuth
    .verifySessionCookie(sessionId)
    .catch(() => null);

  // 全てのセッションを無効にする
  if (decodedClaims) {
    await adminAuth.revokeRefreshTokens(decodedClaims.sub);
  }

  // Cookieに保存されているセッションIDを削除
  destroyCookie({ res }, 'session', { path: '/' });

  res.send(JSON.stringify({ status: 'success' }));
}
