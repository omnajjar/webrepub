import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

import { FlexboxStyleProps } from '@/desginer/designComponents/Common';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

const defaultFlexboxStyles: CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export const StackComponentSettings = () => {
  const {
    actions: { setProp },
    style,
  } = useNode<Partial<StackComponentProps>>((node) => ({
    style: node.data.props.style,
  }));

  return (
    <FlexboxStyleProps
      style={style}
      defaultExpanded={true}
      setElementProp={setProp}
      defaultFlexboxStyles={defaultFlexboxStyles}
    />
  );
};
