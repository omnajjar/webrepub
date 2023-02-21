import { Editor, Element, Frame } from '@craftjs/core';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { RenderNode, Viewport } from '.';
import { Container, Text } from '../selectors';
import { Button } from '../selectors/Button';
import { Custom1, OnlyButtons } from '../selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../selectors/Custom3';
import { Video } from '../selectors/Video';

const theme = createMuiTheme({
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

export function BuilderPage() {
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
            Custom2,
            Custom2VideoDrop,
            Custom3,
            Custom3BtnDrop,
            OnlyButtons,
            Button,
            Video,
          }}
          enabled={false}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width='800px'
                height='auto'
                background={{ r: 255, g: 255, b: 255, a: 1 }}
                padding={['40', '40', '40', '40']}
                custom={{ displayName: 'Document' }}
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
