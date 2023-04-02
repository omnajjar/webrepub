import { useRouter } from 'next/router';
import { Button, Container, Divider, Stack } from 'rsuite';

import { Logo } from '@/desginer/Components';

export function NotFoundView() {
  const router = useRouter();

  return (
    <Container className='h-screen'>
      <Stack
        direction='column'
        className='h-screen'
        justifyContent='center'
        alignItems='center'
      >
        <Stack.Item>
          <Logo scale={7}></Logo>
        </Stack.Item>
        <Stack.Item>
          <h2 className='text-center'>404 Not Found</h2>
          <h6 className='text-center'>
            Oops It seems that you're lost your way!
          </h6>
        </Stack.Item>
        <Stack.Item>
          <Divider></Divider>
          <Button
            appearance='subtle'
            size='sm'
            target='_blank'
            style={{ color: '#fff', fontSize: '16px' }}
            onClick={() => router.push('/')}
          >
            Go to home page
          </Button>
        </Stack.Item>
      </Stack>
    </Container>
  );
}
