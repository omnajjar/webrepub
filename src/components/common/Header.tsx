interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className='mb-4 px-1'>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-500'>{subtitle}</p>
    </div>
  );
}
