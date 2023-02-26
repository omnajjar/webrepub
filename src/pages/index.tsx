import { useSessionContext } from '@supabase/auth-helpers-react';
import { Auth as SupabaseAuthUI, ThemeSupa } from '@supabase/auth-ui-react';

import { AuthPageLayout } from '@/components/layout/AuthPageLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { GlobalSpinner } from '@/components/Spinner';

function HomePage() {
  const { isLoading, session, supabaseClient } = useSessionContext();

  if (isLoading) {
    return <GlobalSpinner />;
  }

  return session ? (
    <MainLayout>
      <main>Hello there main!</main>
    </MainLayout>
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
  );
}

export default HomePage;
