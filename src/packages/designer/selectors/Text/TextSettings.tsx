/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { PropsRadio } from '@/packages/designer/nextEditor/PropsPanel/PropsControls/PropsRadio';
import { PropsSection } from '@/packages/designer/nextEditor/PropsPanel/PropsControls/PropsSection';
import { capitalize, weightDescription } from '@/utils/text';

import { ToolbarItem } from '../../editor';

export const TextSettings = () => {
  return (
    <React.Fragment>
      <PropsSection
        caption='Typography'
        propsNames={['fontSize', 'fontWeight', 'textAlign']}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        summary={({ fontSize, fontWeight, textAlign }: any) => {
          return `${fontSize || ''}, ${weightDescription(
            fontWeight
          )}, ${capitalize(textAlign)}`;
        }}
      >
        <ToolbarItem
          full={true}
          propKey='fontSize'
          type='slider'
          label='Font Size'
        />
        <ToolbarItem propKey='textAlign' type='radio' label='Align'>
          <PropsRadio value='left' label='Left' />
          <PropsRadio value='center' label='Center' />
          <PropsRadio value='right' label='Right' />
        </ToolbarItem>
        <ToolbarItem propKey='fontWeight' type='radio' label='Weight'>
          <PropsRadio value='400' label='Regular' />
          <PropsRadio value='500' label='Medium' />
          <PropsRadio value='700' label='Bold' />
        </ToolbarItem>
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
        caption='Appearance'
        propsNames={['color', 'shadow']}
        summary={AppearanceSummary}
      >
        <ToolbarItem full={true} propKey='color' type='color' label='Text' />
        <ToolbarItem
          full={true}
          propKey='shadow'
          type='slider'
          label='Shadow'
        />
      </PropsSection>
    </React.Fragment>
  );
};

function MarginSummary({ margin }: { margin: string[] }) {
  return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
    margin[3] || 0
  }px`;
}

function AppearanceSummary({
  color,
  shadow,
}: {
  color: { [key: string]: string };
  shadow: number;
}) {
  return (
    <div className='fletext-right'>
      <p
        style={{
          color: color && `rgba(${Object.values(color)})`,
          textShadow: `0px 0px 2px rgba(0, 0, 0, ${shadow / 100})`,
        }}
        className='text-right text-white'
      >
        T
      </p>
    </div>
  );
}
