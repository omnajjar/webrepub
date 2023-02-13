import Link from 'next/link';

import { AuthPageLayout } from '@/components/layout/AuthPageLayout';

function SignInPage() {
  return (
    <>
      <form>
        <div className='mb-6'>
          <input
            type='text'
            className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            placeholder='Email address'
          />
        </div>

        <div className='mb-6'>
          <input
            type='password'
            className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
            placeholder='Password'
          />
        </div>

        <div className='mb-6 flex'>
          <Link
            href='/auth/password-reset'
            className='text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-800'
          >
            Forgot your password?
          </Link>
        </div>

        <button
          type='submit'
          className='inline-block w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
          data-mdb-ripple='true'
          data-mdb-ripple-color='light'
        >
          Sign in
        </button>
      </form>
      <div className='mt-4 flex justify-center'>
        <Link
          href='/auth/signup'
          className='text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700 active:text-blue-800'
        >
          Don't have an account yet! Sign up here!
        </Link>
      </div>
    </>
  );
}

SignInPage.getLayout = function getLayout(page: JSX.Element) {
  return <AuthPageLayout>{page}</AuthPageLayout>;
};

export default SignInPage;
