import { Editor, Frame } from '@craftjs/core';

import { PrintViewPort } from '@/builder/editor/Viewport/PrintViewPort';
import { Container, Text } from '@/builder/selectors';

function Print() {
  return (
    <div className='flex justify-center'>
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
  );
}

export default Print;
