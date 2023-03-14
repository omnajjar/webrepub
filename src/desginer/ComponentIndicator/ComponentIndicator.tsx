import { NodeData, useEditor, useNode } from '@craftjs/core';
import { ROOT_NODE } from '@craftjs/utils';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Stack } from 'rsuite';

import { ensure } from '@/utils';

import ArrowUp from '~/icons/arrow-up.svg';
import Delete from '~/icons/delete.svg';
import Move from '~/icons/move.svg';

const IndicatorContainerStyle: CSSProperties = {
  height: '30px',
  marginTop: '-30px',
  fontSize: '12px',
  lineHeight: '12px',
  position: 'absolute',
  padding: '5px',
  zIndex: 9999,
  background: '#2A2C32',
  display: 'flex',
  alignItems: 'center',
};

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
    dom,
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
      dom: node.dom,
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

  useEffect(() => {
    if (dom) {
      if (showIndicator) {
        dom.classList.add('component-selected');
        return;
      }

      dom.classList.remove('component-selected');
    }
  }, [dom, showIndicator]);

  const getPos = useCallback((dom: HTMLElement | null) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const currentRef = useRef<HTMLDivElement>(null);

  const refreshIndicatorPosition = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) {
      return;
    }

    const { top, left } = getPos(dom);

    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document
      .querySelector('.design-view-port')
      ?.addEventListener('scroll', refreshIndicatorPosition);

    return () => {
      document
        .querySelector('.design-view-port')
        ?.removeEventListener('scroll', refreshIndicatorPosition);
    };
  }, [refreshIndicatorPosition]);

  useEffect(() => {
    window.addEventListener('resize', refreshIndicatorPosition);

    return () => {
      window.removeEventListener('resize', refreshIndicatorPosition);
    };
  }, [refreshIndicatorPosition]);

  return (
    <>
      {showIndicator
        ? ReactDOM.createPortal(
            <div
              style={{
                ...IndicatorContainerStyle,
                ...(dom
                  ? {
                      left: getPos(dom).left,
                      top: getPos(dom).top,
                    }
                  : {}),
              }}
              ref={currentRef}
              className='indicator-bg fixed flex items-center px-2 py-2 text-white'
            >
              <Stack direction='row' spacing={8}>
                <Stack.Item>
                  <span className='indicator-component-name'>{name}</span>
                </Stack.Item>
                <Stack.Item>
                  {moveable ? (
                    <a
                      className='indicator-action pointer-move'
                      style={{ color: 'red' }}
                      ref={(ref) => {
                        if (ref) {
                          drag(ref);
                        }
                      }}
                    >
                      <Move className='indicator-container-icon' />
                    </a>
                  ) : null}
                </Stack.Item>
                <Stack.Item>
                  {id !== ROOT_NODE && (
                    <a
                      className='indicator-action pointer-cursor'
                      onClick={() => {
                        actions.selectNode(parent);
                      }}
                    >
                      <ArrowUp className='indicator-container-icon' />
                    </a>
                  )}
                </Stack.Item>
                <Stack.Item>
                  {' '}
                  {deletable ? (
                    <a
                      className='indicator-action pointer-cursor'
                      onMouseDown={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        actions.delete(id);
                      }}
                    >
                      <Delete className='indicator-container-icon' />
                    </a>
                  ) : null}
                </Stack.Item>
              </Stack>
            </div>,
            ensure(document.querySelector('.design-view-port'))
          )
        : null}
      {NodeToRender}
    </>
  );
};
