import React from 'react';

import { PropsRadio } from '@/packages/designer/nextEditor/PropsPanel/PropsControls/PropsRadio';
import { PropsSection } from '@/packages/designer/nextEditor/PropsPanel/PropsControls/PropsSection';

import { ToolbarItem } from '../../editor';

export const ButtonSettings = () => {
  return (
    <>
      <PropsSection
        caption='Colors'
        propsNames={['background', 'color']}
        summary={ColorsSummary}
      >
        <ToolbarItem
          full={true}
          propKey='background'
          type='bg'
          label='Background'
        />
        <ToolbarItem full={true} propKey='color' type='color' label='Text' />
      </PropsSection>
      <PropsSection
        caption='Margin'
        propsNames={['margin']}
        summary={MarginSummary}
      >
        <ToolbarItem propKey='margin' index={0} type='slider' label='Top' />
        <ToolbarItem propKey='margin' index={1} type='slider' label='Right' />
        <ToolbarItem propKey='margin' index={2} type='slider' label='Bottom' />
        <ToolbarItem propKey='margin' index={3} type='slider' label='Left' />
      </PropsSection>
      <PropsSection caption='Decoration'>
        <ToolbarItem propKey='buttonStyle' type='radio' label='Style'>
          <PropsRadio value='full' label='Full' />
          <PropsRadio value='outline' label='Outline' />
        </ToolbarItem>
      </PropsSection>
    </>
  );
};

function ColorsSummary({
  background,
  color,
}: {
  background?: { [k: string]: string };
  color?: { [k: string]: string };
}) {
  return (
    <div className='flex flex-row-reverse'>
      <div
        style={{
          background: background && `rgba(${Object.values(background)})`,
        }}
        className='flex-end flex h-6 w-6 items-center rounded-full bg-black text-center shadow-md'
      >
        <p
          style={{
            color: color && `rgba(${Object.values(color)})`,
          }}
          className='w-full text-center text-white'
        >
          T
        </p>
      </div>
    </div>
  );
}

function MarginSummary({ margin }: { margin: string[] }) {
  return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
    margin[3] || 0
  }px`;
}
