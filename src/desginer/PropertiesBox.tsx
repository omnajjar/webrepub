import { useEditor } from '@craftjs/core';
import React from 'react';
import { Container, Message, Stack } from 'rsuite';

export const PropertiesBox = () => {
  const { selected } = useEditor((state) => {
    const [currentNodeId] = Array.from(state.events.selected);
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      };
    }

    return {
      selected,
    };
  });

  return (
    <Container className='h-full w-full'>
      {!!selected && !!selected.settings ? (
        <div className='w-full'> {React.createElement(selected.settings)}</div>
      ) : (
        <Stack justifyContent='center' alignItems='center' className='h-full'>
          <Stack.Item>
            <Message showIcon type='info'>
              Please select a component!
            </Message>
          </Stack.Item>
        </Stack>
      )}
    </Container>
  );
};
