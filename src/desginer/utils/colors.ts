import { ColorResult } from 'react-color';

export function colorToCSSrgba({ rgb: { r, b, g, a } }: ColorResult): string {
  return `rgba(${r},${g},${b},${a ?? 1})`;
}
