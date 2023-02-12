import { MainLayout } from '@/components/layout/MainLayout';

function HomePage() {
  return <main>Hello there main!</main>;
}

HomePage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage;
