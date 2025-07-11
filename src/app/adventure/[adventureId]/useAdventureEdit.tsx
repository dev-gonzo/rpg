"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";
import { Adventure } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useAdventureCreate = () => {
  const router = useRouter();
  const params = useParams();
  const adventureId = params.adventureId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, error, onPath } = useGet<{
    adventure: Adventure;
  }>({ initialLoading: true });

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
    reset,
  } = useForm<Adventure>({
    mode: "onBlur",
  });

  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    field: "image1" | "image2" | "image3"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setValue(field, reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!adventureId) return;

    onPath(`/api/adventure/${adventureId}`);
  }, [adventureId]);

  useEffect(() => {
    if (data?.adventure) {
      reset(data.adventure);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<Adventure> = async (formData) => {
    setSuccessMessage(null);

    try {
      const url =  `/api/adventure/${adventureId}`;

      await save(url, { ...formData }, "PUT");

      setSuccessMessage("Registro atualizado com sucesso!");

      setTimeout(() => {
        router.push(`/adventure`);
      }, SPEED.normal);
    } catch {}
  };

  return {
    register,
    errors,
    serverError: saveError,
    successMessage,
    isLoading: loading,
    saveLoading,
    getValues,
    handleChangeText,
    handleSubmit,
    onSubmit,
    handleImageUpload,
  };
};
