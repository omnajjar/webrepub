import { Editor } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { createRenderComponentIndicator } from '@/desginer/componentIndicator/createRenderComponentIndicator';
import { ContainerComponent } from '@/desginer/components/Container';
import { DocumentComponent } from '@/desginer/components/DocumentComponent';
import { PaperComponent } from '@/desginer/components/Paper';
import { TextComponent } from '@/desginer/components/Text/Text';

export function DesignerContext({ children }: PropsWithChildren) {
  return (
    <Editor
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
