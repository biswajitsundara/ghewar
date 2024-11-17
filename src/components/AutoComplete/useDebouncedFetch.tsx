import { useState, useEffect } from "react";

const debounce = (func: Function, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  // The debounced function that calls the provided function after the delay
  const debouncedFunc = (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  // Add a cancel method to clear the timeout
  debouncedFunc.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunc;
};

interface UseDebouncedFetchProps<T> {
  query: string;
  fetchSuggestions: (query: string) => Promise<T[]>;
  debounceDelay?: number;
}

export function useDebouncedFetch<T>({
  query,
  fetchSuggestions,
  debounceDelay = 500,
}: UseDebouncedFetchProps<T>) {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced function for fetching data
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // Create the debounced fetch function
    const debouncedFetch = debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSuggestions(query);
        setResults(data);
      } catch (error) {
        setError("Failed to fetch suggestions");
      } finally {
        setLoading(false);
      }
    }, debounceDelay);

    // Call the debounced function when query changes
    debouncedFetch();

    // Cleanup function to clear timeout if the component unmounts or query changes
    return () => {
      debouncedFetch.cancel();
    };
  }, [query]);

  return { results, loading, error };
}
