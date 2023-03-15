import { Layers } from '@craftjs/layers';
import { Content, Divider, Panel, PanelGroup, Stack } from 'rsuite';

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
        <Stack
          direction='column'
          justifyContent='space-between'
          alignItems='stretch'
          className='h-full'
        >
          <Stack.Item grow={1}>
            <Stack className='h-full' justifyContent='center'>
              <Stack.Item>
                <PropertiesBox />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Divider></Divider>
          <Stack.Item basis='200px'>
            <PanelGroup accordion>
              <Panel header='Layers' defaultExpanded>
                <div className='components-layers'>
                  <Layers expandRootOnLoad={true}></Layers>
                </div>
              </Panel>
            </PanelGroup>
          </Stack.Item>
        </Stack>
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
