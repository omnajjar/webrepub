import { useNode } from '@craftjs/core';

import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { ColorStyleControls } from '@/desginer/designComponents/Common/PropsControls/ColorStyleControls';
import { HtmlComponentProps } from '@/presets/react-email/Components/Html/HtmlComponent';

export const HtmlComponentSettings = () => {
  const { style, name } = useNode<
    Partial<HtmlComponentProps> & { name: string }
  >((node) => ({
    style: node.data.props.style,
    name: node.data.displayName,
  }));

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <ColorStyleControls cssProps={style} defaultExpanded={true} />
    </ComponentPropsControlsContainer>
  );
};
