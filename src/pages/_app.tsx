import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { CustomProvider } from 'rsuite';

import '@/styles/globals.css';
import 'rsuite/dist/rsuite.min.css';
import '@/styles/designer.css';

import { WebrepubProvider } from '@/desginer/Providers/webrepub';
import { getPresets } from '@/presets';
import ReactEmailPreset from '@/presets/react-email';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebrepubProvider
      settings={{
        isInDesignMode: true,
      }}
      presets={{
        collection: getPresets(),
        currentPreset: ReactEmailPreset,
      }}
    >
      <CustomProvider theme='dark'>
        <Component {...pageProps} />
        <Analytics />
      </CustomProvider>
    </WebrepubProvider>
  );
}

export default MyApp;
