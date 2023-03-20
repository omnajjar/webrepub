import { AppProps } from 'next/app';

import '@/styles/globals.css';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/designer.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
