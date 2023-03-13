import { useEffect, useState } from 'react';
import { Container } from 'rsuite';

import { MainFrame } from '@/desginer/MainFrame';

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
      className='designer-bg-pattern items-center overflow-auto'
      style={{ height: `${initialHeigh}` }}
    >
      <div className='shadow-paper m-0 mt-20 mb-20 p-0'>
        <MainFrame></MainFrame>
      </div>
    </Container>
  );
}
