import { useNode, UserComponent } from '@craftjs/core';
import { Children, CSSProperties } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { StackItemComponent } from '@/desginer/designComponents/Stack';
import { StackComponentExtraActions } from '@/desginer/designComponents/Stack/StackComponentExtraActions';
import { StackComponentSettings } from '@/desginer/designComponents/Stack/StackComponentSettings';

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
  alignItems: 'start',
  flexGrow: 1,
  rowGap: '5px',
  columnGap: '5px',

  borderStyle: 'solid',

  borderColor: '#000',

  borderLeftWidth: '0px',
  borderRightWidth: '0px',
  borderTopWidth: '0px',
  borderBottomWidth: '0px',

  borderTopLeftRadius: '0px',
  borderTopRightRadius: '0px',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',

  boxShadow: 'rgba(0,0,0,1) 0px 0px 0px 0px',
};

const userConfiguredStyles = css<StackComponentProps>`
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

  border-color: ${(props) => props.cssProps?.borderColor};

  border-left-width: ${(props) => props.cssProps?.borderLeftWidth};
  border-right-width: ${(props) => props.cssProps?.borderRightWidth};
  border-top-width: ${(props) => props.cssProps?.borderTopWidth};
  border-bottom-width: ${(props) => props.cssProps?.borderBottomWidth};

  border-top-left-radius: ${(props) => props.cssProps?.borderTopLeftRadius};
  border-top-right-radius: ${(props) => props.cssProps?.borderTopRightRadius};
  border-bottom-left-radius: ${(props) =>
    props.cssProps?.borderBottomLeftRadius};
  border-bottom-right-radius: ${(props) =>
    props.cssProps?.borderBottomRightRadius};

  box-shadow: ${(props) => props.cssProps?.boxShadow};
`;

const Div = styled.div`
  ${userConfiguredStyles}

  /* global styles */
  display: flex;
`;

export interface StackComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cssProps?: CSSProperties;
}

export const StackComponent: UserComponent<StackComponentProps> = ({
  children,
  ...props
}: StackComponentProps) => {
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
      {Children.count(children) === 0 ? <EmptyStackComponent /> : children}
    </Div>
  );
};

function EmptyStackComponent() {
  return (
    <div className='empty-container-bg empty-container-size flex items-center justify-center '>
      <span>Stack</span>
    </div>
  );
}

StackComponent.craft = {
  displayName: 'Stack',
  isCanvas: true,
  props: {
    cssProps: {
      ...defaultConfiguredStyles,
    },
  },
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: (incomingNodes) =>
      incomingNodes.every((n) => n.data.type === StackItemComponent),
  },
  related: {
    settings: StackComponentSettings,
    extraActions: StackComponentExtraActions,
  },
};
