import { ClipboardCopyIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function APITokenView({ token }: { token: string }) {
  const [show, setShow] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token);
      toast.info('Token copied to clipboard!');
    } catch (_e) {
      toast.error('Oops! Could not copy your token!');
    }
  };

  return (
    <div>
      <label
        htmlFor='token'
        className='block text-sm font-medium text-gray-700'
      >
        Token
      </label>
      <div className='mt-1 flex rounded-md shadow-sm'>
        <div className='relative flex flex-grow items-stretch focus-within:z-10'>
          <input
            type={show ? 'text' : 'password'}
            name='token'
            value={token}
            className='block w-full select-none rounded-none rounded-l-md border-gray-300 bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled
          />
        </div>
        <button
          type='button'
          className='relative inline-flex items-center space-x-2 border border-r-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm  font-medium text-gray-700 hover:bg-gray-100 focus:border-r-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOffIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          ) : (
            <EyeIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          )}
          <span>Show</span>
        </button>
        <button
          type='button'
          className='relative inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          onClick={copyToClipboard}
        >
          <ClipboardCopyIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          <span>Copy to clipboard</span>
        </button>
      </div>
    </div>
  );
}
