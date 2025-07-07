"use client";

import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";
import { Journal } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useJournal = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Journal>({
    // resolver: yupResolver(magicSchema) as Resolver<MagicType>,
    mode: "onBlur",
  });

  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<Journal> = async (formData) => {
    setSuccessMessage(null);

    try {
      const url = "/api/journal";

      await save(url, { ...formData }, "POST");

      setSuccessMessage("Diario de Bordo criado com sucesso!");

      setTimeout(() => {
        router.push(`/character/journal`);
      }, SPEED.normal);
    } catch {}
  };

  return {
    register,
    errors,
    successMessage,
    serverError: saveError,
    isLoading: saveLoading,
    onSubmit,
    handleSubmit,
    getValues,
    handleChangeText,
  };
};
