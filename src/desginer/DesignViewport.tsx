import { useEffect, useState } from 'react';
import { Container } from 'rsuite';

import { MainFrame } from '@/desginer/frames/MainFrame';

export function DesignViewport() {
  const [initialHeigh, setIntialHeight] = useState('100%');

  useEffect(() => {
    if (!window) {
      return;
    }

    // we need to set a fixed height to the design view port so that it can be scrollable.
    setIntialHeight(`${window.innerHeight - 56}px`); // 56px is the header height
  }, []);

  return (
    <Container
      className='design-view-port flex flex-col items-center'
      style={{ height: `${initialHeigh}`, padding: '30px' }}
    >
      <MainFrame></MainFrame>
    </Container>
  );
}
