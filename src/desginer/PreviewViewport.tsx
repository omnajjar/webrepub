import { EditorContext } from '@/desginer/EditorContext';
import { PreviewFrame } from '@/desginer/frames/PreviewFrame';

export function PreviewViewport() {
  return (
    <EditorContext enabled={false}>
      <PreviewFrame></PreviewFrame>
    </EditorContext>
  );
}
