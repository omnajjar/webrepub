import { useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { ContainerComponentSettings } from '@/desginer/designComponents/Container/ContainerSettings';

const defaultConfiguredStyles: CSSObject = {
  paddingLeft: '8px',
  paddingRight: '8px',
  paddingTop: '8px',
  paddingBottom: '8px',

  marginLeft: '0px',
  marginRight: '0px',
  marginTop: '0px',
  marginBottom: '0px',

  color: '#fff',
  backgroundColor: '#ffffff00',

  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexGrow: 1,
  rowGap: '5px',
  columnGap: '5px',

  borderStyle: 'solid',

  borderLeftWidth: '0px',
  borderRightWidth: '0px',
  borderTopWidth: '0px',
  borderBottomWidth: '0px',
};

const userConfiguredStyles = css<ContainerComponentProps>`
  padding-left: ${(props) => props.cssProps?.paddingLeft};
  padding-right: ${(props) => props.cssProps?.paddingRight};
  padding-top: ${(props) => props.cssProps?.paddingTop};
  padding-bottom: ${(props) => props.cssProps?.paddingBottom};

  margin-left: ${(props) => props.cssProps?.marginLeft};
  margin-right: ${(props) => props.cssProps?.marginRight};
  margin-top: ${(props) => props.cssProps?.marginTop};
  margin-bottom: ${(props) => props.cssProps?.marginBottom};

  color: ${(props) => props.cssProps?.color};
  background-color: ${(props) => props.cssProps?.backgroundColor};

  flex-direction: ${(props) => props.cssProps?.flexDirection};
  justify-content: ${(props) => props.cssProps?.justifyContent};
  align-items: ${(props) => props.cssProps?.alignItems};
  flex-grow: ${(props) => props.cssProps?.flexGrow};
  row-gap: ${(props) => props.cssProps?.rowGap};
  column-gap: ${(props) => props.cssProps?.columnGap};

  border-style: ${(props) => props.cssProps?.borderStyle};

  border-color: black;

  border-left-width: ${(props) => props.cssProps?.borderLeftWidth};
  border-right-width: ${(props) => props.cssProps?.borderRightWidth};
  border-top-width: ${(props) => props.cssProps?.borderTopWidth};
  border-bottom-width: ${(props) => props.cssProps?.borderBottomWidth};
`;

const Div = styled.div`
  ${userConfiguredStyles}

  /* global styles */
  display: flex;
`;

export interface ContainerComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cssProps?: CSSProperties;
}

export const ContainerComponent: UserComponent<ContainerComponentProps> = ({
  children,
  ...props
}: ContainerComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? children : <EmptyContainerContent></EmptyContainerContent>}
    </Div>
  );
};

function EmptyContainerContent() {
  return (
    <div className='empty-container-bg empty-container-size flex items-center justify-center '>
      <span>Container</span>
    </div>
  );
}

ContainerComponent.craft = {
  displayName: 'Container',
  isCanvas: true,
  props: {
    cssProps: {
      ...defaultConfiguredStyles,
    },
  },
  rules: {
    canMoveIn: () => true,
    canDrag: () => true,
  },
  related: {
    settings: ContainerComponentSettings,
  },
};
