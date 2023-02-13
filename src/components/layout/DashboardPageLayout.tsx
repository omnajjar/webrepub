import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { classNames, isActiveRoute, joinRoutes } from '@/utils';

const inDashboardRoute = (nestedRoue: string) =>
  joinRoutes('/dashboard', nestedRoue);

const tabs = [
  { name: 'My Account', href: inDashboardRoute('/account') },
  { name: 'Company', href: inDashboardRoute('/company') },
  { name: 'Team Members', href: inDashboardRoute('/team') },
  { name: 'Billing', href: inDashboardRoute('/biling') },
];

export function DashboardPageLayout({ children }: PropsWithChildren) {
  const router = useRouter();

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
            className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            defaultValue={
              tabs.find(({ name }) => isActiveRoute(router.pathname, name))
                ?.name
            }
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className='hidden sm:block'>
          <div className='border-b border-gray-200'>
            <nav className='-mb-px flex' aria-label='Tabs'>
              {tabs.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className={classNames(
                    isActiveRoute(router.pathname, href)
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium'
                  )}
                  aria-current={
                    isActiveRoute(router.pathname, href) ? 'page' : undefined
                  }
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
