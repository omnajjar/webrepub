import { MainLayout } from '@/components/RSLayout/MainLayout';

import { ComponentsBox } from '@/desginer/ComponentsBox';
import { DesignerContext } from '@/desginer/DesignerContext';
import { MainFrame } from '@/desginer/MainFrame';

export default function DesignerNew() {
  return <MainFrame></MainFrame>;
}

DesignerNew.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout overrideSidebar={ComponentsBox} withContext={DesignerContext}>
      {page}
    </MainLayout>
  );
};
