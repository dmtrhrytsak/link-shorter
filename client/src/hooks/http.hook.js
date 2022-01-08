import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLaoding] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLaoding(true);

      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong...');
        }

        return data;
      } catch (err) {
        setError(err.message);
      } finally {
        setLaoding(false);
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, request, clearError };
};
