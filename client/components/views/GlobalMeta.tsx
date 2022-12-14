import React from 'react';
import Head from 'next/head';

function GlobalMeta() {
  return (
    <Head>
      {/* 開発中は検索エンジンに結果を表示させない */}
      <meta name="robots" content="noindex" />
    </Head>
  );
}

export default GlobalMeta;
