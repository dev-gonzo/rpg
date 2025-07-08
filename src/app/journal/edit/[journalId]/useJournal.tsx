"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useMasterOrControl } from "@/app/hooks/useMasterOrControl";
import { SPEED } from "@/shared/constants/speed";
import { Journal } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useJournal = () => {
  const router = useRouter();
  const params = useParams();
  const journalId = params.journalId as string;
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, error, onPath } = useGet<{
    journal: Journal;
  }>({ initialLoading: true });

  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<Journal>({
    // resolver: yupResolver(magicSchema) as Resolver<MagicType>,
    mode: "onBlur",
    defaultValues: {
      status: "DRAFT",
      text: "",
      isPublic: false,
      featured: true,
    },
  });

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
    if (!journalId) return;

    onPath(`/api/journal/${journalId}`);
  }, [journalId]);

  useEffect(() => {
    if (data?.journal) {
      reset(data.journal);
    }
  }, [data, reset]);

  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<Journal> = async (formData) => {
    setSuccessMessage(null);

    try {
      const url = `/api/journal/${journalId}`;

      const featured = formData?.featured as string | boolean;

      await save(
        url,
        {
          ...formData,
          featured: featured == "true" || featured == true ? true : false,
        },
        "PUT"
      );

      setSuccessMessage("Diario de Bordo criado com sucesso!");

      setTimeout(() => {
        router.push(`/journal`);
      }, SPEED.normal);
    } catch {}
  };

  return {
    register,
    errors,
    successMessage,
    serverError: saveError,
    isLoading: loading,
    saveLoading,
    onSubmit,
    handleSubmit,
    getValues,
    handleChangeText,
    handleImageUpload,
  };
};
