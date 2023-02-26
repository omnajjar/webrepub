import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs';
import {
  SessionContextProvider,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { Auth as SupabaseAuthUI, ThemeSupa } from '@supabase/auth-ui-react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/builder.css';

import { AuthPageLayout } from '@/components/layout/AuthPageLayout';
import { GlobalSpinner } from '@/components/Spinner';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  protected?: boolean;
};

type DocrepubAppProps = AppProps & {
  Component: NextPageWithLayout;
  initialSession: Session;
};

function MyApp({ Component, pageProps, initialSession }: DocrepubAppProps) {
  // Use the layout defined at the page level, if available
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={initialSession}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Render Component={Component} pageProps={pageProps} />
    </SessionContextProvider>
  );
}

function Render({ Component, pageProps }: Partial<DocrepubAppProps>) {
  const { isLoading, session, supabaseClient } = useSessionContext();
  const getLayout = Component?.getLayout || ((page) => page);

  // We assume that a page is public unless it is explicitly protected.
  const protectedPage = Component?.protected ?? false;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const Page = () => getLayout(<Component {...pageProps} />) as JSX.Element;

  if (isLoading) {
    return <GlobalSpinner />;
  }

  return protectedPage ? (
    session ? (
      <Page />
    ) : (
      <AuthPageLayout>
        <SupabaseAuthUI
          providers={['github', 'gitlab', 'google']} // TODO: these providers needs to be configured.
          socialLayout='vertical'
          supabaseClient={supabaseClient}
          magicLink={true}
          appearance={{ theme: ThemeSupa }}
        />
      </AuthPageLayout>
    )
  ) : (
    <Page />
  );
}

export default MyApp;
