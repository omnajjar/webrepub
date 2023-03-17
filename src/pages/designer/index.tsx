import { Editor, Element, Frame } from '@craftjs/core';
import { Dialog, Transition } from '@headlessui/react';
import {
  MenuAlt2Icon,
  PencilIcon,
  PlusSmIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ThemeProvider } from '@material-tailwind/react';
import { Fragment, useState } from 'react';

import { ContainerComponent } from '@/desginer/components/Container';
import { TextComponent } from '@/desginer/components/Text/Text';
import { ComponentsBar } from '@/desginer/ComponentsBox';
import { PropertiesBox } from '@/desginer/PropertiesBox';
import { classNames } from '@/utils';

const sidebarNavigation = [{ name: 'Text', icon: PencilIcon }];

export default function Designer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <Editor resolver={{ ContainerComponent, ContainerB, TextComponent }}>
        <div className='flex h-screen'>
          {/* Narrow sidebar */}
          <div className='hidden w-28 overflow-y-auto bg-indigo-700 md:block'>
            <div className='flex w-full flex-col items-center py-6'>
              <div className='flex flex-shrink-0 items-center text-white'>
                Logo
              </div>
              <ComponentsBar />
            </div>
          </div>

          {/* Mobile menu */}
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as='div' className='md:hidden' onClose={setMobileMenuOpen}>
              <div className='fixed inset-0 z-40 flex'>
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
                  <div className='relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pt-5 pb-4'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-300'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-300'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute top-1 right-0 -mr-14 p-1'>
                        <button
                          type='button'
                          className='flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white'
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <XIcon
                            className='h-6 w-6 text-white'
                            aria-hidden='true'
                          />
                          <span className='sr-only'>Close sidebar</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className='flex flex-shrink-0 items-center px-4'>
                      Logo
                    </div>
                    <div className='mt-5 h-0 flex-1 overflow-y-auto px-2'>
                      <nav className='flex h-full flex-col'>
                        <div className='space-y-1'>
                          {sidebarNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? 'bg-indigo-800 text-white'
                                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white',
                                'group flex items-center rounded-md py-2 px-3 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              <item.icon
                                className={classNames(
                                  item.current
                                    ? 'text-white'
                                    : 'text-indigo-300 group-hover:text-white',
                                  'mr-3 h-6 w-6'
                                )}
                                aria-hidden='true'
                              />
                              <span>{item.name}</span>
                            </a>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>
                </Transition.Child>
                <div className='w-14 flex-shrink-0' aria-hidden='true'>
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Content area */}
          <div className='flex flex-1 flex-col overflow-hidden'>
            <header className='w-full'>
              <div className='relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm'>
                <button
                  type='button'
                  className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className='sr-only'>Open sidebar</span>
                  <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
                </button>
                <div className='flex flex-1 justify-between px-4 sm:px-6'>
                  <div className='flex flex-1 items-center'>Topbar</div>
                  <div className='ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6'>
                    <button
                      type='button'
                      className='flex items-center justify-center rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      <PlusSmIcon className='h-6 w-6' aria-hidden='true' />
                      <span className='sr-only'>Add file</span>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main content */}
            <div className='flex flex-1 items-stretch overflow-hidden'>
              <main className='flex-1 overflow-y-auto'>
                {/* Primary column */}
                <section
                  aria-labelledby='primary-heading'
                  className='flex h-full min-w-0 flex-1 flex-col lg:order-last'
                >
                  {/* Your content */}
                  <Frame>
                    <Element
                      is={ContainerComponent}
                      className='bg-slate-400 h-60 w-full'
                      canvas
                    >
                      <Element
                        is={ContainerComponent}
                        className='bg-slate-400 h-60 w-full'
                        canvas
                      >
                        <TextComponent text='Hello world!'></TextComponent>
                      </Element>
                      <Element
                        is={ContainerComponent}
                        className='h-60 w-full bg-gray-500'
                        canvas
                      >
                        <TextComponent text='Foo'></TextComponent>
                      </Element>
                    </Element>
                  </Frame>
                </section>
              </main>

              {/* Secondary column (hidden on smaller screens) */}
              <aside className='flex overflow-y-auto border-l border-gray-200 bg-white'>
                <div className='w-[250px]'>
                  <PropertiesBox />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </Editor>
    </ThemeProvider>
  );
}
