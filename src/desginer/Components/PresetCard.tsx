import { Panel, Placeholder } from 'rsuite';

import { WebrepubPreset } from '@/desginer/typings/webrepub';

interface PresetCardProps extends Pick<WebrepubPreset, 'name'> {
  onClick: () => void;
}

export function PresetCard({ name, onClick }: PresetCardProps) {
  return (
    <Panel bordered header={name} onClick={onClick} className='pointer-cursor'>
      <Placeholder.Paragraph />
    </Panel>
  );
}
