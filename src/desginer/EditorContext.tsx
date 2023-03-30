import { Editor, Options } from '@craftjs/core';
import { PropsWithChildren } from 'react';

import { WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN } from '@/desginer/contsants';
import { ContainerComponent } from '@/desginer/designComponents/Container';
import { ImageComponent } from '@/desginer/designComponents/Image';
import { LinkComponent } from '@/desginer/designComponents/Link';
import {
  StackComponent,
  StackItemComponent,
} from '@/desginer/designComponents/Stack';
import { TextComponent } from '@/desginer/designComponents/Text/TextComponent';
import { WebPageComponent } from '@/desginer/designComponents/WebPage';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';
import { createRenderComponentIndicator } from '@/desginer/Indicator/createRenderComponentIndicator';

interface EditorContext extends PropsWithChildren {
  enabled: boolean;
}

export function EditorContext({ children, enabled }: EditorContext) {
  WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN;

  const [_, setValue] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN,
    ''
  );

  const editorEnabledProps: Partial<Options> = enabled
    ? {
        onRender: createRenderComponentIndicator,
        onNodesChange: (query) => {
          const designJson = query.serialize();
          setValue(JSON.stringify(designJson));
        },
        indicator: {
          success: 'blue',
        },
      }
    : {};

  return (
    <Editor
      enabled={enabled}
      {...editorEnabledProps}
      resolver={{
        WebPageComponent,
        ContainerComponent,
        TextComponent,
        StackComponent,
        StackItemComponent,
        LinkComponent,
        ImageComponent,
      }}
    >
      {children}
    </Editor>
  );
}
