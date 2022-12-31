/** @type {import('next').NextConfig} */
const withInterceptStdout = require('next-intercept-stdout');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// recoil の 問題のない警告を非表示にする
module.exports = withInterceptStdout(nextConfig, (text) =>
  text.includes('Duplicate atom key') ? '' : text,
);
