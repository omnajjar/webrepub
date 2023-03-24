import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';
import { StackItemProps } from 'rsuite/esm/Stack/StackItem';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';

const defaultFlexboxStyles: CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export const StackItemComponentSettings = () => {
  const { style } = useNode<Partial<StackItemProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <>
      <FlexboxStyleProps
        style={style}
        defaultExpanded={true}
        defaultFlexboxStyles={defaultFlexboxStyles}
      />
      <PaddingMarginStyleProps style={style} defaultExpanded={true} />
    </>
  );
};
