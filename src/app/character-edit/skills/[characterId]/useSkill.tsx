// hooks/useSkills.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useGet } from "@/app/hooks/fetch/useGet";
import { useSave } from "@/app/hooks/fetch/useSave";
import { useDelete } from "@/app/hooks/fetch/useDelete";
import { SkillType } from "@/shared/types/character/SkillType";
import { yupResolver } from "@hookform/resolvers/yup";
import { skillSchema } from "@/shared/schemas/character/skillSchema";

export function useSkills() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [skills, setSkills] = useState<SkillType[]>([]);
  const [attributes, setAttributes] = useState<Record<string, number> | null>(
    null
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorDelete, setServerErrorDelete] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [skillDelete, setSkillDelete] = useState<SkillType | null>(null);

  const {
    data: skillsData,
    loading: loadingSkills,
    error: errorSkills,
    onParams: loadSkills,
  } = useGet<{ skills: SkillType[] }>();
  const {
    data: attributesData,
    loading: loadingAttributes,
    onParams: loadAttributes,
  } = useGet<{ attribute: Record<string, number> }>();
  const { save, loading: saving, error: saveError } = useSave<any>();
  const { remove, loading: deleting, error: deleteError } = useDelete();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillType>({
    resolver: yupResolver(skillSchema) as Resolver<SkillType>,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!characterId) return;

    setServerError(null);
    setIsLoading(true);

    loadSkills("/api/skills", { characterId });
    loadAttributes("/api/attributes", { characterId });
  }, [characterId]);

  useEffect(() => {
    if (skillsData?.skills) {
      setSkills(sortSkills(skillsData.skills));
    }
    if (errorSkills) {
      setServerError(null);
    }
  }, [skillsData, errorSkills]);

  useEffect(() => {
    if (attributesData?.attribute) {
      setAttributes(attributesData.attribute);
    }
  }, [attributesData]);

  useEffect(() => {
    setIsLoading(loadingSkills || loadingAttributes);
  }, [loadingSkills, loadingAttributes]);

  useEffect(() => {
    if (saveError) setServerError(saveError);
  }, [saveError]);

  useEffect(() => {
    if (deleteError) setServerErrorDelete(deleteError);
  }, [deleteError]);

  const resetForm = () => {
    reset();
    setServerError(null);
    setSuccessMessage(null);
  };

  const onSubmit: SubmitHandler<SkillType> = useCallback(
    async (data) => {
      setServerError(null);
      setSuccessMessage(null);
      setIsSaving(true);

      try {
        const payload = {
          characterId,
          ...data,
          kitValue: Number(data.kitValue),
          cost: Number(data.cost),
          group: data.group || null,
          attribute: data.attribute || null,
        };

        const response = await save("/api/skills", payload, "POST");

        if (response) {
          setSkills((prev) => sortSkills([...prev, response.skill]));
          setSuccessMessage("Perícia adicionada com sucesso!");
          resetForm();
          setShowModal(false);
        }
      } catch {
        setServerError("Erro inesperado ao adicionar perícia");
      } finally {
        setIsSaving(false);
        setTimeout(() => {
          setSuccessMessage(null);
          setServerError(null);
        }, 700);
      }
    },
    [characterId, save, reset]
  );

  const modalDelete = (skill: SkillType) => {
    setSkillDelete(skill);
    setShowModalDelete(true);
  };

  const onDelete = useCallback(async () => {
    if (!skillDelete) return;
    setIsSaving(true);
    setServerErrorDelete(null);
    setSuccessMessage(null);

    try {
      if (skillDelete.id) {
        await remove("/api/skills", skillDelete.id);
      }
      setSkills((prev) => sortSkills(prev.filter((item) => item?.id !== skillDelete.id)));
      setSuccessMessage("Perícia deletada com sucesso!");
    } catch {
      setServerErrorDelete("Erro ao deletar perícia");
    } finally {
      setShowModalDelete(false);
      setIsSaving(false);
      setTimeout(() => {
        setSkillDelete(null);
        setSuccessMessage(null);
        setServerErrorDelete(null);
      }, 1000);
    }
  }, [remove, skillDelete]);

  function sortSkills(skills: SkillType[]): SkillType[] {
    return skills.slice().sort((a, b) => {
      if (a.group === null && b.group !== null) return 1;
      if (a.group !== null && b.group === null) return -1;

      if (a.group && b.group) {
        const groupCompare = a.group.localeCompare(b.group);
        if (groupCompare !== 0) return groupCompare;
      }

      return a.skill.localeCompare(b.skill);
    });
  }

  return {
    skills,
    attributes,
    serverError,
    serverErrorDelete,
    successMessage,
    isLoading,
    isSaving,
    saving,
    deleting,
    showModal,
    setShowModal,
    showModalDelete,
    setShowModalDelete,
    skillDelete,
    setSkillDelete,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    modalDelete,
    onDelete,
  };
}
