import React from 'react';
import styled from 'styled-components';

import Arrow from '~/icons/arrow.svg';

const SidebarItemDiv = styled.div<{ visible?: boolean; height?: string }>`
  height: ${(props) =>
    props.visible && props.height && props.height !== 'full'
      ? `${props.height}`
      : 'auto'};
  flex: ${(props) =>
    props.visible && props.height && props.height === 'full' ? `1` : 'unset'};
  color: #545454;
`;

const Chevron = styled.a<{ visible: boolean }>`
  transform: rotate(${(props) => (props.visible ? 180 : 0)}deg);
  svg {
    width: 8px;
    height: 8px;
  }
`;

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon: string;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
};

const HeaderDiv = styled.div`
  color: #615c5c;
  height: 45px;
  svg {
    fill: #707070;
  }
`;

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange,
}) => {
  return (
    <SidebarItemDiv visible={visible} height={height} className='flex flex-col'>
      <HeaderDiv
        onClick={() => {
          if (onChange) {
            onChange(!visible);
          }
        }}
        className='flex cursor-pointer items-center border-b-2 bg-white px-2 last:border-b-0'
      >
        <div className='flex flex-1 items-center'>
          {React.createElement(icon, { className: 'w-4 h-4 mr-2' })}
          <h2 className='text-xs uppercase'>{title}</h2>
        </div>
        <Chevron visible={visible}>
          <Arrow />
        </Chevron>
      </HeaderDiv>
      {visible ? (
        <div className='w-full flex-1 overflow-auto'>{children}</div>
      ) : null}
    </SidebarItemDiv>
  );
};
