import { Editor } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { ContainerComponent } from '@/desginer/components/Container';
import { TextComponent } from '@/desginer/components/Text';

export function DesignerContext({ children }: PropsWithChildren) {
  return (
    <Editor resolver={{ ContainerComponent, TextComponent }}>{children}</Editor>
  );
}
