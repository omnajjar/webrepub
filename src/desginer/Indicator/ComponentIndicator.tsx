import { NodeData, useEditor, useNode } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Divider, IconButton, Tooltip, Whisper } from 'rsuite';
import { OverlayTriggerHandle } from 'rsuite/esm/Picker';

import { getPos } from '@/desginer/utils/elements';
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
  const { id, extraActions } = useNode((node) => ({
    extraActions: node?.related?.extraActions,
  }));
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

    // This is a bit hacky way to keep whisper content refreshed and correctly postioned on screen resize/scroll.
    // TODO: consider researching and having a better solution to handle it in the future.
    const indicatorPlaceholderEl = document.getElementById(id);
    if (indicatorPlaceholderEl) {
      indicatorPlaceholderEl.style.top = nextPos.top;
      indicatorPlaceholderEl.style.left = nextPos.left;
      indicatorPlaceholderEl.style.width = nextPos.width;
    }
  }, [componentDOM, id]);

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

  return (
    <>
      {NodeToRender}
      {ReactDOM.createPortal(
        <>
          <Whisper
            preventOverflow
            ref={whisperRef}
            placement='top'
            open={isActive}
            speaker={
              showIndicator ? (
                <Tooltip arrow={false}>
                  <span style={{ marginRight: '8px' }}>{name}</span>
                  <ButtonGroup
                    className='indicator-actions-btn-group'
                    size='xs'
                  >
                    {moveable ? (
                      <Whisper
                        placement='bottom'
                        speaker={<Tooltip>Move</Tooltip>}
                      >
                        <IconButton
                          icon={<Move className='indicator-container-icon' />}
                          ref={(ref) => {
                            if (ref) {
                              drag(ref);
                              refreshWhisperPosition();
                            }
                          }}
                        />
                      </Whisper>
                    ) : null}
                    {id !== ROOT_NODE ? (
                      <Whisper
                        placement='bottom'
                        speaker={<Tooltip>Go to parent</Tooltip>}
                      >
                        <IconButton
                          icon={
                            <ArrowUp className='indicator-container-icon' />
                          }
                          onClick={selectParent}
                        />
                      </Whisper>
                    ) : null}
                    {deletable ? (
                      <Whisper
                        placement='bottom'
                        speaker={<Tooltip>Delete</Tooltip>}
                      >
                        <IconButton
                          icon={<Delete className='indicator-container-icon' />}
                          onClick={deleteComponent}
                        />
                      </Whisper>
                    ) : null}
                  </ButtonGroup>
                  {extraActions ? (
                    <>
                      <Divider vertical></Divider>
                      {React.createElement(extraActions)}
                    </>
                  ) : null}
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
