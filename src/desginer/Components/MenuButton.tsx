import { CiMenuKebab } from 'react-icons/ci';
import { Button } from 'rsuite';

interface MenuButtonProps {
  onClick?: () => void;
}

export function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <Button onClick={onClick} className='menu-button blue-overlap-shadow'>
      <CiMenuKebab style={{ rotate: '-45deg' }} />
    </Button>
  );
}
