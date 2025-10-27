import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { toast } from 'sonner';
import { type ApplicationFormData } from '@/types';
import { sendApplicationData } from '@/services/api/api';
import { getDerivedForms } from './helpers/getDerivedForms';

import { emptyState } from './helpers/emptyState';
import { validateApplication } from './helpers/validateApplication';

const useApplicationPage = () => {
  const { categories } = useRouteLoaderData('application-page');
  const navigate = useNavigate();

  const [pageState, setPageState] = useState<{
    formData: ApplicationFormData;
    successDialogOpened: boolean;
  }>(emptyState);

  const derivedForms = useMemo(
    () => getDerivedForms(pageState.formData),
    [pageState.formData],
  );

  const handleOpenSuccessDialog = useCallback((isOpen: boolean) => {
    setPageState((prev) => ({
      ...prev,
      successDialogOpened: isOpen,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (formData: ApplicationFormData) => {
      const redirect = validateApplication(getDerivedForms(formData));
      if (redirect) {
        navigate(redirect);
        return;
      }
      const { firstName, lastName } = formData;
      const result = await sendApplicationData({ firstName, lastName });
      if (result.error) {
        toast('Error while sendind application');
        return;
      }
      handleOpenSuccessDialog(true);
    },
    [navigate, handleOpenSuccessDialog],
  );

  const prevStep = useCallback(
    (currentStep: number) => {
      switch (currentStep) {
        case 0:
          return;
        case 1:
          navigate('/application/personal-info');
          return;
        case 2:
          navigate('/application/address');
          return;
      }
    },
    [navigate],
  );

  const updateFormData = useCallback(
    ({ step, data }: { step: number; data: Partial<ApplicationFormData> }) => {
      setPageState((prev) => ({
        ...prev,
        formData: { ...prev.formData, ...data },
      }));

      switch (step) {
        case 0:
          navigate('/application/address');
          break;
        case 1:
          navigate('/application/params');
          break;
        case 2:
          handleSubmit({ ...pageState.formData, ...data });
      }
    },
    [handleSubmit, navigate, pageState.formData],
  );

  const onPrevStep = useCallback(
    ({
      currentStep,
      data,
    }: {
      currentStep: number;
      data: Partial<ApplicationFormData>;
    }) => {
      setPageState((prev) => ({
        ...prev,
        formData: { ...prev.formData, ...data },
      }));

      prevStep(currentStep);
    },
    [prevStep],
  );

  const startNewApplication = useCallback(() => {
    setPageState({ ...emptyState });
    navigate('/application');
  }, [navigate]);
  const successMessage = useMemo(() => {
    return `${pageState.formData.firstName} ${pageState.formData.lastName} congratulations! 
            You can get ${pageState.formData.loanAmount} for ${pageState.formData.loanTerm}`;
  }, [pageState.formData]);
  return {
    contextValue: {
      personalInfoForm: derivedForms.personalInfoForm,
      addressForm: derivedForms.addressForm,
      paramsForm: derivedForms.paramsForm,
      addressFormState: {
        categories,
      },
      updateFormData,
      onPrevStep,
    },
    successDialogState: {
      successDialogOpened: pageState.successDialogOpened,
      openSuccessMemoDialog: handleOpenSuccessDialog,
      startNewApplication,
      successMessage,
    },
  };
};

export default useApplicationPage;
