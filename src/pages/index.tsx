import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth as SupabaseAuthUI, ThemeSupa } from '@supabase/auth-ui-react';

import { AuthPageLayout } from '@/components/layout/AuthPageLayout';
import { MainLayout } from '@/components/layout/MainLayout';

function HomePage() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const isAuthenticated = session != null;

  return isAuthenticated ? (
    <MainLayout>
      <main>Hello there main!</main>
    </MainLayout>
  ) : (
    <AuthPageLayout>
      <SupabaseAuthUI
        providers={['github', 'gitlab', 'google']}
        socialLayout='vertical'
        supabaseClient={supabase}
        magicLink={true}
        appearance={{ theme: ThemeSupa }}
      />
    </AuthPageLayout>
  );
}

export default HomePage;
