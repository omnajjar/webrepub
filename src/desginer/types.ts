import { CSSProperties } from 'react';

export interface ExtendedCSSProps extends CSSProperties {
  positionUnit: '%' | 'px' | 'auto';
}
