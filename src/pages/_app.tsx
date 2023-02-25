import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/builder.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type DocrepubAppProps = AppProps & {
  Component: NextPageWithLayout;
  initialSession: Session;
};

function MyApp({ Component, pageProps, initialSession }: DocrepubAppProps) {
  // Use the layout defined at the page level, if available
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      {getLayout(<Component {...pageProps} />)}
    </SessionContextProvider>
  );
}

export default MyApp;
