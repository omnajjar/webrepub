import { MainLayout } from '@/components/layout/MainLayout';
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout';

function Settings() {
  return <main>settings</main>;
}

Settings.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Project'>
      <ProjectPageLayout>{page}</ProjectPageLayout>
    </MainLayout>
  );
};

Settings.protected = true;

export default Settings;
