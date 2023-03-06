import { InputCopyField } from '@/components/common/InputCopyField';

export function APITokenView({
  token,
  projectId,
}: {
  token: string;
  projectId: string;
}) {
  const tokenLabel = 'Token';
  const projectLabel = 'Project Id';

  return (
    <>
      <div>
        <InputCopyField
          value={projectId}
          label={projectLabel}
          withShowHide={false}
        />
      </div>
      <div className='mt-4'>
        <InputCopyField value={token} label={tokenLabel} withShowHide={true} />
      </div>
    </>
  );
}
