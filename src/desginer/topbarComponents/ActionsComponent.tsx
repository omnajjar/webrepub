import { useEditor } from '@craftjs/core';
import SaveIcon from '@rsuite/icons/legacy/Save';
import TrashIcon from '@rsuite/icons/Trash';
import { useCallback } from 'react';
import { Button, ButtonGroup, Tooltip, Whisper } from 'rsuite';

import { WEBREPUB_LOCALSTORAGE_KEY } from '@/desginer/contsants';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';

export function ActionsComponent() {
  const { query } = useEditor();

  const [_, setValue, clearValue] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY,
    ''
  );

  const saveDesign = useCallback(() => {
    const designJson = query.serialize();

    setValue(JSON.stringify(designJson));
  }, [query, setValue]);

  return (
    <ButtonGroup size='md'>
      <Whisper
        placement='bottom'
        trigger='hover'
        speaker={<Tooltip>Clear</Tooltip>}
      >
        <Button onClick={clearValue}>
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
    </ButtonGroup>
  );
}
