import { Editor, Frame } from '@craftjs/core';
import { useEffect, useState } from 'react';

import { PrintViewPort } from '@/builder/editor/Viewport/PrintViewPort';
import { Container, Text } from '@/builder/selectors';

function Print() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className='h-full h-screen'>
      <Editor
        resolver={{
          Container,
          Text,
        }}
        enabled={false}
      >
        <PrintViewPort>
          <Frame></Frame>
        </PrintViewPort>
      </Editor>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default Print;
