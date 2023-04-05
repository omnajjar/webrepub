import { UserComponent } from '@craftjs/core';
import { ReactNode } from 'react';

export type WebrepubComponent<T = unknown> = UserComponent<T> & {
  icon?: ReactNode;
};
