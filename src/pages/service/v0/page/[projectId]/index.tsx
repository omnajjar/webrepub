import { Editor, Frame } from '@craftjs/core';
import { JwtPayload } from 'jsonwebtoken';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { PrintViewPort } from '@/builder/editor/Viewport/PrintViewPort';
import { Container, Text } from '@/builder/selectors';
import { getServiceSupabase } from '@/services/supbaseServiceClient';
import { verifyProjectToken } from '@/utils/projects/verifyProjectToken';

type ProjectPrintPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = getServiceSupabase();
  // Check if we have a session
  const { projectId, token } = ctx.query;

  if (!projectId || !token) {
    return {
      notFound: true,
    };
  }

  let decoded: JwtPayload;

  try {
    decoded = verifyProjectToken(token as string);
    if (decoded.projectId !== projectId) {
      return {
        notFound: true,
      };
    }
  } catch (err: unknown) {
    return {
      notFound: true,
    };
  }

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

function ProjectPrintPage({ _project }: ProjectPrintPageProps) {
  return (
    <div className='flex justify-center'>
      <Editor
        resolver={{
          Container,
          Text,
        }}
        enabled={false}
      >
        <PrintViewPort>
          <Frame></Frame>
        </PrintViewPort>
      </Editor>
    </div>
  );
}

export default ProjectPrintPage;
