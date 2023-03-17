import { NodeData, useEditor, useNode } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, IconButton, Tooltip, Whisper } from 'rsuite';
import { OverlayTriggerHandle } from 'rsuite/esm/Picker';

import { onElementResize } from '@/desginer/utils/resizeObserver';
import { ensure } from '@/utils';

import ArrowUp from '~/icons/arrow-up.svg';
import Delete from '~/icons/delete.svg';
import Move from '~/icons/move.svg';

interface ComponentIndicatorProps {
  ComponentToRender: JSX.Element;
  deletableNodes: Set<NodeData['type']>;
  hideIndicatorFor: Set<NodeData['type']>;
}

export const ComponentIndicator = ({
  ComponentToRender: NodeToRender,
  deletableNodes,
  hideIndicatorFor,
}: ComponentIndicatorProps) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));

  const {
    isHover,
    componentDOM,
    name,
    moveable,
    connectors: { drag },
    parent,
    deletable,
    nodeType,
  } = useNode((node) => {
    const deletable =
      query.node(node.id).isDeletable() || deletableNodes?.has(node.data.type);

    return {
      isHover: node.events.hovered,
      componentDOM: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      moveable: query.node(node.id).isDraggable(),
      parent: node.data.parent,
      props: node.data.props,
      deletable,
      nodeType: node.data.type,
    };
  });

  const showIndicator =
    (isHover || isActive) && !hideIndicatorFor.has(nodeType);

  const getPos = useCallback((element: HTMLElement | null) => {
    const defaultPos = { top: 0, left: 0, bottom: 0, width: 0, height: 0 };

    const { top, left, bottom, height, width } = element
      ? element.getBoundingClientRect()
      : defaultPos;

    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }, []);

  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const whisperRef = useRef<OverlayTriggerHandle>(null);

  const refreshIndicatorPosition = useCallback(() => {
    if (!indicatorRef.current) {
      return;
    }

    const nextPos = getPos(componentDOM);

    indicatorRef.current.style.top = nextPos.top;
    indicatorRef.current.style.left = nextPos.left;
    indicatorRef.current.style.height = nextPos.height;
    indicatorRef.current.style.width = nextPos.width;

    // This is a bit hacky way to keep whisper content refreshed and correctly postioned
    // on screen resize/scroll
    // TODO: consider researching and having a better solution to handle it in the future.
    const indicatorPlaceholderEl = document.getElementById(id);
    if (indicatorPlaceholderEl) {
      indicatorPlaceholderEl.style.top = nextPos.top;
      indicatorPlaceholderEl.style.left = nextPos.left;
      indicatorPlaceholderEl.style.width = nextPos.width;
    }
  }, [componentDOM, getPos, id]);

  const refreshWhisperPosition = useCallback(() => {
    if (!whisperRef.current) {
      return;
    }

    whisperRef.current.updatePosition();
  }, []);

  useEffect(() => {
    const refresh = () => {
      refreshIndicatorPosition();
      refreshWhisperPosition();
    };

    const designViewPortElement = ensure(
      document.querySelector('.design-view-port')
    );

    window.addEventListener('resize', refresh);

    designViewPortElement.addEventListener('scroll', refresh);
    const editorResizeObserver = onElementResize(
      designViewPortElement,
      refresh
    );

    return () => {
      window.removeEventListener('resize', refresh);
      designViewPortElement.removeEventListener('scroll', refresh);
      editorResizeObserver.disconnect();
    };
  }, [refreshIndicatorPosition, refreshWhisperPosition]);

  if (!showIndicator) {
    return NodeToRender;
  }

  const currentPosition = getPos(componentDOM);

  const selectParent = () => {
    actions.selectNode(parent);
  };

  const deleteComponent = () => {
    actions.delete(id);
  };

  const isOnlyHovered = isHover && !isActive;

  return (
    <>
      {NodeToRender}

      {ReactDOM.createPortal(
        <>
          <Whisper
            preventOverflow
            ref={whisperRef}
            placement={isOnlyHovered ? 'topStart' : 'top'}
            open={true}
            speaker={
              showIndicator ? (
                <Tooltip
                  arrow={false}
                  style={{ opacity: isOnlyHovered ? 0.3 : 1 }}
                >
                  <span style={{ marginRight: '8px' }}>{name}</span>
                  <ButtonGroup
                    size='xs'
                    style={{
                      border: '1px solid darkblue',
                      borderRadius: '7px',
                    }}
                  >
                    {moveable ? (
                      <IconButton
                        icon={<Move className='indicator-container-icon' />}
                        ref={(ref) => {
                          if (ref) {
                            drag(ref);
                          }
                        }}
                      />
                    ) : null}
                    {id !== ROOT_NODE ? (
                      <IconButton
                        icon={<ArrowUp className='indicator-container-icon' />}
                        onclick={selectParent}
                      />
                    ) : null}
                    {deletable ? (
                      <IconButton
                        icon={<Delete className='indicator-container-icon' />}
                        onClick={deleteComponent}
                      />
                    ) : null}
                  </ButtonGroup>
                </Tooltip>
              ) : (
                <></>
              )
            }
          >
            <div
              id={id}
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 9000,
                ...(componentDOM
                  ? {
                      top: currentPosition.top,
                      left: currentPosition.left,
                      width: currentPosition.width,
                      height: '0px',
                    }
                  : {}),
              }}
            ></div>
          </Whisper>
          {showIndicator ? (
            <div
              style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 9000,
                ...(componentDOM
                  ? {
                      ...currentPosition,
                    }
                  : {}),
              }}
              ref={indicatorRef}
            >
              <IndicatorCorner
                position='top-left'
                isActive={isActive}
              ></IndicatorCorner>
              <IndicatorCorner
                position='top-right'
                isActive={isActive}
              ></IndicatorCorner>
              <IndicatorCorner
                position='bottom-left'
                isActive={isActive}
              ></IndicatorCorner>
              <IndicatorCorner
                position='bottom-right'
                isActive={isActive}
              ></IndicatorCorner>
            </div>
          ) : null}
        </>,
        document.body
      )}
    </>
  );
};

interface IndicatorCornerProps extends React.SVGProps<SVGSVGElement> {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  isActive: boolean;
}

const IndicatorCorner = ({
  position,
  isActive,
  ...props
}: IndicatorCornerProps) => {
  let style: CSSProperties = {
    position: 'absolute',
    width: '14px',
    height: '14px',
    display: 'block',
    cursor: 'pointer',
  };

  switch (position) {
    case 'top-left':
      style = {
        ...style,
        transform: 'rotate(270deg)',
        top: 0,
        left: 0,
      };
      break;
    case 'top-right':
      style = {
        ...style,
        top: 0,
        right: 0,
      };
      break;
    case 'bottom-left':
      style = {
        ...style,
        bottom: 0,
        left: 0,
        transform: 'rotate(180deg)',
      };
      break;
    case 'bottom-right':
      style = {
        ...style,
        bottom: 0,
        right: 0,
        transform: 'rotate(90deg)',
      };
      break;
  }

  const { style: propsStyle, ...otherProps } = props;

  return (
    <svg
      custom-position={position}
      style={{ ...propsStyle, ...style }}
      {...otherProps}
    >
      <path
        d='M0,0 L14,0 L14,14 L12,14 L12,2 L0,2 Z'
        stroke={isActive ? 'darkblue' : 'darkgray'}
        strokeWidth={isActive ? '3' : '1'}
        fill='#000'
      ></path>
    </svg>
  );
};
