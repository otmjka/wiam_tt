import { type FC } from 'react';
import { Outlet } from 'react-router';

import { ApplicationFormContext } from './ApplicationFormContext/ApplicationFormContext';
import useApplicationPage from './useApplicationPage';
import { SuccessDialog } from './SuccessDialog';

const ApplicationPage: FC = () => {
  const { contextValue, successDialogState } = useApplicationPage();

  return (
    <ApplicationFormContext.Provider value={contextValue}>
      <div className="flex justify-center pt-10">
        <Outlet />
      </div>
      <SuccessDialog state={successDialogState} />
    </ApplicationFormContext.Provider>
  );
};

export default ApplicationPage;
