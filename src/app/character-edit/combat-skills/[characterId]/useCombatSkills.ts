"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import axios from "axios";

import { Attribute } from "@prisma/client";
import { CombatSkillType } from "@/shared/types/character/CombatSkillType";
import { yupResolver } from "@hookform/resolvers/yup";
import { combatSkillSchema } from "@/shared/schemas/character/combatSkillSchema";

export function useCombatSkills() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [combatSkills, setCombatSkills] = useState<CombatSkillType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorDelete, setServerErrorDelete] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [combatSkillDelete, setCombatSkillDelete] =
    useState<CombatSkillType | null>(null);
  const [isLoadingAttributes, setIsLoadingAttributes] = useState(true);
  const [attributes, setAttributes] = useState<Attribute | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CombatSkillType>({
    mode: "onBlur",
    resolver: yupResolver(combatSkillSchema) as Resolver<CombatSkillType>,
  });

  useEffect(() => {
    async function fetchCombatSkills() {
      setServerError(null);
      try {
        const response = await axios.get("/api/combat-skills", {
          params: { characterId },
        });
        if (
          response.status === 200 &&
          Array.isArray(response.data.combatSkills)
        ) {
          setCombatSkills(sortCombatSkills(response.data.combatSkills));
        }
      } catch {
        // assume first time, no error shown
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchAttributes() {
      try {
        const response = await axios.get("/api/attributes", {
          params: { characterId },
        });
        if (response.status === 200 && response.data.attribute) {
          setAttributes(response.data.attribute);
        }
      } catch {
        // silent error
      } finally {
        setIsLoadingAttributes(false);
      }
    }

    if (characterId) {
      fetchCombatSkills();
      fetchAttributes();
    }
  }, [characterId]);

  const resetForm = () => {
    reset();
    setServerError(null);
    setSuccessMessage(null);
  };

  const onSubmit: SubmitHandler<CombatSkillType> = useCallback(
    async (data) => {
      setServerError(null);
      setSuccessMessage(null);
      setIsSaving(true);

      try {
        const payload = {
          characterId,
          skill: data.skill,
          group: data.group || null,
          attribute: data.attribute || null,
          attackCost: Number(data.attackCost),
          defenseCost: Number(data.defenseCost),
          attackKitValue: Number(data.attackKitValue),
          defenseKitValue: Number(data.defenseKitValue),
        };

        const response = await axios.post("/api/combat-skills", payload);

        if (response.status === 201) {
          setCombatSkills((prev) =>
            sortCombatSkills([...prev, response.data.combatSkill])
          );
          setSuccessMessage("Perícia de Combate adicionada com sucesso!");
          resetForm();
          setShowModal(false);
        } else {
          setServerError("Erro ao adicionar perícia de combate");
        }
      } catch {
        setServerError("Erro inesperado ao adicionar perícia de combate");
      } finally {
        setIsSaving(false);
        setTimeout(() => {
          setSuccessMessage(null);
          setServerError(null);
        }, 3000);
      }
    },
    [characterId, reset]
  );

  const modalDelete = useCallback((combatSkill: CombatSkillType) => {
    setCombatSkillDelete(combatSkill);
    setShowModalDelete(true);
  }, []);

  const onDelete = useCallback(async () => {
    setIsSaving(true);
    setServerErrorDelete(null);
    setSuccessMessage(null);
    try {
      const response = await axios.delete("/api/combat-skills", {
        params: { id: combatSkillDelete?.id },
      });
      if (response.status === 200) {
        setCombatSkills((prev) =>
          prev.filter((item) => item?.id !== combatSkillDelete?.id)
        );
      } else {
        setServerErrorDelete("Erro ao deletar perícia de combate");
      }
    } catch (error: any) {
      setServerErrorDelete(
        error.response?.data?.error || "Erro ao deletar perícia de combate"
      );
    } finally {
      setShowModalDelete(false);
      setIsSaving(false);
      setTimeout(() => {
        setCombatSkillDelete(null);
        setSuccessMessage(null);
        setServerErrorDelete(null);
      }, 3000);
    }
  }, [combatSkillDelete]);

  function sortCombatSkills(skills: CombatSkillType[]): CombatSkillType[] {
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
    combatSkills,
    showModal,
    setShowModal,
    serverError,
    serverErrorDelete,
    successMessage,
    isLoading,
    isSaving,
    showModalDelete,
    setShowModalDelete,
    combatSkillDelete,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    control,
    onSubmit,
    modalDelete,
    onDelete,
    attributes,
    isLoadingAttributes
  };
}
