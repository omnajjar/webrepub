import { Database } from '@/schema';

export type Project = Database['public']['Tables']['projects']['Row'];

// extend craft js
export interface NodeType<TNodeProps> {
  data: {
    props: TNodeProps;
  };
}
