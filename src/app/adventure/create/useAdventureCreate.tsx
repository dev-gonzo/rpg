"use client";

import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";
import { Adventure } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useAdventureCreate = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
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

  const onSubmit: SubmitHandler<Adventure> = async (formData) => {
    setSuccessMessage(null);

    try {
      const url = "/api/adventure";

      await save(url, { ...formData }, "POST");

      setSuccessMessage("Registro criado com sucesso!");

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
    isLoading: saveLoading,
    getValues,
    handleChangeText,
    handleSubmit,
    onSubmit,
    handleImageUpload,
  };
};
