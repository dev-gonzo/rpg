// hooks/fetch/useSave.ts
import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useValidateAuth } from "../useValidateAuth";

export function useSave<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useValidateAuth();

  const save = useCallback(
    async (endpoint: string, body: any, method: "POST" | "PUT" = "POST") => {
      setLoading(true);
      setError(null);
      try {
        const config: AxiosRequestConfig = {
          url: endpoint,
          method,
          data: body,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };

        const response = await axios.request<T>(config);
        setData(response.data);
        setLoading(false);
        return response.data;
      } catch (err: any) {
        setError(err.message || "Erro ao salvar dados");
        setLoading(false);
        throw err;
      }
    },
    []
  );

  return { data, loading, error, save };
}
