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
import { useSkills } from "./useSkill";

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
  const {
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
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    modalDelete,
    onDelete,
  } = useSkills();

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
        const attributeValue =
          attributes && item?.attribute ? attributes[item?.attribute] : null;

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
                    {item?.kitValue
                      ? item?.kitValue
                      : 0 + item?.cost + (attributeValue ? attributeValue : 0)}
                    %
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
            errors={errors}
          />
          <GenericNumberInput
            name="cost"
            label="Custo"
            control={control}
            errors={errors}
          />

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
