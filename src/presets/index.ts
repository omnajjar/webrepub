import { WebrepubPreset } from '@/desginer/types/webrepub';
import ReactEmailPreset from '@/presets/react-email';

export function getPresets(): WebrepubPreset[] {
  return [ReactEmailPreset];
}
