"use client";

import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";
import { Journal } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
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

  const handleChangeText = (event: any) => {
    setValue("text", event.target.value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<Journal> = async (formData) => {
    setSuccessMessage(null);

    try {
      const url = "/api/journal";

      const featured = formData?.featured as string | boolean;

      await save(
        url,
        {
          ...formData,
          featured: featured == "true" || featured == true ? true : false,
        },
        "POST"
      );

      setSuccessMessage("Diario de Bordo criado com sucesso!");

      setTimeout(() => {
        router.push(`/journal`);
      }, SPEED.normal);
    } catch {}
  };

  console.log(getValues("image1"));

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
    handleImageUpload,
  };
};
