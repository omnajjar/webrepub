import { Element, useEditor } from '@craftjs/core';
import { Tooltip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { Button } from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';

import ButtonSvg from '~/icons/toolbox/button.svg';
import SquareSvg from '~/icons/toolbox/rectangle.svg';
import TypeSvg from '~/icons/toolbox/text.svg';
import YoutubeSvg from '~/icons/toolbox/video-line.svg';

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className='toolbox flex h-full w-12 flex-col bg-white transition'
    >
      <div className='flex flex-1 flex-col items-center pt-3'>
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height='300px'
                width='300px'
              ></Element>
            )
          }
        >
          <Tooltip title='Container' placement='right'>
            <Item className='m-2 block cursor-pointer pb-2' move>
              <SquareSvg />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize='12' textAlign='left' text='Hi there' />)
          }
        >
          <Tooltip title='Text' placement='right'>
            <Item className='m-2 block cursor-pointer pb-2' move>
              <TypeSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip title='Button' placement='right'>
            <Item className='m-2 block cursor-pointer pb-2' move>
              <ButtonSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title='Video' placement='right'>
            <Item className='m-2 block cursor-pointer pb-2' move>
              <YoutubeSvg />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
