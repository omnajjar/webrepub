import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import React from 'react';

const design =
  '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';

export const PrintViewPort: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { actions } = useEditor(() => {
    return {
      enabled: false,
    };
  });

  const json = lz.decompress(lz.decodeBase64(design));
  actions.deserialize(json);

  return (
    // <div className='viewport'>
    //   <div
    //     className={cx(['fixed flex h-full w-full flex-row overflow-hidden'])}
    //   >
    //     <div className='page-container bg-white-smoke flex h-full flex-1 flex-col'>
    //       <div
    //         className={cx([
    //           'craftjs-renderer h-full w-full flex-1 overflow-auto pb-8 transition',
    //           {
    //             'bg-renderer-gray': enabled,
    //           },
    //         ])}
    //       >
    //         <div
    //           className='relative flex flex-col items-center pt-8'
    //           style={{ overflow: 'hidden' }}
    //         >
    <>{children}</>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
