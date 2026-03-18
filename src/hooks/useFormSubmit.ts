import { useState } from 'react';

interface SubmitOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useFormSubmit(formType: 'main' | 'contact' | 'partner', options?: SubmitOptions) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType,
          ...formData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при отправке');
      }

      setSuccess(true);
      if (options?.onSuccess) options.onSuccess();
      return { success: true, data };
    } catch (err: any) {
      const errorMessage = err.message || 'Произошла ошибка';
      setError(errorMessage);
      if (options?.onError) options.onError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
    error,
    success
  };
}