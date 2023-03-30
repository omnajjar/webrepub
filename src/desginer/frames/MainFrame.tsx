import { Element, Frame } from '@craftjs/core';

import {
  BLANK_DESIGN_JSON_STRING,
  WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN,
} from '@/desginer/contsants';
import { WebPageComponent } from '@/desginer/designComponents/WebPage';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';

export function MainFrame() {
  const [designJson] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY_CURRENT_DESIGN,
    BLANK_DESIGN_JSON_STRING
  );

  return (
    <Frame data={JSON.parse(designJson)}>
      <Element is={WebPageComponent} canvas></Element>
    </Frame>
  );
}
