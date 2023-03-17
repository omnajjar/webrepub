import { Editor } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { ContainerComponent } from '@/desginer/components/Container';
import { TextComponent } from '@/desginer/components/Text/Text';
import { WebPageComponent } from '@/desginer/components/WebPage';
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
