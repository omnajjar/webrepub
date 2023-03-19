import { useEditor } from '@craftjs/core';
import SaveIcon from '@rsuite/icons/legacy/Save';
import OffRoundIcon from '@rsuite/icons/OffRound';
import RunningRoundIcon from '@rsuite/icons/RunningRound';
import TrashIcon from '@rsuite/icons/Trash';
import { useCallback } from 'react';
import { Button, ButtonGroup, Tooltip, Whisper } from 'rsuite';

import {
  BLANK_DESIGN_JSON_STRING,
  WEBREPUB_LOCALSTORAGE_KEY,
} from '@/desginer/contsants';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';

export function ActionsComponent() {
  const { query, actions, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [_, setValue, clearValue] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY,
    ''
  );

  const clear = () => {
    clearValue();
    actions.deserialize(JSON.parse(BLANK_DESIGN_JSON_STRING));
  };

  const saveDesign = useCallback(() => {
    const designJson = query.serialize();

    setValue(JSON.stringify(designJson));
  }, [query, setValue]);

  const toggleEditor = () => {
    actions.setOptions((options) => (options.enabled = !options.enabled));
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
        speaker={<Tooltip>Save</Tooltip>}
      >
        <Button onClick={saveDesign}>
          <SaveIcon></SaveIcon>
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
