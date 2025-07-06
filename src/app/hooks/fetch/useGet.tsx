"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Params } from "next/dist/server/request/params";
import { useValidateAuth } from "../useValidateAuth";

type Props = {
  initialLoading?: boolean;
};

export function useGet<T>({ initialLoading = false }: Props = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  useValidateAuth();

  async function onPath(path: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<T>(path, { withCredentials: true });
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  }

  async function onParams(path: string, params: Params) {
    setLoading(true);
    setError(null);
    try {
      const config: AxiosRequestConfig = {
        url: path,
        method: "GET",
        params,
        withCredentials: true,
      };
      const response = await axios.request<T>(config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, onPath, onParams };
}
