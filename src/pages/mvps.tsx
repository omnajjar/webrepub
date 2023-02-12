import { MainLayout } from '@/components/layout/MainLayout';

function MVPsPage() {
  return <main>Hello there MVPS!</main>;
}

MVPsPage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>;
};

export default MVPsPage;
