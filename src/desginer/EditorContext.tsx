import { Editor } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { ContainerComponent } from '@/desginer/designComponents/Container';
import { TextComponent } from '@/desginer/designComponents/Text/Text';
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
      }}
    >
      {children}
    </Editor>
  );
}
