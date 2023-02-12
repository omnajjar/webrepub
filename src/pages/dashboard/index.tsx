import { DashboardPageLayout } from '@/components/layout/DashboardPageLayout';
import { MainLayout } from '@/components/layout/MainLayout';

function DashboardPage() {
  return (
    <div>
      <h1>Fooo</h1>
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout>
      <DashboardPageLayout>{page}</DashboardPageLayout>
    </MainLayout>
  );
};

export default DashboardPage;
