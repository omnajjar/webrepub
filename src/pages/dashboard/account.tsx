import { DashboardPageLayout } from '@/components/layout/DashboardPageLayout';
import { MainLayout } from '@/components/layout/MainLayout';

export default function AccountsPage() {
  return (
    <main className='flex-1'>
      <div className='py-6'>
        <div className='px-4 sm:px-6 md:px-0'>
          <h1 className='text-2xl font-semibold text-gray-900'>Account</h1>
        </div>
        <div className='px-4 sm:px-6 md:px-0'>
          {/* Replace with your content */}
          <div className='py-4'>
            <div className='h-96 rounded-lg border-4 border-dashed border-gray-200' />
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}

AccountsPage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout>
      <DashboardPageLayout>{page}</DashboardPageLayout>
    </MainLayout>
  );
};
