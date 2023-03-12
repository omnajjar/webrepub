import { Element, Frame } from '@craftjs/core';

import { ContainerComponent } from '@/desginer/components/Container';

export function MainFrame() {
  return (
    <Frame>
      <Element canvas is={ContainerComponent}></Element>
    </Frame>
  );
}
