import { useEditor } from '@craftjs/core';
import cx from 'classnames';
import lz from 'lzutf8';
import React from 'react';

const design =
  'eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPENWZsZXhEaXJlY3Rpb24iOiJjb2x1bW4iLCJhbGlnbkl0ZW1zIjrFJi1zdGFydCIsImp1c3RpZnnEYGVudNAeZmlsbFNwYWPkAINubyIsInBhZGRpbmciOlsiNDAiLM4FXSwibWFyZ2luxB/EFMoEXSwiYmFja2dyb3VuZOUA4CI6MjU1LCJnxwhixwhhIjoxfSzkALpvcscoMMUmMMUkMMkic2hhZG93xRJyYWRpdXPFC3dpZHRoIjoiODAwcHgiLCJoZWlnaOQA12F1dG/kATxkaXNwbGF58QFXLCJjdXN0b23EdM4kRG9jdW3kARx9LCJoaWRkZW4iOmZhbHNlLCJub2Rlc+QA7TNkalNWenBLLU0iLCJKRnphdFJsS1RtIiwiSUViOFUwaENwROQBBGxpbmtlZE7GN3t9fSzMOvoB/lRleMV/6gH55wCB6gH6b250U2l6xC0xMiIsInRleHRB5AH1IjoibGVm5QHMb250V+gBDzUw5AGY7AFmOTLlAWc55gFoxAfnAWnpAdMwLMUCXe0BfMRpIjoiSGkgdGhlcmXyAWPlALzrAV595AJFcuYCbOUC9fkBVvUBMOsBXf8BMP8BMP8BMP8BMP8BMP8BMP8BMP8BMP8BMO4BMOsCgP8BMP8BMP8BMP8BMP8BMP8BMP8BMP8BMP8BMOwBMH0=';

export const PrintViewPort: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { enabled, actions } = useEditor(() => {
    return {
      enabled: false,
    };
  });

  const json = lz.decompress(lz.decodeBase64(design));
  actions.deserialize(json);

  return (
    <div className='viewport'>
      <div
        className={cx(['fixed flex h-full w-full flex-row overflow-hidden'])}
      >
        <div className='page-container bg-white-smoke flex h-full flex-1 flex-col'>
          <div
            className={cx([
              'craftjs-renderer h-full w-full flex-1 overflow-auto pb-8 transition',
              {
                'bg-renderer-gray': enabled,
              },
            ])}
          >
            <div
              className='relative flex flex-col items-center pt-8'
              style={{ overflow: 'hidden' }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
