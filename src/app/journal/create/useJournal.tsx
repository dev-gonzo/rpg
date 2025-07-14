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
      const featured =
        formData?.featured == true ||
        (formData.featured as unknown as string) == "true"
          ? true
          : false;
      const isPublic =
        formData?.isPublic == true ||
        (formData.isPublic as unknown as string) == "true"
          ? true
          : false;

      await save(
        url,
        { ...formData, featured: featured, isPublic: isPublic },
        "POST"
      );

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
