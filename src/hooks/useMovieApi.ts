import { useEffect, useState } from "react";

export function useMovieApi<T>(apiFunc: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFunc()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
