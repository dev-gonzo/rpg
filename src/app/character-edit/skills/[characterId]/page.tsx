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
import { Attribute } from "@prisma/client";
import { SelectBox } from "@/app/components/form/SelectBox";

type Skill = {
  id: string;
  group: string;
  skill: string;
  attribute: "CON" | "FR" | "DEX" | "AGI" | "INT" | "WILL" | "PER" | "CAR";
  cost: number;
  kitValue: number;
};

type SkillFormData = {
  group: string;
  skill: string;
  attribute: string;
  cost: number;
  kitValue: number;
};

export default function Skills() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [skills, setSkills] = useState<Skill[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorDelete, setServerErrorDelete] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAttributes, setIsLoadingAttributes] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [skillDelete, setSkillDelete] = useState<Skill | null>(null);
  const [attributes, setAttributes] = useState<Attribute | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<SkillFormData>({
    mode: "onBlur",
  });

  useEffect(() => {
    async function fetchSkills() {
      setServerError(null);
      try {
        const response = await axios.get("/api/skills", {
          params: { characterId },
        });
        if (response.status === 200 && Array.isArray(response.data.skills)) {
          setSkills(sortSkills(response.data.skills));
        }
      } catch {
        // Assume primeiro cadastro, não exibe erro
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
      fetchAttributes();
      fetchSkills();
    }
  }, [characterId]);

  const resetForm = () => {
    reset();
    setServerError(null);
    setSuccessMessage(null);
  };

  const onSubmit: SubmitHandler<SkillFormData> = async (data) => {
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

      const response = await axios.post("/api/skills", payload);

      if (response.status === 201) {
        setSkills((prev) => sortSkills([...prev, response.data.skill]));
        setSuccessMessage("Perícia adicionada com sucesso!");
        resetForm();
        setShowModal(false);
      } else {
        setServerError("Erro ao adicionar perícia");
      }
    } catch {
      setServerError("Erro inesperado ao adicionar perícia");
    } finally {
      setIsSaving(false);
    }
  };

  const modalDelete = (skill: Skill) => {
    setSkillDelete(skill);
    setShowModalDelete(true);
  };

  const onDelete = async () => {
    setIsSaving(true);
    setServerErrorDelete(null);
    setSuccessMessage(null);
    try {
      const response = await axios.delete("/api/skills", {
        params: { id: skillDelete?.id },
      });
      if (response.status === 200) {
        setSkills((prev) =>
          prev.filter((item) => item?.id !== skillDelete?.id)
        );
        setSuccessMessage("Perícia deletada com sucesso!");
      } else {
        setServerErrorDelete("Erro ao deletar perícia");
      }
    } catch (error: any) {
      setServerErrorDelete(
        error.response?.data?.error || "Erro ao deletar perícia"
      );
    } finally {
      setShowModalDelete(false);
      setIsSaving(false);
      setSkillDelete(null);
    }
  };

  function sortSkills(skills: Skill[]): Skill[] {
    return skills.slice().sort((a, b) => {
      // Ordena grupo null por último
      if (a.group === null && b.group !== null) return 1;
      if (a.group !== null && b.group === null) return -1;

      // Se ambos grupos são null ou iguais, ordenar pelo skill (string)
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
        <Title>Perícias</Title>
        <div className="container my-4 text-light">
          <p>Carregando perícias...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title>Perícias</Title>

      <div className="row gy-3">
        {skills.length === 0 && (
          <div className="col-12 col-md-6">
            <p>Nenhuma perícia cadastrada.</p>
          </div>
        )}
      </div>

      {skills.map((item) => {
        console.log(attributes);
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
                    aria-label={`Excluir perícia ${item?.skill}`}
                  ></button>
                </div>
                <div className="col-4 text-center">
                  <strong>
                    <small>Valor Kit</small>
                  </strong>
                  <br />
                  <span>{item?.kitValue}</span>
                </div>
                <div className="col-4 text-center">
                  <strong>
                    <small>Custo</small>
                  </strong>
                  <br />
                  <span>{item?.cost}</span>
                </div>
                <div className="col-4 text-center">
                  <strong>
                    <small>Total</small>
                  </strong>
                  <br />
                  <span>
                    {item?.kitValue +
                      item?.cost +
                      (attributeValue ? attributeValue : 0)}%
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
            Adicionar Perícia
          </button>
        </div>
      </div>

      <ModalCustom
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Adicionar Perícia"
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
            name="kitValue"
            label="Valor Kit"
            control={control}
          />
          <GenericNumberInput name="cost" label="Custo" control={control} />

          <AlertMessage error={serverError} success={successMessage} />
        </form>
      </ModalCustom>

      <ModalCustom
        show={showModalDelete}
        onHide={() => setShowModalDelete(false)}
        title="Excluir Perícia"
        actionLabel={isSaving ? "Salvando..." : "Excluir"}
        onAction={onDelete}
        size="lg"
      >
        <h4>
          Deseja excluir a perícia:
          <br /> {skillDelete?.skill}?
        </h4>

        <AlertMessage error={serverErrorDelete} success={successMessage} />
      </ModalCustom>
    </MainLayout>
  );
}
