import { AccountPageLayout } from '@/components/layout/AccountPageLayout';
import { MainLayout } from '@/components/layout/MainLayout';

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

Subscription.protected = true;

export default Subscription;
