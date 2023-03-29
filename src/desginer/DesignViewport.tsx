import { useEffect, useRef, useState } from 'react';
import { Container } from 'rsuite';

import { MainFrame } from '@/desginer/frames/MainFrame';

export function DesignViewport() {
  const [initialHeigh, setIntialHeight] = useState('100%');
  const [initialWidth, setWidth] = useState('');

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window) {
      return;
    }

    // we need to set a fixed height to the design view port so that it can be scrollable.
    setIntialHeight(`${window.innerHeight - 56}px`); // 56px is the header height

    if (ref && ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setWidth(`${rect.width}px`);
    }
  }, []);

  return (
    <Container
      ref={ref}
      className='design-view-port flex flex-col items-center'
      style={{
        height: `${initialHeigh}`,
        ...(initialWidth ? { width: initialWidth } : {}),
        padding: '30px',
      }}
    >
      <MainFrame></MainFrame>
    </Container>
  );
}
