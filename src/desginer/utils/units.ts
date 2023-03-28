export type CSSValueUnit =
  | { name: 'pixel'; shorthand: 'px'; value: number }
  | { name: 'precentage'; shorthand: '%'; value: number }
  | { name: 'auto'; shorthand: 'auto'; value: 'auto' };

export function getValueUnit(value: string | number | undefined): CSSValueUnit {
  const v = value?.toString();

  if (v && v.indexOf('%') !== -1) {
    return {
      name: 'precentage',
      shorthand: '%',
      value: Number(v.replace('%', '')),
    };
  }

  if (v && v.indexOf('px') !== -1) {
    return {
      name: 'pixel',
      shorthand: 'px',
      value: Number(v.replace('px', '')),
    };
  }

  return {
    name: 'auto',
    shorthand: 'auto',
    value: 'auto',
  };
}
