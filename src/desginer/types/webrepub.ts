import { UserComponent } from '@craftjs/core';
import { IconType } from 'react-icons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WebrepubComponent<T = any> = UserComponent<T> & {
  icon: IconType;
};

export type WebrepubPreset = {
  name: string;
  components: WebrepubComponent[];
};
