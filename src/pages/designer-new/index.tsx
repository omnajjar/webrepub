import { Container, Content } from 'rsuite';

import { MainLayout } from '@/components/RSLayout/MainLayout';

import { ComponentsBox } from '@/desginer/ComponentsBox';
import { DesignerContext } from '@/desginer/DesignerContext';
import { MainFrame } from '@/desginer/MainFrame';

export default function DesignerNew() {
  return (
    <Content className='designer-bg-pattern h-full overflow-auto'>
      <Container className='h-full items-center'>
        <div
          style={{ height: '842px', width: '595px', background: '#fff' }}
          className='shadow-paper m-0 mt-20 mb-20 p-0'
        >
          <MainFrame></MainFrame>
        </div>
      </Container>
    </Content>
  );
}

DesignerNew.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout overrideSidebar={ComponentsBox} withContext={DesignerContext}>
      {page}
    </MainLayout>
  );
};
