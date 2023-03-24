export function onElementResize(element: Element, callback: () => void) {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        callback();
      }
    }
  });

  resizeObserver.observe(element);

  return { disconnect: resizeObserver.disconnect };
}

export function onElementMutation(element: Element, callback: () => void) {
  const config = { attributes: true, childList: true, subtree: true };

  const mutationCallback: MutationCallback = (mutationList, _observer) => {
    for (const _mutation of mutationList) {
      callback();
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(mutationCallback);

  // Start observing the target node for configured mutations
  observer.observe(element, config);

  return { disconnect: observer.disconnect };
}
