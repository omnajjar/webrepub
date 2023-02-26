import { MainLayout } from '@/components/layout/MainLayout';

import { AccountPageLayout } from '@/pages/account/_layout';

function Subscription() {
  return <main>Subs</main>;
}

Subscription.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Account'>
      <AccountPageLayout>{page}</AccountPageLayout>
    </MainLayout>
  );
};

export default Subscription;
