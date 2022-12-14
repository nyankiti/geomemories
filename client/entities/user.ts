import { Timestamp, DocumentData } from 'firebase-admin/firestore';

export type User = {
  id: string;
  name?: string;
  photoURL?: string;
  // twitterログインの場合に、emailが存在しない可能性がある
  email?: string;
  // ログインの認証に用いて方法
  signinProviderId: string;
  twitterId?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  role?: 'regular' | 'admin';
};

export const buildUser = (data: DocumentData): User => {
  const user: User = {
    id: data.id,
    name: data.name,
    photoURL: data?.photoURL ?? null,
    email: data?.email,
    signinProviderId: data?.signinProviderId,
    twitterId: data?.twitterId,
    createdAt: data.createdAt,
  };
  return user;
};
