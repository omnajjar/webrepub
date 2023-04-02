import { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

import '@/styles/globals.css';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/designer.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CustomProvider theme='dark'>
      <Component {...pageProps} />
    </CustomProvider>
  );
}

export default MyApp;
