import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { classNames } from '@/utils';

export function AccountPageLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const tabs = [
    {
      name: 'Personal information',
      current: router.route === '/account',
      link: '/account',
    },
    {
      name: 'Subscription',
      current: router.route === '/account/subscription',
      link: '/account/subscription',
    },
  ];

  return (
    <>
      <div>
        <div className='sm:hidden'>
          <label htmlFor='tabs' className='sr-only'>
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id='tabs'
            name='tabs'
            className='block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            defaultValue={tabs.filter(({ current }) => current)[0].link}
            onChange={(e) => router.push(e.target.value)}
          >
            {tabs.map(({ name, link }) => (
              <option key={name} value={link}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className='hidden sm:block'>
          <div className='border-b border-gray-200'>
            <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
              {tabs.map(({ name, link, current }) => (
                <Link
                  key={name}
                  className={classNames(
                    current
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                  aria-current={current ? 'page' : undefined}
                  href={link}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <section className='py-4'>{children}</section>
    </>
  );
}
