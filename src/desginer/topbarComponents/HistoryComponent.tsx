import { useEditor } from '@craftjs/core';
import ReloadIcon from '@rsuite/icons/Reload';
import { Button, ButtonGroup, Tooltip, Whisper } from 'rsuite';

export function HistoryComponent() {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <ButtonGroup size='sm' disabled={!enabled}>
      <Whisper
        placement='bottom'
        trigger='hover'
        speaker={<Tooltip>Undo</Tooltip>}
      >
        <Button disabled={!canUndo} onClick={() => actions.history.undo()}>
          <ReloadIcon style={{ transform: 'scaleX(-1)' }}></ReloadIcon>
        </Button>
      </Whisper>
      <Whisper
        placement='bottom'
        trigger='hover'
        speaker={<Tooltip>Redo</Tooltip>}
      >
        <Button disabled={!canRedo} onClick={() => actions.history.redo()}>
          <ReloadIcon></ReloadIcon>
        </Button>
      </Whisper>
    </ButtonGroup>
  );
}
