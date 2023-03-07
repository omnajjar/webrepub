import { useEditor } from '@craftjs/core';
import cx from 'classnames';
import lz from 'lzutf8';
import React, { PropsWithChildren, useEffect } from 'react';

import { Toolbox } from '@/packages/designer/editor/Viewport/Toolbox';
import { Sidebar } from '@/packages/designer/nextEditor/Sidebar';

import { Header } from './Header';

import { Project } from '@/types';

interface ViewportProps extends PropsWithChildren {
  project: Project;
  save: (content: string) => Promise<void>;
}

export function Viewport({ children, project, save }: ViewportProps) {
  const {
    enabled,
    connectors,
    actions: { setOptions, deserialize },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    const json = lz.decompress(lz.decodeBase64(project.content));
    deserialize(json);

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        '*'
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions, deserialize, project.content]);

  return (
    <div className='viewport'>
      <div
        className={cx(['fixed flex h-full w-full flex-row overflow-hidden'])}
      >
        <Toolbox />
        <div className='page-container bg-white-smoke flex h-full flex-1 flex-col'>
          <Header save={save} />
          <div
            className={cx([
              'craftjs-renderer h-full w-full flex-1 overflow-auto pb-8 transition',
              {
                'bg-renderer-gray': enabled,
              },
            ])}
            ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
          >
            <div
              className='relative flex flex-col items-center pt-8'
              style={{ overflow: 'hidden' }}
            >
              {children}
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
