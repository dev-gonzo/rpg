"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import MainLayout from "@/app/layouts/MainLayout";
import Title from "@/app/components/Title";
import { ModalCustom } from "@/app/components/ModalCustom";
import { InputField } from "@/app/components/form/InputField";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { SelectBox } from "@/app/components/form/SelectBox";
import { Attribute } from "@prisma/client";

type CombatSkill = {
  id: string;
  group: string | null;
  skill: string;
  attribute: "CON" | "FR" | "DEX" | "AGI" | "INT" | "WILL" | "PER" | "CAR";
  attackCost: number;
  defenseCost: number;
  attackKitValue: number;
  defenseKitValue: number;
};

type CombatSkillFormData = {
  group?: string;
  skill: string;
  attribute?: string;
  attackCost: number;
  defenseCost: number;
  attackKitValue: number;
  defenseKitValue: number;
};

export default function CombatSkillsPage() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [combatSkills, setCombatSkills] = useState<CombatSkill[]>([]);
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
    useState<CombatSkill | null>(null);
  const [isLoadingAttributes, setIsLoadingAttributes] = useState(true);
  const [attributes, setAttributes] = useState<Attribute | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CombatSkillFormData>({
    mode: "onBlur",
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
        // assume primeiro cadastro, não exibe erro
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
        // erro silencioso: assume primeiro cadastro
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

  const onSubmit: SubmitHandler<CombatSkillFormData> = async (data) => {
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
  };

  const modalDelete = (combatSkill: CombatSkill) => {
    setCombatSkillDelete(combatSkill);
    setShowModalDelete(true);
  };

  const onDelete = async () => {
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
        setSuccessMessage("Perícia de Combate deletada com sucesso!");
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
  };

  function sortCombatSkills(skills: CombatSkill[]): CombatSkill[] {
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

  if (isLoading || isLoadingAttributes) {
    return (
      <MainLayout>
        <Title>Perícias de Combate</Title>
        <div className="container my-4 text-light">
          <p>Carregando perícias de combate...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title>Perícias de Combate</Title>

      <div className="row gy-3">
        {combatSkills.length === 0 && (
          <div className="col-12 col-md-6">
            <p>Nenhuma perícia de combate cadastrada.</p>
          </div>
        )}
      </div>

      {combatSkills.map((item) => {
        const attributeValue = attributes && attributes[item.attribute];
        return (
          <div key={item?.id} className="card my-3">
            <div className="container-fluid">
              <div className="row my-3">
                <div className="col-12 pb-2 mb-2 d-flex justify-content-between border-bottom">
                  <span>
                    {item?.group ? <span>{item?.group} / </span> : ""}
                    <strong>{item?.skill}</strong>{" "}
                    {item?.attribute ? `(${item.attribute})` : ""}
                  </span>
                  <button
                    className="btn btn-close"
                    onClick={() => modalDelete(item)}
                    aria-label={`Excluir perícia de combate ${item?.skill}`}
                  />
                </div>
                <div className="col-4 text-center">
                  <strong>
                    <small>
                      Custo <br /> Ataque/Defesa
                    </small>
                  </strong>
                  <br />
                  <span>
                    {item.attackCost} / {item.defenseCost}
                  </span>
                </div>

                <div className="col-4 text-center">
                  <strong>
                    <small>
                      Kit <br /> Ataque/Defesa
                    </small>
                  </strong>
                  <br />
                  <span>
                    {item.attackKitValue} / {item.defenseKitValue}
                  </span>
                </div>

                <div className="col-4 text-center">
                  <strong>
                    <small>
                      Total <br /> Ataque/Defesa
                    </small>
                  </strong>
                  <br />
                  <span>
                    {item.attackCost + item.attackKitValue + (attributeValue ? attributeValue : 0)}% /{" "}
                    {item.defenseCost + item.defenseKitValue + (attributeValue ? attributeValue : 0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-outline-light mb-3"
            onClick={() => setShowModal(true)}
          >
            Adicionar Perícia de Combate
          </button>
        </div>
      </div>

      <ModalCustom
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Adicionar Perícia de Combate"
        actionLabel={isSaving ? "Salvando..." : "Adicionar"}
        onAction={handleSubmit(onSubmit)}
        size="lg"
      >
        <form className="row">
          <InputField
            name="group"
            label="Grupo"
            md={12}
            register={register}
            errors={errors}
          />
          <InputField
            name="skill"
            label="Perícia"
            md={12}
            register={register}
            errors={errors}
          />
          <SelectBox
            name="attribute"
            label="Atributo"
            options={[
              { label: "Constituição (CON)", value: "CON" },
              { label: "Força (FR)", value: "FR" },
              { label: "Destreza (DEX)", value: "DEX" },
              { label: "Agilidade (AGI)", value: "AGI" },
              { label: "Inteligência (INT)", value: "INT" },
              { label: "Força de Vontade (WILL)", value: "WILL" },
              { label: "Percepção (PER)", value: "PER" },
              { label: "Carisma (CAR)", value: "CAR" },
            ]}
            md={12}
            register={register}
            errors={errors}
          />
          <GenericNumberInput
            name="attackCost"
            label="Custo Ataque"
            control={control}
          />
          <GenericNumberInput
            name="defenseCost"
            label="Custo Defesa"
            control={control}
          />
          <GenericNumberInput
            name="attackKitValue"
            label="Kit Ataque"
            control={control}
          />
          <GenericNumberInput
            name="defenseKitValue"
            label="Kit Defesa"
            control={control}
          />

          <AlertMessage error={serverError} success={successMessage} />
        </form>
      </ModalCustom>

      <ModalCustom
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        title="Excluir Perícia de Combate"
        actionLabel={isSaving ? "Salvando..." : "Excluir"}
        onAction={onDelete}
        size="lg"
      >
        <h4>
          Deseja excluir a perícia de combate:
          <br /> {combatSkillDelete?.skill}?
        </h4>

        <AlertMessage error={serverErrorDelete} success={successMessage} />
      </ModalCustom>
    </MainLayout>
  );
}
