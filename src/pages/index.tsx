import { useSessionContext } from '@supabase/auth-helpers-react';
import { Auth as SupabaseAuthUI, ThemeSupa } from '@supabase/auth-ui-react';

import { AuthPageLayout } from '@/components/layout/AuthPageLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { Spinner } from '@/components/Spinner';

function HomePage() {
  const { isLoading, session, supabaseClient } = useSessionContext();

  if (isLoading) {
    return (
      <main className='flex h-screen items-center justify-center'>
        <Spinner />
      </main>
    );
  }

  return session ? (
    <MainLayout>
      <main>Hello there main!</main>
    </MainLayout>
  ) : (
    <AuthPageLayout>
      <SupabaseAuthUI
        providers={['github', 'gitlab', 'google']}
        socialLayout='vertical'
        supabaseClient={supabaseClient}
        magicLink={true}
        appearance={{ theme: ThemeSupa }}
      />
    </AuthPageLayout>
  );
}

export default HomePage;
