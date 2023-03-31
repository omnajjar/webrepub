import { useEditor } from '@craftjs/core';
import Image from 'next/image';
import { Panel } from 'rsuite';

import { EXAMPLES } from '@/desginer/contsants';

import BlankImage from '~/images/examples/blank.png';
import LayoutImage from '~/images/examples/layout.png';

interface Example {
  title: string;
  subtitle: string;
  jsonContent: string;
  imageSrc: string;
}

const examples: Example[] = [
  {
    title: 'Layout',
    subtitle: "Example page layout powered by 'Stack' & 'StackItem' components",
    jsonContent: EXAMPLES.LAYOUT,
    imageSrc: LayoutImage.src,
  },
  {
    title: 'Blank',
    subtitle: 'Start clean with the blank example',
    jsonContent: EXAMPLES.BLANK,
    imageSrc: BlankImage.src,
  },
];

interface ExamleListProps {
  onItemClick?: () => void;
}

export function ExamplesList({ onItemClick }: ExamleListProps) {
  const { actions } = useEditor();

  const loadExample = (jsonContent: string) => {
    actions.deserialize(JSON.parse(jsonContent));
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <>
      {examples.map(({ title, subtitle, imageSrc, jsonContent }) => (
        <Panel
          key={title}
          shaded
          bordered
          bodyFill
          onClick={() => loadExample(jsonContent)}
          className='mb-20 pointer-cursor'
        >
          <Image src={imageSrc} height={240} width={480} alt='example image' />
          <Panel header={title}>
            <p>
              <small>{subtitle}</small>
            </p>
          </Panel>
        </Panel>
      ))}
    </>
  );
}
