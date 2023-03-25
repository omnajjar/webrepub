import { PropsWithChildren } from 'react';
import { Stack } from 'rsuite';

interface ComponentControlsContainer extends PropsWithChildren {
  componentName: string;
}

export function ComponentPropsControlsContainer({
  componentName,
  children,
}: ComponentControlsContainer) {
  return (
    <Stack direction='column' alignItems='stretch'>
      <Stack.Item grow={1}>
        <div className='controls-title bg-controls-title px-15 py-10'>
          <span>{`${componentName} controls`}</span>
        </div>
      </Stack.Item>
      <Stack.Item grow={1}>{children}</Stack.Item>
    </Stack>
  );
}
