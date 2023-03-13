import { Element, Frame } from '@craftjs/core';

import { DocumentComponent } from '@/desginer/components/DocumentComponent';
import { PaperComponent } from '@/desginer/components/Paper';

export function MainFrame() {
  return (
    <Frame>
      <Element is={DocumentComponent} canvas>
        <Element is={PaperComponent} canvas></Element>
      </Element>
    </Frame>
  );
}
