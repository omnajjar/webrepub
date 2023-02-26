import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import { MainLayout } from '@/components/layout/MainLayout';

import { AccountPageLayout } from '@/pages/account/_layout';
import { ensure } from '@/utils';

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
  const { supabaseClient: supabase } = useSessionContext();
  const user = ensure(useUser());

  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase
      .from('accounts')
      .update({ first_name: firstName.trim(), last_name: lastName.trim() })
      .eq('id', user.id);
    setLoading(false);

    if (error) {
      toast.error(
        `Oops! Failed to save your personal information (code: ${error?.code})`
      );
    } else {
      toast.success('Account saved successfully!');
    }
  };

  return (
    <section>
      <form onSubmit={handleFormSubmit}>
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
            <Button
              variant='primary'
              type='submit'
              loadingCaption='Saving...'
              isLoading={loading}
            >
              Save
            </Button>
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
