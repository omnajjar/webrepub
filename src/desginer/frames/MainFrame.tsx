import { Element, Frame } from '@craftjs/core';

import { WebPageComponent } from '@/desginer/components/WebPage/WebPageComponent';

export function MainFrame() {
  return (
    <Frame>
      <Element is={WebPageComponent} canvas></Element>
    </Frame>
  );
}
