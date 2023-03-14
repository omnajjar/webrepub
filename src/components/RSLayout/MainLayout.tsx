import { CogIcon } from '@heroicons/react/solid';
import DashboardIcon from '@rsuite/icons/Dashboard';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import React, { MouseEventHandler, PropsWithChildren, useState } from 'react';
import { CustomProvider, Divider, Navbar, SidenavProps, Stack } from 'rsuite';
import { Container, Nav, Sidebar, Sidenav } from 'rsuite';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  color: ' #fff',
  overflow: 'hidden',
};

interface MainLayoutProps extends PropsWithChildren {
  overrideSidebar?: (props: SidenavProps) => JSX.Element;
  withContext?: ({ children }: PropsWithChildren) => JSX.Element;
}

export function MainLayout({
  children,
  overrideSidebar: OverrideSidebar,
  withContext: Context,
}: MainLayoutProps) {
  const [expand, setExpand] = useState(true);

  const Main = () => (
    <CustomProvider theme='dark'>
      <div className='sidebar-page h-screen'>
        <Container>
          <Sidebar
            className='h-screen'
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRight: '1px solid var(--rs-divider-border)',
            }}
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div style={{ ...headerStyles }}>
                <h6 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {' '}
                  {expand ? 'Docrepup' : 'D'}
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
              <>
                {OverrideSidebar ? (
                  <OverrideSidebar expanded={expand} />
                ) : (
                  <Sidenav
                    expanded={expand}
                    defaultOpenKeys={['3']}
                    appearance='subtle'
                  >
                    <Sidenav.Body>
                      <Nav>
                        <Nav.Item eventKey='1' active icon={<DashboardIcon />}>
                          Dashboard
                        </Nav.Item>
                        <Nav.Menu
                          eventKey='3'
                          trigger='hover'
                          title='Advanced'
                          icon={<MagicIcon />}
                          placement='rightStart'
                        >
                          <Nav.Item eventKey='3-1'>Geo</Nav.Item>
                          <Nav.Item eventKey='3-2'>Devices</Nav.Item>
                          <Nav.Item eventKey='3-3'>Brand</Nav.Item>
                          <Nav.Item eventKey='3-4'>Loyalty</Nav.Item>
                          <Nav.Item eventKey='3-5'>Visit Depth</Nav.Item>
                        </Nav.Menu>
                      </Nav>
                    </Sidenav.Body>
                  </Sidenav>
                )}
              </>
              <div>
                <Divider></Divider>
                <NavToggle
                  expand={expand}
                  onChange={() => setExpand(!expand)}
                />
              </div>
            </Stack>
          </Sidebar>
          <Container className='page-container'>
            <h4 style={headerStyles}>Page Title</h4>
            <Divider style={{ margin: '0px' }}></Divider>
            {children}
          </Container>
        </Container>
      </div>
    </CustomProvider>
  );
  return Context ? (
    <Context>
      <Main />
    </Context>
  ) : (
    <Main />
  );
}

function NavToggle({
  expand,
  onChange,
}: {
  expand: boolean;
  onChange: MouseEventHandler<HTMLElement>;
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
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
