import { useRouter } from 'next/router';

import { MainLayout } from '@/components/layout/MainLayout';

function Project() {
  const router = useRouter();
  const { projectId } = router.query;

  return <main>{`Project: ${projectId}`}</main>;
}

Project.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout title='Projects'>{page}</MainLayout>;
};

Project.protected = true;

export default Project;
