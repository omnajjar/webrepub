import { Database } from '@/schema';

export type Project = Database['public']['Tables']['projects']['Row'];

// extend craft js
export interface NodeType<TNodeProps> {
  data: {
    props: TNodeProps;
  };
}

export interface CraftExtention<TNodeProps> {
  props?: Partial<TNodeProps>;
  rules?: {
    canDrag?: (node: NodeType<TNodeProps>) => boolean;
  };
  related?: {
    settings: () => JSX.Element;
  };
}
