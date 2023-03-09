import React from 'react';

import { PropsRadio } from '@/packages/designer/nextEditor/PropsPanel/PropsControls/PropsRadio';
import { PropsSection } from '@/packages/designer/nextEditor/PropsPanel/PropsControls/PropsSection';

import { ToolbarItem } from '../../editor';

export const ContainerSettings = () => {
  return (
    <>
      <PropsSection
        caption='Dimensions'
        propsNames={['width', 'height']}
        summary={DimensionsSummary}
      >
        <ToolbarItem propKey='width' type='text' label='Width' />
        <ToolbarItem propKey='height' type='text' label='Height' />
      </PropsSection>
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
      <PropsSection
        caption='Padding'
        propsNames={['padding']}
        summary={PaddingSummary}
      >
        <ToolbarItem propKey='padding' index={0} type='slider' label='Top' />
        <ToolbarItem propKey='padding' index={1} type='slider' label='Right' />
        <ToolbarItem propKey='padding' index={2} type='slider' label='Bottom' />
        <ToolbarItem propKey='padding' index={3} type='slider' label='Left' />
      </PropsSection>
      <PropsSection caption='Decoration' propsNames={['radius', 'shadow']}>
        <ToolbarItem
          full={true}
          propKey='radius'
          type='slider'
          label='Radius'
        />
        <ToolbarItem
          full={true}
          propKey='shadow'
          type='slider'
          label='Shadow'
        />
      </PropsSection>
      <PropsSection caption='Alignment'>
        <ToolbarItem
          propKey='flexDirection'
          type='radio'
          label='Flex Direction'
        >
          <PropsRadio value='row' label='Row' />
          <PropsRadio value='column' label='Column' />
        </ToolbarItem>
        <ToolbarItem propKey='fillSpace' type='radio' label='Fill space'>
          <PropsRadio value='yes' label='Yes' />
          <PropsRadio value='no' label='No' />
        </ToolbarItem>
        <ToolbarItem propKey='alignItems' type='radio' label='Align Items'>
          <PropsRadio value='flex-start' label='Flex start' />
          <PropsRadio value='center' label='Center' />
          <PropsRadio value='flex-end' label='Flex end' />
        </ToolbarItem>
        <ToolbarItem
          propKey='justifyContent'
          type='radio'
          label='Justify Content'
        >
          <PropsRadio value='flex-start' label='Flex start' />
          <PropsRadio value='center' label='Center' />
          <PropsRadio value='flex-end' label='Flex end' />
        </ToolbarItem>
      </PropsSection>
    </>
  );
};

function DimensionsSummary({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return <span>{`${width || 0} x ${height || 0}`}</span>;
}

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

function PaddingSummary({ padding }: { padding: string[] }) {
  return `${padding[0] || 0}px ${padding[1] || 0}px ${padding[2] || 0}px ${
    padding[3] || 0
  }px`;
}
