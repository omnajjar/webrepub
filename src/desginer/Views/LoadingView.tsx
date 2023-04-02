import { Container, Loader, Stack } from 'rsuite';

import { Logo } from '@/desginer/Components';

export function LoadingView() {
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
          <Loader size='md' content='Loading...' vertical />
        </Stack.Item>
      </Stack>
    </Container>
  );
}
