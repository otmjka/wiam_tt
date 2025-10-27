import type { FC } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';
import AppHeader from './AppHeader';

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
