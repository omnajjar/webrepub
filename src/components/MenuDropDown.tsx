import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/utils';

export interface MenuItem {
  caption: string;
  action: () => void;
}

interface MenuDropDownProps {
  menuItems: MenuItem[];
  menuButton: ReactNode;
}

export function MenuDropDown({ menuItems, menuButton }: MenuDropDownProps) {
  return (
    <Menu as='div' className='relative ml-3'>
      <div>
        <Menu.Button className='flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          {menuButton}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {menuItems.map(({ caption, action }) => (
            <Menu.Item key={caption}>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block py-2 px-4 text-sm text-gray-700'
                  )}
                  onClick={action}
                >
                  {caption}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
