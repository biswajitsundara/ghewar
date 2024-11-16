import { useEffect, useRef, useState } from "react";

interface fetchProps {
  url: string;
  options?: RequestInit;
  endpoint: string;
  dataKey?: string;
}

export interface fetchResult<T> {
  data: T[];
  error: string;
  isLoading: boolean;
}

const useFetch = <T extends {}>({
  url,
  endpoint,
  dataKey,
  options = {},
}: fetchProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  // useEffect(() => {}, []);

  useEffect(() => {
    const fetchData = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${url}/${endpoint}`, {
          ...options,
          signal: abortControllerRef.current?.signal,
        });

        let responseData;
        const responseFromAPI = await response.json();
        if (dataKey) {
          responseData = responseFromAPI[dataKey] as T[];
        } else {
          responseData = responseFromAPI as T[];
        }
        setData(responseData);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("aborted..");
          return;
        }
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const result: fetchResult<T> = { data, error, isLoading };
  return result;
};

export default useFetch;
