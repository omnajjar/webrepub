import { useEditor } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  Button,
  Content,
  Divider,
  Modal,
  Panel,
  PanelGroup,
  Stack,
  Tooltip,
  Whisper,
} from 'rsuite';
import { Container } from 'rsuite';
import styled from 'styled-components';

import { Drawer, ExamplesList, Logo, MenuButton } from '@/desginer/Components';
import { ComponentsBar } from '@/desginer/ComponentsBox';
import { DesignViewport } from '@/desginer/DesignViewport';
import { EditorContext } from '@/desginer/EditorContext';
import { PropertiesBox } from '@/desginer/PropertiesBox';
import { GlobalSettingsProvider } from '@/desginer/Providers/GlobalSettings';
import {
  ActionsComponent,
  HistoryComponent,
} from '@/desginer/topbarComponents';

export function WebRepubApp() {
  return (
    <GlobalSettingsProvider
      settings={{
        isInDesignMode: true,
      }}
    >
      <EditorContext enabled={true}>
        <Designer />
      </EditorContext>
    </GlobalSettingsProvider>
  );
}

const DevelopmentBadge = styled.span`
  position: absolute;
  left: 20px;
  bottom: -20px;
  z-index: 100;
  width: 160px;
  padding: 4px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  background-image: linear-gradient(
    to right,
    #ff8008 0%,
    #ffc837 51%,
    #ff8008 100%
  );
  background-size: 200% auto;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-position: right center;
  }
`;

function DisclaimerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal size='md' open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          <h4>⚠️ Disclaimer - Work In Progress 🏗️</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Welcome to Webrepub! <br />
          <br /> As we're still in the process of developing this app, we can't
          guarantee that everything will be perfect, but we promise to do our
          best to make it awesome.
          <br />
          <br />
          Please bear with us as we work to improve Webrepub and bring you new
          and exciting features. We're confident that you'll love what we have
          in store for the future.
          <br />
          <br />
          Thank you for your support and for being a part of the Webrepub
          community! ❤️
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} appearance='primary'>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Designer() {
  const {
    actions: { clearEvents },
  } = useEditor();
  const [propsBoxHeight, setPropsBoxHeight] = useState('100%');
  const [isExamplesDrawerOpen, setIsExamplesDrawerOpen] = useState(false);

  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

  const openDisclaimer = useCallback(() => {
    clearEvents();
    setDisclaimerOpen(true);
  }, [setDisclaimerOpen, clearEvents]);

  const openExamplesDrawer = useCallback(() => {
    clearEvents();
    setIsExamplesDrawerOpen(true);
  }, [setIsExamplesDrawerOpen, clearEvents]);

  const closeExamplesDrawer = useCallback(() => {
    setIsExamplesDrawerOpen(false);
  }, [setIsExamplesDrawerOpen]);

  const router = useRouter();

  const openPreviewPage = () => {
    router.push('/preview');
  };

  useEffect(() => {
    setPropsBoxHeight(`${window.innerHeight - 56 - 300}px`); // 56 topbar, 300 layers.
    setDisclaimerOpen(true);
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
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  style={{ position: 'relative' }}
                >
                  <Logo
                    scale={1}
                    onClick={() => router.push('https://webrepub.com')}
                  ></Logo>
                  <DevelopmentBadge onClick={openDisclaimer}>
                    Under Development 🛠️
                  </DevelopmentBadge>
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
                          endIcon={
                            <BsArrowsFullscreen
                              style={{ position: 'relative', top: '2px' }}
                            />
                          }
                        >
                          Full screen view
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
      <DisclaimerModal
        open={isDisclaimerOpen}
        onClose={() => setDisclaimerOpen(false)}
      />
    </>
  );
}
