import { addressSchema, paramsSchema, personalInfoDataSchema } from '@/types';

export const validateApplication = (derivedForms: {
  personalInfoForm: unknown;
  addressForm: unknown;
  paramsForm: unknown;
}): string | undefined => {
  if (
    !personalInfoDataSchema.safeParse(derivedForms.personalInfoForm).success
  ) {
    return '/application/personal-info';
  }

  if (!addressSchema.safeParse(derivedForms.addressForm).success) {
    return '/application/address';
  }

  if (!paramsSchema.safeParse(derivedForms.paramsForm).success) {
    return '/application/params';
  }
};
