import { ContainerComponent } from '@/desginer/components/Container';
import { DocumentComponent } from '@/desginer/components/DocumentComponent';
import { PaperComponent } from '@/desginer/components/Paper';
import { TextComponent } from '@/desginer/components/Text/Text';
import { ComponentIndicator } from '@/desginer/Indicator/ComponentIndicator';

export function createRenderComponentIndicator({
  render,
}: {
  render: JSX.Element;
}) {
  const deletableNodes = new Set([ContainerComponent, TextComponent]);
  const hideIndicatorFor = new Set([DocumentComponent, PaperComponent]);

  return (
    <ComponentIndicator
      ComponentToRender={render}
      deletableNodes={deletableNodes}
      hideIndicatorFor={hideIndicatorFor}
    ></ComponentIndicator>
  );
}
