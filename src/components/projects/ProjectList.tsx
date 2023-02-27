import { NewProjectListItem } from '@/components/projects/NewProjectListItem';
import { ProjectListItem } from '@/components/projects/ProjectListItem';

import { Database } from '@/schema';

interface ProjectListProps {
  projects: Partial<Database['public']['Tables']['projects']['Row']>[];
  onCreateProjectClicked: () => void;
}

export function ProjectList({
  projects,
  onCreateProjectClicked,
}: ProjectListProps) {
  return (
    <ul role='list' className='flex flex-row flex-wrap gap-4'>
      <NewProjectListItem onClick={onCreateProjectClicked} />
      {projects.map((p) => (
        <ProjectListItem key={p.id} project={p} />
      ))}
    </ul>
  );
}
