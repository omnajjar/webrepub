import { WebrepubPreset } from '@/desginer/typings/webrepub';
import ReactEmailPreset from '@/presets/react-email';

export function getPresets(): WebrepubPreset[] {
  return [ReactEmailPreset];
}
