import { Layers } from '@craftjs/layers';
import React, { useEffect, useState } from 'react';
import {
  Content,
  CustomProvider,
  Divider,
  Panel,
  PanelGroup,
  Stack,
} from 'rsuite';
import { Container } from 'rsuite';

import { ComponentsBar } from '@/desginer/ComponentsBox';
import { DesignViewport } from '@/desginer/DesignViewport';
import { DesignerContext } from '@/desginer/EditorContext';
import { PropertiesBox } from '@/desginer/PropertiesBox';
import {
  ActionsComponent,
  HistoryComponent,
} from '@/desginer/topbarComponents';

import Logo from '~/svg/logo.svg';

export function WebRepubEditor() {
  const [propsBoxHeight, setPropsBoxHeight] = useState('100%');

  useEffect(() => {
    setPropsBoxHeight(`${window.innerHeight - 56 - 200}px`); // 56 topbar, 200 layers.
  }, []);

  return (
    <CustomProvider theme='dark'>
      <DesignerContext>
        <div className='sidebar-page h-screen'>
          <Container className='h-screen'>
            <Container className='page-container'>
              <Stack
                direction='row'
                className='top-bar'
                justifyContent='space-between'
                alignItems='center'
              >
                <Stack.Item basis='200px'>
                  <Stack justifyContent='center' alignItems='center'>
                    <Logo
                      style={{ height: '32px', width: '64px' }}
                      className='logo-shadow'
                    ></Logo>
                    <Stack.Item></Stack.Item>
                  </Stack>
                </Stack.Item>

                <Stack.Item flex-grow={6} flex={6}>
                  <Stack justifyContent='space-between' className='px-30'>
                    <Stack.Item grow={1}>
                      <HistoryComponent />
                    </Stack.Item>
                    <Stack.Item grow={1}>
                      <Stack direction='row-reverse'>
                        <Stack.Item>
                          <ActionsComponent />
                        </Stack.Item>
                      </Stack>
                    </Stack.Item>
                  </Stack>
                </Stack.Item>
                <Stack.Item basis='320px' className='h-full w-full'>
                  {/* Above properties box*/}
                </Stack.Item>
              </Stack>
              <Divider style={{ margin: '0px' }}></Divider>
              {/* Editing area */}
              <Stack
                direction='row'
                alignItems='flex-start'
                spacing={0}
                className='h-full designer-bg-pattern'
              >
                <Stack.Item basis='200px' className='h-full'>
                  {/* Componets box sextion */}
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    className='h-full'
                  >
                    <ComponentsBar />
                  </Stack>
                </Stack.Item>
                <Stack.Item grow={6}>
                  <Content>
                    <DesignViewport />
                  </Content>
                </Stack.Item>
                <Stack.Item
                  basis='320px'
                  className='bg-props-box h-full w-full'
                >
                  <Stack
                    direction='column'
                    justifyContent='space-between'
                    alignItems='stretch'
                    className='h-full'
                  >
                    <Stack.Item grow={1}>
                      <Stack
                        style={{ height: propsBoxHeight, overflow: 'auto' }}
                        alignItems='stretch'
                      >
                        <Stack.Item grow={1}>
                          <PropertiesBox />
                        </Stack.Item>
                      </Stack>
                    </Stack.Item>
                    <Divider className='my-10'></Divider>
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
            </Container>
          </Container>
        </div>
      </DesignerContext>
    </CustomProvider>
  );
}
