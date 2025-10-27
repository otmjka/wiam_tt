import { toast } from 'sonner';

import { fetchCategories } from '@/services/api/api';
import { redirect } from 'react-router';

export const addressLoader = async () => {
  const result = await fetchCategories();
  if (!result.error) {
    return { categories: result.data };
  }
  toast('Error while loading categories data');
  throw redirect('/');
};
