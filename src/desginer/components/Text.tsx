import { useNode } from '@craftjs/core';
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { Slider, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';

import { CraftExtention, NodeType } from '@/types';

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
    actions: { setProp },
    hasSelectedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (hasSelectedNode) {
      setEditable(true);
      return;
    }

    setEditable(false);
  }, [hasSelectedNode]);

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props: Pick<TextComponentProps, 'text'>) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ''))
          )
        }
        tagName='p'
        style={{ padding: '8px', borderRadios: '0px', ...props.style }}
      />
    </div>
  );
};

const TextComponentSettings = () => {
  const {
    actions: { setProp },
    style,
  } = useNode<{ style: React.CSSProperties }>((node) => ({
    style: node.data.props.style,
  }));

  const [textSyle, setTextStyle] = useState(style);

  return (
    <Tabs value='font'>
      <TabsHeader className='border-radios-0 w-full'>
        <Tab value='font'>Font</Tab>
        <Tab value='alignment'>Alignment</Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value='font' className='w-full'>
          <>
            <Typography id='non-linear-slider' gutterBottom className='foo'>
              Font size
            </Typography>
            <Slider
              value={Number(textSyle.fontSize?.toString().replace('px', ''))}
              min={8}
              step={1}
              max={250}
              onChange={(_, value) => {
                setProp((props: Pick<TextComponentProps, 'style'>) => {
                  if (!props.style) {
                    props.style = {};
                  }

                  const nextFontSize = value;
                  const nextStyle = {
                    ...textSyle,
                    fontSize: nextFontSize.toString() + 'px',
                  };
                  setTextStyle(nextStyle);
                  props.style = nextStyle;
                });
              }}
            />
          </>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};

const TextComponentExtention: CraftExtention<TextComponentProps> = {
  props: {
    text: 'Hi',
    style: {
      fontSize: '14px',
    },
  },
  rules: {
    canDrag: (_node: NodeType<TextComponentProps>) => true,
  },
  related: {
    settings: TextComponentSettings,
  },
};

TextComponent.craft = TextComponentExtention;
