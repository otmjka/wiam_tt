import { createBrowserRouter, Navigate } from 'react-router';
import { Layout } from '@/UiKit';

import ApplicationPage from './ApplicationPage';
import IndexPage from './IndexPage';
import {
  PersonalInfoForm,
  AddressForm,
  ParamsForm,
} from './ApplicationPage/ApplicationForm';
import { addressLoader } from './ApplicationPage/addressLoader';

const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: IndexPage },
      {
        id: 'application-page',
        path: 'application',
        Component: ApplicationPage,
        loader: addressLoader,
        children: [
          {
            index: true,
            element: <Navigate to="/application/personal-info" replace />,
          },
          {
            path: 'personal-info',
            Component: PersonalInfoForm,
          },
          {
            path: 'address',
            Component: AddressForm,
          },
          { path: 'params', Component: ParamsForm },
        ],
      },
    ],
  },
]);

export default appRouter;
