import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Tab {
  caption: string;
  link: string;
  current: boolean;
}

interface TabRoutingProps {
  tabs: Tab[];
}

export function TabRouting({ tabs }: TabRoutingProps) {
  const router = useRouter();

  return (
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
          {tabs.map(({ caption, link }) => (
            <option key={caption} value={link}>
              {caption}
            </option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map(({ caption, link, current }) => (
              <Link
                key={caption}
                className={classNames(
                  current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
                aria-current={current ? 'page' : undefined}
                href={link}
              >
                {caption}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
