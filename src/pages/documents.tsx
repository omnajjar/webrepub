import { BuilderPage } from '@/builder/editor/page';

function Page() {
  return <BuilderPage />;
}

Page.getLayout = function getLayout(page: JSX.Element) {
  return <>{page}</>;
};

export default Page;
