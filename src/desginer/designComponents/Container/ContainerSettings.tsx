import { useNode } from '@craftjs/core';
import { CSSProperties } from 'react';

import { FlexboxStyleProps } from '@/desginer/designComponents/Common';
import { ContainerComponentProps } from '@/desginer/designComponents/Container';

const defaultFlexboxStyles: CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

export const ContainerComponentSettings = () => {
  const {
    actions: { setProp },
    style,
  } = useNode<Partial<ContainerComponentProps>>((node) => ({
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
