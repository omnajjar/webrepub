import { UserComponent } from '@craftjs/core';
import { ReactNode } from 'react';

export type WebrepubComponent<T> = UserComponent<T> & {
  icon?: ReactNode;
};

export type WebrepubPreset = {
  name: string;
  components: WebrepubComponent[];
};
