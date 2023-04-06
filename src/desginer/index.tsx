import { useEditor } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  Button,
  Content,
  Divider,
  Panel,
  PanelGroup,
  Stack,
  Tooltip,
  Whisper,
} from 'rsuite';
import { Container } from 'rsuite';

import { Drawer, ExamplesList, Logo, MenuButton } from '@/desginer/Components';
import { ComponentsBar } from '@/desginer/ComponentsBox';
import { DesignViewport } from '@/desginer/DesignViewport';
import { EditorContext } from '@/desginer/EditorContext';
import { PropertiesBox } from '@/desginer/PropertiesBox';
import {
  ActionsComponent,
  HistoryComponent,
} from '@/desginer/topbarComponents';

function Designer() {
  const { actions } = useEditor();
  const [propsBoxHeight, setPropsBoxHeight] = useState('100%');
  const [isExamplesDrawerOpen, setIsExamplesDrawerOpen] = useState(false);

  const openExamplesDrawer = () => {
    actions.clearEvents();
    setIsExamplesDrawerOpen(true);
  };
  const closeExamplesDrawer = () => setIsExamplesDrawerOpen(false);

  const router = useRouter();

  const openPreviewPage = () => {
    router.push('/preview');
  };

  useEffect(() => {
    setPropsBoxHeight(`${window.innerHeight - 56 - 300}px`); // 56 topbar, 300 layers.
  }, []);

  return (
    <>
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
                    scale={1}
                    onClick={() => router.push('https://webrepub.com')}
                  ></Logo>
                </Stack>
              </Stack.Item>

              <Stack.Item flex-grow={6} flex={6}>
                <Stack justifyContent='space-around' className='px-30'>
                  <Stack.Item grow={1}>
                    <HistoryComponent />
                  </Stack.Item>
                  <Stack.Item grow={1} alignSelf='center'>
                    <Stack justifyContent='center'>
                      <Stack.Item>
                        <Button
                          size='sm'
                          className='fancy-grad'
                          onClick={openPreviewPage}
                        >
                          Preview
                        </Button>
                      </Stack.Item>
                    </Stack>
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
                <Stack direction='row' alignItems='center' className='h-full'>
                  <Stack.Item>
                    <Button
                      appearance='subtle'
                      startIcon={<FaGithub />}
                      endIcon={<FiExternalLink />}
                      size='sm'
                      href='https://github.com/omnajjar/webrepub'
                      target='_blank'
                      style={{ color: '#fff', fontSize: '16px' }}
                    >
                      Check it out on Github
                    </Button>
                  </Stack.Item>
                </Stack>
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
                  <Stack
                    direction='column'
                    justifyContent='space-between'
                    spacing={60}
                  >
                    <Stack.Item>
                      <ComponentsBar />
                    </Stack.Item>
                    <Stack.Item>
                      <Whisper
                        placement='right'
                        speaker={<Tooltip>More</Tooltip>}
                      >
                        <div>
                          <MenuButton onClick={openExamplesDrawer} />
                        </div>
                      </Whisper>
                    </Stack.Item>
                  </Stack>
                </Stack>
              </Stack.Item>
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
                  <Stack.Item basis='300px'>
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
      <Drawer
        open={isExamplesDrawerOpen}
        closeAction={closeExamplesDrawer}
        title='Load examples'
      >
        <ExamplesList onItemClick={closeExamplesDrawer} />
      </Drawer>
    </>
  );
}

export function WebRepubApp() {
  return (
    <EditorContext enabled={true}>
      <Designer />
    </EditorContext>
  );
}
