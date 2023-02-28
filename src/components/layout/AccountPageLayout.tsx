import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

import { TabRouting } from '@/components/layout/TabRouting';
import { GlobalSpinner } from '@/components/Spinner';

export function AccountPageLayout({ children }: PropsWithChildren) {
  const { isReady, asPath } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      setLoading(false);
    }
  }, [isReady]);

  if (loading) {
    return <GlobalSpinner />;
  }

  const tabs = [
    {
      caption: 'Personal information',
      current: asPath === '/account',
      link: '/account',
    },
    {
      caption: 'Subscription',
      current: asPath === '/account/subscription',
      link: '/account/subscription',
    },
  ];

  return (
    <>
      <TabRouting tabs={tabs} />
      <section className='py-4'>{children}</section>
    </>
  );
}
