import { Element, Frame } from '@craftjs/core';

import { WEBREPUB_LOCALSTORAGE_KEY } from '@/desginer/contsants';
import { WebPageComponent } from '@/desginer/designComponents/WebPage/WebPageComponent';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';

const emptyPageDesingJson =
  '{"ROOT":{"type":{"resolvedName":"WebPageComponent"},"isCanvas":true,"props":{},"displayName":"WebPageComponent","custom":{},"hidden":false,"nodes":[],"linkedNodes":{}}}';

export function MainFrame() {
  const [designJson] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY,
    emptyPageDesingJson
  );
  return (
    <Frame json={JSON.parse(designJson)}>
      <Element is={WebPageComponent} canvas></Element>
    </Frame>
  );
}
