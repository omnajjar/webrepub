import { EditorContext } from '@/desginer/EditorContext';
import { PreviewFrame } from '@/desginer/frames/PreviewFrame';
import { GlobalSettingsProvider } from '@/desginer/Providers/GlobalSettings';

export function PreviewViewport() {
  return (
    <GlobalSettingsProvider settings={{ isInDesignMode: false }}>
      <EditorContext enabled={false}>
        <PreviewFrame></PreviewFrame>
      </EditorContext>
    </GlobalSettingsProvider>
  );
}
