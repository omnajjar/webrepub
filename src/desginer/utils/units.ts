import { UnsupportedCSStyleUnit } from '@/desginer/utils/errors';

export type CSSValueUnit =
  | { name: 'pixel'; shorthand: 'px'; value: number }
  | { name: 'precentage'; shorthand: '%'; value: number };

export function getValueUnit(value: string): CSSValueUnit {
  if (value.indexOf('%') !== -1) {
    return {
      name: 'precentage',
      shorthand: '%',
      value: Number(value.replace('%', '')),
    };
  }

  if (value.indexOf('px') !== -1) {
    return {
      name: 'pixel',
      shorthand: 'px',
      value: Number(value.replace('px', '')),
    };
  }

  throw new UnsupportedCSStyleUnit();
}
