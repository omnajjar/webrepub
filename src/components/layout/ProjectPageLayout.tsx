import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useState } from 'react';

import { Tab, TabRouting } from '@/components/layout/TabRouting';
import { GlobalSpinner } from '@/components/Spinner';

export function ProjectPageLayout({ children }: PropsWithChildren) {
  const { isReady, query, asPath } = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      setLoading(false);
    }
  }, [isReady]);

  if (loading) {
    return <GlobalSpinner />;
  }

  const { projectId } = query;

  const mainRoute = `/projects/${projectId}`;

  const tabs: Tab[] = [
    {
      caption: 'Overview',
      current: asPath === `${mainRoute}`,
      link: `${mainRoute}`,
    },
    {
      caption: 'Project details',
      current: asPath === `${mainRoute}/details`,
      link: `${mainRoute}/details`,
    },
    {
      caption: 'Settings',
      current: asPath === `${mainRoute}/settings`,
      link: `${mainRoute}/settings`,
    },
    {
      caption: 'API',
      current: asPath === `${mainRoute}/api`,
      link: `${mainRoute}/api`,
    },
  ];

  return (
    <>
      <TabRouting tabs={tabs} />
      <section className='py-4'>{children}</section>
    </>
  );
}
