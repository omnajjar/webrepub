import { Element, Frame } from '@craftjs/core';

import { ContainerComponent } from '@/desginer/components/Container';
import { TextComponent } from '@/desginer/components/Text';

export function MainFrame() {
  return (
    <Frame>
      <Element canvas is={ContainerComponent}>
        <TextComponent text='Hello world!'></TextComponent>
        <Element canvas is={ContainerComponent}>
          <TextComponent text='Hello world!'></TextComponent>
        </Element>
      </Element>
    </Frame>
  );
}
