import { PropsWithChildren } from 'react';
import { Drawer as RSDrawer } from 'rsuite';

interface DrawerProps extends PropsWithChildren {
  open: boolean;
  closeAction: () => void;
  title: string;
}

export function Drawer({ open, closeAction, title, children }: DrawerProps) {
  return (
    <RSDrawer open={open} onClose={closeAction}>
      <RSDrawer.Header>
        <RSDrawer.Title>{title}</RSDrawer.Title>
      </RSDrawer.Header>
      <RSDrawer.Body>{children}</RSDrawer.Body>
    </RSDrawer>
  );
}
