import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { TabRouting } from '@/components/layout/TabRouting';

export function AccountPageLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const tabs = [
    {
      caption: 'Personal information',
      current: router.route === '/account',
      link: '/account',
    },
    {
      caption: 'Subscription',
      current: router.route === '/account/subscription',
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
