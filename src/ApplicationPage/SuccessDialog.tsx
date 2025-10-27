import type { FC } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import type { SuccessDialogState } from './types';

export const SuccessDialog: FC<{
  state: SuccessDialogState;
}> = ({
  state: {
    successDialogOpened,
    openSuccessMemoDialog,
    startNewApplication,
    successMessage,
  },
}) => {
  return (
    <Dialog open={successDialogOpened} onOpenChange={openSuccessMemoDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Success!</DialogTitle>
        </DialogHeader>
        <div>{successMessage}</div>
        <Button type="button" onClick={startNewApplication}>
          Start New Application
        </Button>
      </DialogContent>
    </Dialog>
  );
};
