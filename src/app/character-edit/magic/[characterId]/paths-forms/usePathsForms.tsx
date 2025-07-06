// app/character-edit/paths-forms/usePathsForms.ts
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { SPEED } from "@/shared/constants/speed";

const pathsFormsSchema = yup.object({
  understandForm: yup.number().required().min(0),
  createForm: yup.number().required().min(0),
  controlForm: yup.number().required().min(0),

  fire: yup.number().required().min(0),
  water: yup.number().required().min(0),
  earth: yup.number().required().min(0),
  air: yup.number().required().min(0),
  light: yup.number().required().min(0),
  darkness: yup.number().required().min(0),

  plants: yup.number().required().min(0),
  animals: yup.number().required().min(0),
  humans: yup.number().required().min(0),
  spiritum: yup.number().required().min(0),
  arkanun: yup.number().required().min(0),
  metamagic: yup.number().required().min(0),
});

export type PathsFormsType = yup.InferType<typeof pathsFormsSchema>;

export function usePathsForms() {
  const router = useRouter();
  const params = useParams();
  const characterId = params.characterId as string;

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data, loading, onPath } = useGet<{
    pathsAndForms: PathsFormsType;
  }>({ initialLoading: true });
  const { save, loading: saveLoading, error: saveError } = useSave<any>();

  const { control, reset, handleSubmit, formState } = useForm<PathsFormsType>({
    resolver: yupResolver(pathsFormsSchema),
    mode: "onBlur",
    defaultValues: {
      understandForm: 0,
      createForm: 0,
      controlForm: 0,
      fire: 0,
      water: 0,
      earth: 0,
      air: 0,
      light: 0,
      darkness: 0,
      plants: 0,
      animals: 0,
      humans: 0,
      spiritum: 0,
      arkanun: 0,
      metamagic: 0,
    },
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (!characterId) return;
    onPath(`/api/magic/${characterId}/paths-forms`);
  }, [characterId]);

  useEffect(() => {
    if (data?.pathsAndForms) {
      reset(data.pathsAndForms);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<PathsFormsType> = async (formData) => {
    if (!characterId) return;

    try {
      if (data?.pathsAndForms) {
        await save(
          `/api/magic/${characterId}/paths-forms`,
          { characterId, ...formData },
          "PUT"
        );

        setTimeout(() => {
          router.push(`/character/magic/${characterId}`);
        }, SPEED.normal);
      } else {
        await save(
          `/api/magic/${characterId}/paths-forms`,
          { characterId, ...formData },
          "POST"
        );
        setTimeout(() => {
          router.push(`/character/magic/${characterId}`);
        }, SPEED.normal);
      }
      setSuccessMessage("Dados salvos com sucesso!");
    } catch {
      setSuccessMessage(null);
    }
  };

  return {
    control,
    errors,
    isSubmitting,
    isSaving: saveLoading,
    serverError: saveError,
    successMessage,
    handleSubmit,
    onSubmit,
    isLoading: loading,
  };
}
