export type SuccessDialogState = {
  successDialogOpened: boolean;
  openSuccessMemoDialog: (isOpen: boolean) => void;
  startNewApplication: () => void;
  successMessage: string;
};
