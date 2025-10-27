import type { ApplicationFormData } from '@/types';

const getPersonalInfo = (formData: ApplicationFormData) => ({
  phone: formData.phone,
  firstName: formData.firstName,
  lastName: formData.lastName,
  gender: formData.gender,
});

const getAddressInfo = (formData: ApplicationFormData) => ({
  workplace: formData.workplace,
  address: formData.address,
});

const getApplicationParams = (formData: ApplicationFormData) => ({
  loanAmount: formData.loanAmount,
  loanTerm: formData.loanTerm,
});

export const getDerivedForms = (formData: ApplicationFormData) => ({
  personalInfoForm: getPersonalInfo(formData),
  addressForm: getAddressInfo(formData),
  paramsForm: getApplicationParams(formData),
});
