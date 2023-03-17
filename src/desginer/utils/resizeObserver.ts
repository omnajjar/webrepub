export function onElementResize(element: Element, callback: () => void) {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        callback();
      }
    }
  });

  resizeObserver.observe(element);

  return resizeObserver;
}
