import { ContainerComponent } from '@/desginer/components/Container';
import { TextComponent } from '@/desginer/components/Text/Text';
import { WebPageComponent } from '@/desginer/components/WebPage/WebPageComponent';
import { ComponentIndicator } from '@/desginer/Indicator/ComponentIndicator';

export function createRenderComponentIndicator({
  render,
}: {
  render: JSX.Element;
}) {
  const deletableNodes = new Set([ContainerComponent, TextComponent]);
  const hideIndicatorFor = new Set([WebPageComponent]);

  return (
    <ComponentIndicator
      ComponentToRender={render}
      deletableNodes={deletableNodes}
      hideIndicatorFor={hideIndicatorFor}
    ></ComponentIndicator>
  );
}
