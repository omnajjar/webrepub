import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

import {
  FlexboxStyleProps,
  PaddingMarginStyleProps,
} from '@/desginer/designComponents/Common';
import { ContainerComponentProps } from '@/desginer/designComponents/Container';

const defaultFlexboxStyles: CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export const ContainerComponentSettings = () => {
  const { style } = useNode<Partial<ContainerComponentProps>>((node) => ({
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
