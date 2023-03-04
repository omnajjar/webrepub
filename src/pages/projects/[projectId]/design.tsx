import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { DocumentDesigner } from '@/builder/editor/DocumentDesigner';
import { Database } from '@/schema';
import { ensure } from '@/utils';

type DesignPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient<Database>(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const projectId = ensure(ctx.params).projectId;

  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: data,
    },
  };
}
function Design({ project }: DesignPageProps) {
  const supabase = useSupabaseClient<Database>();

  const saveContent = async (content: string) => {
    const { error } = await supabase
      .from('projects')
      .update({ content })
      .eq('id', project.id);

    if (error) {
      throw new Error(`${error.message} (code: ${error.code})`);
    }
  };

  return <DocumentDesigner project={project} save={saveContent} />;
}

Design.protected = true;

export default Design;
