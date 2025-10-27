import type { ReactNode } from 'react';
import { z } from 'zod';
import { ApplicationFormMessages } from './enums';

export interface FormProviderProps {
  children: ReactNode;
}

export interface ApplicationFormData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  workplace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

export const personalInfoDataSchema = z.object({
  phone: z
    .string()
    .min(1, ApplicationFormMessages.required)
    .regex(/^0[0-9]{3}[0-9]{3}[0-9]{3}$/, ApplicationFormMessages.validPhone),
  firstName: z.string().min(1, ApplicationFormMessages.required),
  lastName: z.string().min(1, ApplicationFormMessages.required),
  gender: z.string().min(1, ApplicationFormMessages.required),
});

export const addressSchema = z.object({
  address: z.string().min(1, ApplicationFormMessages.required),
  workplace: z.string().min(1, ApplicationFormMessages.required),
});

export const paramsSchema = z.object({
  loanAmount: z.number().min(200).max(1000),
  loanTerm: z.number().min(10).max(30),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoDataSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ParamsFormData = z.infer<typeof paramsSchema>;

export interface ApplicationFormContextType {
  personalInfoForm: PersonalInfoFormData;
  addressForm: AddressFormData;
  paramsForm: ParamsFormData;
  addressFormState: {
    categories: string[];
  };
  updateFormData: (params: {
    step: number;
    data: Partial<ApplicationFormData>;
  }) => void;
  onPrevStep: (params: {
    currentStep: number;
    data: Partial<ApplicationFormData>;
  }) => void;
}

/* API */

export type Categories = string[];
