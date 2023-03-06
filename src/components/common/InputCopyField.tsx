import {
  ClipboardCopyIcon,
  EyeIcon,
  EyeOffIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface InputCopyField {
  value: string;
  label: string;
  withShowHide: boolean;
}

export function InputCopyField({ value, label, withShowHide }: InputCopyField) {
  const [show, setShow] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.info(`${label} copied to clipboard!`);
    } catch (_e) {
      toast.error(`Oops! Could not copy your ${label}!`);
    }
  };

  return (
    <div>
      <label
        htmlFor='token'
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1 flex rounded-md shadow-sm'>
        <div className='relative flex flex-grow items-stretch focus-within:z-10'>
          <input
            type={withShowHide ? (show ? 'text' : 'password') : 'text'}
            name='token'
            value={value}
            className='block w-full select-none rounded-none rounded-l-md border-gray-300 bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled
          />
        </div>

        {withShowHide ? (
          <button
            type='button'
            className='relative inline-flex items-center space-x-2 bg-indigo-600  px-3 text-white  shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            onClick={() => setShow(!show)}
          >
            {show ? (
              <EyeOffIcon className='h-5 w-5 text-white' aria-hidden='true' />
            ) : (
              <EyeIcon className='h-5 w-5 text-white' aria-hidden='true' />
            )}
            <span>Show</span>
          </button>
        ) : null}

        <button
          type='button'
          className='relative inline-flex items-center space-x-2 rounded-r-md bg-indigo-600 px-3 text-white  shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={copyToClipboard}
        >
          <ClipboardCopyIcon
            className='h-5 w-5 text-white'
            aria-hidden='true'
          />
          <span>Copy</span>
        </button>
      </div>
    </div>
  );
}
