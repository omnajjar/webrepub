import { Frame } from '@craftjs/core';

import {
  BLANK_DESIGN_JSON_STRING,
  WEBREPUB_LOCALSTORAGE_KEY,
} from '@/desginer/contsants';
import { useLocalStorage } from '@/desginer/hooks/useLocalStorage';

export function PreviewFrame() {
  const [designJson] = useLocalStorage(
    WEBREPUB_LOCALSTORAGE_KEY,
    BLANK_DESIGN_JSON_STRING
  );

  return <Frame data={JSON.parse(designJson)}></Frame>;
}
