import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from 'context/authContext';
/* components */
import Header from '../components/views/Header';
import Footer from '../components/views/Footer';
import GlobalMeta from 'components/views/GlobalMeta';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <GlobalMeta />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </RecoilRoot>
  );
}
