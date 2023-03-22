import { useNode } from '@craftjs/core';

import { FlexboxStyleProps } from '@/desginer/designComponents/Common';
import { StackComponentProps } from '@/desginer/designComponents/Stack';

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
    />
  );
};
