import * as React from 'react';

import ArrowLink from '@/components/links/ArrowLink';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <NextImage
              src='/icons/404.svg'
              width='430'
              height='430'
              alt='page not found'
            />
            <h1 className='mt-8 text-4xl md:text-2xl'>Page Not Found</h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              Back to Home
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
}

NotFoundPage.getLayout = function getLayout(page: JSX.Element) {
  return <>{page}</>;
};
