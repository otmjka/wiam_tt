import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { toast } from 'sonner';
import { type ApplicationFormData } from '@/types';
import { sendApplicationData } from '@/services/api/api';
import { getDerivedForms } from './getDerivedForms';

import { emptyState } from './emptyState';
import { validateApplication } from './validateApplication';

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

  const validate = useCallback(() => {
    const redirect = validateApplication(derivedForms);
    if (!redirect) {
      return true;
    }
    navigate(redirect);
    return false;
  }, [derivedForms, navigate]);

  const handleOpenSuccessDialog = useCallback((isOpen: boolean) => {
    setPageState((prev) => ({
      ...prev,
      successDialogOpened: isOpen,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }
    const { firstName, lastName } = pageState.formData;
    const result = await sendApplicationData({ firstName, lastName });
    if (result.error) {
      toast('Error while sendind application');
      return;
    }
    handleOpenSuccessDialog(true);
  }, [pageState.formData, validate, handleOpenSuccessDialog]);

  const nextStep = useCallback(
    (step: number) => {
      switch (step) {
        case 0:
          navigate('/application/address');
          break;
        case 1:
          navigate('/application/params');
          break;
        case 2:
          // wait for state updating
          setTimeout(() => handleSubmit(), 0);
      }
    },
    [navigate, handleSubmit],
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

      nextStep(step);
    },
    [nextStep],
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
    },
  };
};

export default useApplicationPage;
