import { Layers } from '@craftjs/layers';
import { CogIcon } from '@heroicons/react/solid';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import React, { useState } from 'react';
import {
  Content,
  CustomProvider,
  Divider,
  Navbar,
  Panel,
  PanelGroup,
  Stack,
} from 'rsuite';
import { Container, Nav, Sidebar, Sidenav } from 'rsuite';

import { ComponentsBar } from '@/desginer/ComponentsBox';
import { DesignViewport } from '@/desginer/DesignViewport';
import { DesignerContext } from '@/desginer/EditorContext';
import { PropertiesBox } from '@/desginer/PropertiesBox';
import {
  ActionsComponent,
  HistoryComponent,
} from '@/desginer/topbarComponents';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  color: ' #fff',
  overflow: 'hidden',
};

export function WebRepubEditor() {
  const [expanded, setExpanded] = useState(true);

  return (
    <CustomProvider theme='dark'>
      <DesignerContext>
        <div className='sidebar-page h-screen'>
          <Container>
            <EditorSidebar
              expanded={expanded}
              toggle={() => setExpanded(!expanded)}
            />
            <Container className='page-container'>
              <Stack
                direction='row'
                className='top-bar px-30'
                justifyContent='space-between'
              >
                <Stack.Item flex-grow={6} flex={6}>
                  <Stack justifyContent='space-between'>
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
                  {/* <HistoryComponent /> */}
                </Stack.Item>
              </Stack>
              <Divider style={{ margin: '0px' }}></Divider>
              {/* Editing area */}
              <Stack direction='row' alignItems='flex-start' spacing={0}>
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
                      <Stack className='h-full' alignItems='stretch'>
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

function EditorSidebar({
  expanded,
  toggle,
}: {
  expanded: boolean;
  toggle: () => void;
}) {
  return (
    <Sidebar
      className='h-screen'
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--rs-divider-border)',
      }}
      width={expanded ? 260 : 56}
      collapsible
    >
      <Sidenav.Header>
        <div style={{ ...headerStyles }}>
          <h6 style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {expanded ? 'WebRepub' : 'WR'}
          </h6>
        </div>
      </Sidenav.Header>
      <Divider style={{ margin: '0px' }}></Divider>
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
        className='h-screen'
      >
        {/* Components box area (left)*/}
        <ComponentsBar expanded={expanded} />
        <div>
          <Divider></Divider>
          <SidebarToggle expanded={expanded} toggle={toggle} />
        </div>
      </Stack>
    </Sidebar>
  );
}

function SidebarToggle({
  expanded,
  toggle,
}: {
  expanded: boolean;
  toggle: () => void;
}) {
  return (
    <Navbar appearance='subtle' className='nav-toggle'>
      <Nav>
        <Nav.Menu
          noCaret
          placement='topStart'
          trigger='click'
          title={<CogIcon style={{ width: 20, height: 20 }} />}
          menuStyle={{ margin: '10px' }}
        >
          <Nav.Item>Settings</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={toggle} style={{ width: 56, textAlign: 'center' }}>
          {expanded ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
