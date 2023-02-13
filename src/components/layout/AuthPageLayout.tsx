import { PropsWithChildren } from 'react';

import NextImage from '@/components/NextImage';

export function AuthPageLayout({ children }: PropsWithChildren) {
  return (
    <section className='h-screen'>
      <div className='h-full py-12'>
        <div className='flex h-full flex-wrap items-center justify-center text-gray-800'>
          <div className='md:w-8/12 lg:ml-20 lg:w-5/12'>
            <div className='mb-8 flex justify-center'>
              <NextImage
                className='h-20 w-auto'
                src='https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg'
                alt='Workflow'
                height='240'
                width='240'
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
