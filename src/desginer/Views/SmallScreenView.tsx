import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { Button, Container, Divider, Stack } from 'rsuite';

import { Logo } from '@/desginer/Components';

export function SmallScreenView() {
  return (
    <Container className='h-screen'>
      <Stack
        direction='column'
        className='h-screen'
        justifyContent='center'
        alignItems='center'
      >
        <Stack.Item>
          <Logo scale={8}></Logo>
        </Stack.Item>
        <Stack.Item>
          <div className='text-center'>
            <b>WebRepub</b> Page Editor is optimized to work on large screens!
          </div>
          <div className='text-center'>
            Give it a try once a large screen is available!
          </div>
          <div></div>
        </Stack.Item>
        <Stack.Item>
          <Divider></Divider>
          <Button
            startIcon={<FaGithub />}
            endIcon={<FiExternalLink />}
            size='sm'
            href='https://github.com/omnajjar/webrepub'
            target='_blank'
            style={{ color: '#fff', fontSize: '18px' }}
          >
            Check it out on Github
          </Button>
        </Stack.Item>
      </Stack>
    </Container>
  );
}
