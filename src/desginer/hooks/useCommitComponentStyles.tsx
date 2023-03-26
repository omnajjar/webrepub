import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

export function useCommitComponentStyles(styleKeyName = 'style') {
  const {
    actions: { setProp },
  } = useNode();

  const commitStyles = (stylesToCommit: CSSProperties) =>
    setProp((props: { [styleKey: string]: CSSProperties }) => {
      props[styleKeyName] = stylesToCommit;
    });

  return {
    commitStyles,
  };
}
