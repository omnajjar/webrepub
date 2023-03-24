import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

export function useCommitComponentStyles<
  ComponentProps extends { style: CSSProperties }
>() {
  const {
    actions: { setProp },
  } = useNode();

  const commitStyles = (stylesToCommit: CSSProperties) =>
    setProp((props: Pick<ComponentProps, 'style'>) => {
      props.style = stylesToCommit;
    });

  return {
    commitStyles,
  };
}
