import { useNode } from '@craftjs/core';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { WebPageComponentProps } from '@/desginer/designComponents/WebPage/WebPageComponent';

export const WebPageComponentSettings = () => {
  const { cssProps, name } = useNode<
    Partial<WebPageComponentProps> & { name: string }
  >((node) => ({
    cssProps: node.data.props.cssProps,
    name: node.data.displayName,
  }));

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <ColorStyleControls
        cssProps={cssProps}
        defaultExpanded={true}
        allowControls={['bg']}
      />
    </ComponentPropsControlsContainer>
  );
};
