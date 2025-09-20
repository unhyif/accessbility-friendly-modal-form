import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

export interface ApplicationFormData {
  name: string;
  email: string;
  message?: string;
}

export function useApplicationForm(): UseFormReturn<ApplicationFormData> {
  return useForm<ApplicationFormData>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    mode: 'onChange',
  });
}
