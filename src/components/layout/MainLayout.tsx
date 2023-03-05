//https://tailwind-css-ui-components-xi.vercel.app/
import { Dialog, Transition } from '@headlessui/react';
import {
  BellIcon,
  CollectionIcon,
  MenuAlt2Icon,
  PrinterIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, PropsWithChildren, useState } from 'react';

import { IDAvatar } from '@/components/IDAvatar';
import { MenuDropDown, MenuItem } from '@/components/MenuDropDown';
import NextImage from '@/components/NextImage';

import { classNames, ensure, isActiveRoute } from '@/utils';

const navigation = [
  { name: 'Projects', href: '/projects', Icon: CollectionIcon },
  { name: 'Print', href: '/print', Icon: PrinterIcon },
];

interface MainLayoutProps extends PropsWithChildren {
  title?: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = ensure(useUser());

  const signOut = () => supabase.auth.signOut();
  const goToAccountPage = () => router.push('/account');

  const menuItems: MenuItem[] = [
    { caption: 'My account', action: goToAccountPage },
    { caption: 'Sign out', action: signOut },
  ];

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-40 flex md:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex flex-shrink-0 items-center px-4'>
                <NextImage
                  className='h-8 w-auto'
                  src='/icons/logo.svg'
                  alt='Logo'
                  height='180'
                  width='180'
                  imgClassName='cursor-pointer'
                />
              </div>
              <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                <nav className='space-y-1 px-2'>
                  {navigation.map(({ name, href, Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      className={classNames(
                        isActiveRoute(router.pathname, href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center rounded-md py-2 px-2 text-base font-medium'
                      )}
                    >
                      <Icon
                        className={classNames(
                          isActiveRoute(router.pathname, href)
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6 flex-shrink-0'
                        )}
                        aria-hidden='true'
                      />
                      {name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='w-14 flex-shrink-0'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5'>
          <div className='flex flex-shrink-0 items-center px-4'>
            <Link href='/'>
              <NextImage
                className='h-8 w-auto'
                src='/icons/logo.svg'
                alt='Logo'
                width='180'
                height='180'
                imgClassName='cursor-pointer'
              />
            </Link>
          </div>
          <div className='mt-5 flex flex-grow flex-col'>
            <nav className='flex-1 space-y-1 px-2 pb-4'>
              {navigation.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  className={classNames(
                    isActiveRoute(router.pathname, href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center rounded-md py-2 px-2 text-sm font-medium'
                  )}
                >
                  <Icon
                    className={classNames(
                      isActiveRoute(router.pathname, href)
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-6 w-6 flex-shrink-0'
                    )}
                    aria-hidden='true'
                  />
                  {name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className='md:pl-64'>
        <div className='mx-auto flex flex-col p-4 md:px-8'>
          <div className='sticky top-0 z-10 mb-4 flex h-16 flex-shrink-0  bg-white'>
            <button
              type='button'
              className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex flex-1 justify-between border-b px-4 md:px-0'>
              <div className='flex flex-1 items-center'>
                <h2 className='text-2xl leading-7 text-gray-900 sm:truncate sm:text-3xl'>
                  {title}
                </h2>
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Menu dropdown */}
                <MenuDropDown
                  menuItems={menuItems}
                  menuButton={<IDAvatar id={user.id} />}
                />
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
