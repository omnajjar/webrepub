import { ExclamationIcon } from '@heroicons/react/outline';
import { PropsWithChildren } from 'react';

interface WarningAlertProps extends PropsWithChildren {
  title: string;
  message?: string;
}

export function WarningAlert({ title, message, children }: WarningAlertProps) {
  return (
    <div className='rounded-md bg-yellow-50 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <ExclamationIcon
            className='h-5 w-5 text-yellow-400'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-yellow-800'>{title}</h3>
          <div className='mt-2 text-sm text-yellow-700'>
            {message ? <p>{message}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
