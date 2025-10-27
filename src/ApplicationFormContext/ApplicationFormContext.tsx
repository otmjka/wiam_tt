import { createContext } from 'react';
import type { ApplicationFormContextType } from '@/types';

export const ApplicationFormContext =
  createContext<ApplicationFormContextType | null>(null);
