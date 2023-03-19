import { ContainerComponent } from '@/desginer/designComponents/Container';
import { TextComponent } from '@/desginer/designComponents/Text/Text';
import { WebPageComponent } from '@/desginer/designComponents/WebPage/WebPageComponent';
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
