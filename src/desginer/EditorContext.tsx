import { Editor } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { ContainerComponent } from '@/desginer/designComponents/Container';
import {
  StackComponent,
  StackItemComponent,
} from '@/desginer/designComponents/Stack';
import { TextComponent } from '@/desginer/designComponents/Text/TextComponent';
import { WebPageComponent } from '@/desginer/designComponents/WebPage';
import { createRenderComponentIndicator } from '@/desginer/Indicator/createRenderComponentIndicator';

export function DesignerContext({ children }: PropsWithChildren) {
  return (
    <Editor
      indicator={{
        success: 'blue',
      }}
      onRender={createRenderComponentIndicator}
      resolver={{
        WebPageComponent,
        ContainerComponent,
        TextComponent,
        StackComponent,
        StackItemComponent,
      }}
    >
      {children}
    </Editor>
  );
}
