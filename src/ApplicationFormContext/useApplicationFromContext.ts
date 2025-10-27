import { useContext } from 'react';
import { ApplicationFormContext } from './ApplicationFormContext';

export const useApplicationFromContext = () => {
  const context = useContext(ApplicationFormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
