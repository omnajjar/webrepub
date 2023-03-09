import { Editor, Element, Frame } from '@craftjs/core';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { RenderNode, Viewport } from '.';
import { Container, Text } from '../selectors';
import { Button } from '../selectors/Button';
import { Custom1, OnlyButtons } from '../selectors/Custom1';
import { Custom3, Custom3BtnDrop } from '../selectors/Custom3';

import { Project } from '@/types';

const theme = createTheme({
  typography: {
    fontFamily: [
      'acumin-pro',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

interface DcoumentDesignerProps {
  project: Project;
  save: (content: string) => Promise<void>;
}

export function DocumentDesigner({ project, save }: DcoumentDesignerProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <ThemeProvider theme={theme}>
      <div className='h-full h-screen'>
        <Editor
          resolver={{
            Container,
            Text,
            Custom1,
            Custom3,
            Custom3BtnDrop,
            OnlyButtons,
            Button,
          }}
          enabled={false}
          onRender={RenderNode}
        >
          <Viewport project={project} save={save}>
            <Frame>
              <Element
                canvas
                is={Container}
                width='800px'
                height='auto'
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={['40', '40', '40', '40']}
                custom={{ displayName: 'Document' }}
                extraStyles={{
                  overflow: 'hidden', // TODO: a better apparoch is to to parse the content, and apply this style for the root node.
                }}
              ></Element>
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  ) : (
    <div className='flex items-center justify-center'>Loading ...</div>
  );
}
