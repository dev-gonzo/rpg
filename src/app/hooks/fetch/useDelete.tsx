import { useState, useCallback } from "react";
import axios from "axios";

export function useDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const remove = useCallback(async (endpoint: string, id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.delete(`${endpoint}?id=${id}`, {
        withCredentials: true,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Erro ao deletar");
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, remove };
}
