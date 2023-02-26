import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ChangeEvent, useState } from 'react';

import { MainLayout } from '@/components/layout/MainLayout';

import { AccountPageLayout } from '@/pages/account/_layout';

type AccountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const { data } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return {
    props: {
      firstName: data?.first_name ?? '',
      lastName: data?.last_name ?? '',
      email: data?.username,
    },
  };
}

function Account(props: AccountProps) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);

  return (
    <section>
      <form action='#' method='POST'>
        <div className='sm:overflow-hidden sm:rounded-md'>
          <div className='space-y-6 bg-white'>
            <div>
              <p className='mt-1 text-sm text-gray-500'>
                Edit your personal information
              </p>
            </div>

            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  First name
                </label>
                <input
                  type='text'
                  name='first-name'
                  id='first-name'
                  value={firstName}
                  onChange={handleFirstNameChange}
                  autoComplete='given-name'
                  className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Last name
                </label>
                <input
                  type='text'
                  name='last-name'
                  id='last-name'
                  value={lastName}
                  onChange={handleLastNameChange}
                  autoComplete='family-name'
                  className='mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='email-address'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <input
                  type='text'
                  name='email-address'
                  id='email-address'
                  autoComplete='email'
                  value={props.email}
                  disabled
                  readOnly
                  className='mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>
          </div>
          <div className='py-3'>
            <button
              type='submit'
              className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

Account.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout title='Account'>
      <AccountPageLayout>{page}</AccountPageLayout>
    </MainLayout>
  );
};

Account.protected = true;

export default Account;
