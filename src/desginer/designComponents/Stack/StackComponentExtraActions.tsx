import { FreshNode, useEditor, useNode } from '@craftjs/core';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import { ButtonGroup, IconButton, Tooltip, Whisper } from 'rsuite';

import { StackItemComponent } from '@/desginer/designComponents/Stack';

export const StackComponentExtraActions = () => {
  const { id } = useNode();

  const { actions, query } = useEditor();

  const addStackItem = () => {
    const freshNode: FreshNode = {
      data: {
        parent: id,
        type: StackItemComponent,
      },
    };

    const node = query.parseFreshNode(freshNode).toNode();
    actions.add(node, id);
  };

  return (
    <ButtonGroup className='indicator-actions-btn-group' size='xs'>
      <Whisper placement='bottom' speaker={<Tooltip>Add item</Tooltip>}>
        <IconButton
          onClick={addStackItem}
          icon={<PlusRoundIcon className='indicator-container-icon' />}
        />
      </Whisper>
    </ButtonGroup>
  );
};
