import { apiUrls } from './apiUrls';

export const fetchCategories = async (): Promise<{
  data?: string[];
  error?: unknown;
}> => {
  try {
    const response = await fetch(apiUrls.productsCategories);
    if (!response.ok) throw new Error('Failed to load categories');
    const data = await response.json();
    return { data };
  } catch (error) {
    return { error };
  }
};

export const sendApplicationData = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}): Promise<{
  data?: string[];
  error?: unknown;
}> => {
  try {
    const result = await fetch(apiUrls.sendApplicationData, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `${firstName} ${lastName}`,
      }),
    });

    const data = await result.json();
    return { data };
  } catch (error) {
    return { error };
  }
};
