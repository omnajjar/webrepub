import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

const defaultFlexboxStyles: CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export const StackComponentSettings = () => {
  const { style } = useNode<Partial<StackComponentProps>>((node) => ({
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