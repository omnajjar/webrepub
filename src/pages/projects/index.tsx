import { MainLayout } from '@/components/layout/MainLayout';

function Projects() {
  return (
    <div>
      <h1>Fooo</h1>
    </div>
  );
}

Projects.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>;
};

Projects.protected = true;

export default Projects;
