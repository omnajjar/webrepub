import { useNode } from '@craftjs/core';
import { useState } from 'react';
import { TbLink } from 'react-icons/tb';
import { Input, InputGroup, Panel, PanelGroup, Stack } from 'rsuite';

import { ColorStyleControls } from '@/desginer/designComponents/Common/ColorStyleControls';
import { ComponentPropsControlsContainer } from '@/desginer/designComponents/Common/ComponentPropsControlsContainer';
import { FlexboxStyleControls } from '@/desginer/designComponents/Common/FlexboxStyleControls';
import { PaddingMarginStyleControls } from '@/desginer/designComponents/Common/PaddingMarginStyleControls';
import { LinkComponentProps } from '@/desginer/designComponents/Link/LinkComponent';
import { sanitizeValue, toexternalLink } from '@/desginer/utils/strings';

export const LinkComponentSettings = () => {
  const {
    name,
    cssProps,
    caption,
    href,
    actions: { setProp },
  } = useNode<Partial<LinkComponentProps> & { name: string }>((node) => ({
    style: node.data.props.style,
    cssProps: node.data.props.cssProps,
    name: node.data.displayName,
    caption: node.data.props.caption,
    href: node.data.props.href,
  }));

  const [linkProps, setLinkprops] = useState<
    Pick<LinkComponentProps, 'caption' | 'href'>
  >({ href, caption });

  const handleOnCaptionChange = (v: string) => {
    const captionValue = sanitizeValue(v);
    setProp((props: Pick<LinkComponentProps, 'caption'>) => {
      props.caption = captionValue;
    });

    setLinkprops({ ...linkProps, caption: captionValue });
  };

  const handleLinkChange = (v: string) => {
    const hrefValue = sanitizeValue(v);
    setProp((props: Pick<LinkComponentProps, 'href'>) => {
      props.href = toexternalLink(sanitizeValue(v));
    });

    setLinkprops({ ...linkProps, href: hrefValue });
  };

  return (
    <ComponentPropsControlsContainer componentName={name}>
      <PanelGroup accordion>
        <Panel header='Link' defaultExpanded={true}>
          <Stack direction='column' spacing={20} alignItems='stretch'>
            <Stack.Item>
              <InputGroup>
                <InputGroup.Addon>Caption</InputGroup.Addon>
                <Input
                  value={linkProps.caption}
                  onChange={handleOnCaptionChange}
                  placeholder='e.g. WebRepub Home Page'
                />
              </InputGroup>
            </Stack.Item>
            <Stack.Item>
              <InputGroup>
                <InputGroup.Addon>
                  <TbLink />
                </InputGroup.Addon>
                <Input
                  value={linkProps.href}
                  onChange={handleLinkChange}
                  placeholder='e.g. https://webrepub.com'
                />
              </InputGroup>
            </Stack.Item>
          </Stack>
        </Panel>
      </PanelGroup>
      <FlexboxStyleControls
        style={cssProps}
        defaultExpanded={true}
        asFlexItem
        useStyledComponents
      />
      <ColorStyleControls
        style={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
      <PaddingMarginStyleControls
        style={cssProps}
        defaultExpanded={true}
        useStyledComponents
      />
    </ComponentPropsControlsContainer>
  );
};
