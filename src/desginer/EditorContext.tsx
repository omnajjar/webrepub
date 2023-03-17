import { Editor } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { ContainerComponent } from '@/desginer/components/Container';
import { DocumentComponent } from '@/desginer/components/DocumentComponent';
import { PaperComponent } from '@/desginer/components/Paper';
import { TextComponent } from '@/desginer/components/Text/Text';
import { createRenderComponentIndicator } from '@/desginer/Indicator/createRenderComponentIndicator';

export function DesignerContext({ children }: PropsWithChildren) {
  return (
    <Editor
      indicator={{
        success: 'blue',
      }}
      onRender={createRenderComponentIndicator}
      resolver={{
        DocumentComponent,
        PaperComponent,
        ContainerComponent,
        TextComponent,
      }}
    >
      {children}
    </Editor>
  );
}
