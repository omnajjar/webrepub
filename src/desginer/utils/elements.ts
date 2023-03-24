export function getPos(element: HTMLElement | null) {
  const defaultPos = { top: 0, left: 0, bottom: 0, width: 0, height: 0 };

  const { top, left, bottom, height, width } = element
    ? element.getBoundingClientRect()
    : defaultPos;

  return {
    top: `${top > 0 ? top : bottom}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
  };
}

export function extractPixelUnit(value: string): string {
  return value?.replace('px', '');
}
