import { useEditor, useNode, UserComponent } from '@craftjs/core';
import { CSSProperties } from 'react';
import styled, { css, CSSObject } from 'styled-components';

import { StackComponent } from '@/desginer/designComponents/Stack/StackComponent';
import { StackItemComponentSettings } from '@/desginer/designComponents/Stack/StackItemComponentSettings';

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
};

const userConfiguredStyles = css<StackItemComponentProps>`
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
`;

const Div = styled.div`
  ${userConfiguredStyles}

  /* global styles */
  display: flex;
`;

export interface StackItemComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cssProps?: CSSProperties;
}

export const StackItemComponent: UserComponent<StackItemComponentProps> = ({
  children,
  ...props
}: StackItemComponentProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <Div
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
    >
      {children ? (
        children
      ) : enabled ? (
        <EmptyStackItemContent></EmptyStackItemContent>
      ) : null}
    </Div>
  );
};

const EmptyStackItemContent = () => {
  return (
    <div className='empty-container-bg empty-container-size flex items-center justify-center'>
      <span>Stack Item content</span>
    </div>
  );
};

StackItemComponent.craft = {
  displayName: 'Stack Item',
  isCanvas: true,
  props: {
    cssProps: {
      ...defaultConfiguredStyles,
    },
  },
  rules: {
    canDrag: () => true,
    canDrop: (dropTarget) => dropTarget.data.type === StackComponent,
  },
  related: {
    settings: StackItemComponentSettings,
  },
};
