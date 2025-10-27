import type { FC } from 'react';
import { Outlet } from 'react-router';
import { AppHeader } from './AppHeader';
import { Toaster } from '@/components/ui/sonner';

const Layout: FC = () => {
  return (
    <div>
      <AppHeader />
      <Toaster />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
