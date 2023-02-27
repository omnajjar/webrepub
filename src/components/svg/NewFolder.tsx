import { classNames } from '@/utils';

export function NewFolder({ className }: { className?: string }) {
  return (
    <svg
      className={classNames('mx-auto h-12 w-12', className ?? '')}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      aria-hidden='true'
    >
      <path
        vectorEffect='non-scaling-stroke'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
      />
    </svg>
  );
}
