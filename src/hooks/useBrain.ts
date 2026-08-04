import { getApiHeaders } from '../utils/apiConfig';
import { useState } from 'react';

export const useBrain = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/brain/dispatch', {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({ input: prompt, context: { mode: "auto" } })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, isLoading, error };
};
