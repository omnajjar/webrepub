import { useEditor } from '@craftjs/core';
import { Tooltip } from '@material-ui/core';
import lz from 'lzutf8';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Checkmark from '~/icons/check.svg';
import Customize from '~/icons/customize.svg';
import RedoSvg from '~/icons/toolbox/redo.svg';
import UndoSvg from '~/icons/toolbox/undo.svg';

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  display: flex;
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: #fff;
    opacity: 0.9;
  }
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

interface HeaderProps {
  save: (content: string) => Promise<void>;
}

export function Header({ save }: HeaderProps) {
  const { enabled, canUndo, canRedo, actions, query } = useEditor(
    (state, query) => ({
      enabled: state.options.enabled,
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    })
  );

  const router = useRouter();

  const handleSaveContent = async () => {
    const compressedJson = lz.encodeBase64(lz.compress(query.serialize()));

    try {
      await save(compressedJson);
      toast.success(`Project saved successfully!`);
    } catch (e) {
      toast.error(`Oops! Failed to save your project`);
    }
  };

  return (
    <HeaderDiv className='header w-full bg-white text-white transition'>
      <div className='flex w-full items-center justify-end px-4'>
        {enabled && (
          <div className='flex flex-1'>
            <Tooltip title='Undo' placement='bottom'>
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                <UndoSvg />
              </Item>
            </Tooltip>
            <Tooltip title='Redo' placement='bottom'>
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                <RedoSvg />
              </Item>
            </Tooltip>
          </div>
        )}
        <div className='flex'>
          {enabled ? (
            <>
              <Btn
                className='mr-2 cursor-pointer bg-primary-500 transition'
                onClick={() => {
                  router.push('/');
                }}
              >
                Home
              </Btn>
              <Btn
                className='mr-2 cursor-pointer bg-primary-500 transition'
                onClick={handleSaveContent}
              >
                Save
              </Btn>
            </>
          ) : null}
          <Btn
            className='cursor-pointer bg-primary-500 transition'
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? <Checkmark /> : <Customize />}
            {enabled ? 'Preview' : 'Edit'}
          </Btn>
        </div>
      </div>
    </HeaderDiv>
  );
}
