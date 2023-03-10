import { useNode } from '@craftjs/core';

import { NodeType } from '@/types';

interface TextComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  text: string;
}

export const TextComponent = ({ text, ...props }: TextComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <p {...props}>{text}</p>
    </div>
  );
};

TextComponent.craft = {
  rules: {
    canDrag: (node: NodeType<TextComponentProps>) =>
      node.data.props.text != 'Drag',
  },
};
