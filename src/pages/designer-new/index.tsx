import { Content, Stack } from 'rsuite';

import { MainLayout } from '@/components/RSLayout/MainLayout';

import { ComponentsBox } from '@/desginer/ComponentsBox';
import { DesignerContext } from '@/desginer/DesignerContext';
import { DesignViewport } from '@/desginer/DesignViewport';
import { PropertiesBox } from '@/desginer/PropertiesBox';

export default function DesignerNew() {
  return (
    <Stack direction='row' alignItems='flex-start' spacing={0}>
      <Stack.Item grow={6}>
        <Content>
          <DesignViewport />
        </Content>
      </Stack.Item>
      <Stack.Item basis='320px' className='bg-props-box h-full w-full'>
        <PropertiesBox />
      </Stack.Item>
    </Stack>
  );
}

DesignerNew.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout overrideSidebar={ComponentsBox} withContext={DesignerContext}>
      {page}
    </MainLayout>
  );
};
