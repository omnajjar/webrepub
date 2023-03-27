import { useNode } from '@craftjs/core';

import { ExtendedCSSProps } from '@/desginer/types';

export function useCommitComponentStyles(styleKeyName = 'style') {
  const {
    actions: { setProp },
  } = useNode();

  const commitStyles = (stylesToCommit: Partial<ExtendedCSSProps>) =>
    setProp((props: { [styleKey: string]: Partial<ExtendedCSSProps> }) => {
      props[styleKeyName] = stylesToCommit;
    });

  return {
    commitStyles,
  };
}
