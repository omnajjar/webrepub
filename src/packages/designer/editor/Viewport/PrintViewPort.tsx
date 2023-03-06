import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import React, { PropsWithChildren } from 'react';

import { Project } from '@/types';

interface PrintViewportProps extends PropsWithChildren {
  project: Project;
}

export function PrintViewport({ project, children }: PrintViewportProps) {
  const { actions } = useEditor(() => {
    return {
      enabled: false,
    };
  });

  const json = lz.decompress(lz.decodeBase64(project.content));
  actions.deserialize(json);

  return <>{children}</>;
}
