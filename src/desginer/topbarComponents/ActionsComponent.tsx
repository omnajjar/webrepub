import { useEditor } from '@craftjs/core';
import OffRoundIcon from '@rsuite/icons/OffRound';
import RunningRoundIcon from '@rsuite/icons/RunningRound';
import TrashIcon from '@rsuite/icons/Trash';
import { Button, ButtonGroup, Tooltip, Whisper } from 'rsuite';

import {
  BLANK_DESIGN_JSON_STRING,
  WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN,
} from '@/desginer/contsants';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';

export function ActionsComponent() {
  const { actions, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [_, __, clearValue] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN,
    ''
  );

  const clear = () => {
    clearValue();
    actions.deserialize(JSON.parse(BLANK_DESIGN_JSON_STRING));
  };

  const toggleEditor = () => {
    actions.setOptions((options) => {
      options.enabled = !options.enabled;
    });
    actions.clearEvents();
  };

  return (
    <ButtonGroup size='md'>
      <Whisper
        placement='bottom'
        trigger='hover'
        speaker={<Tooltip>Clear</Tooltip>}
      >
        <Button onClick={clear}>
          <TrashIcon></TrashIcon>
        </Button>
      </Whisper>
      <Whisper
        placement='bottom'
        trigger='hover'
        speaker={<Tooltip>{enabled ? 'Disable' : 'Enable'}</Tooltip>}
      >
        <Button onClick={toggleEditor}>
          {enabled ? (
            <OffRoundIcon color='#ff7171'></OffRoundIcon>
          ) : (
            <RunningRoundIcon color='#0bc11e' />
          )}
        </Button>
      </Whisper>
    </ButtonGroup>
  );
}
