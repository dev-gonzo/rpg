"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import MainLayout from "../layouts/MainLayout";
import Title from "../components/Title";

import { characterBasicDataSchema } from "@/shared/schemas/characterBasicDataSchema";
import { InputField } from "../components/form/InputField";
import { SelectBox } from "../components/form/SelectBox";
import { DatePicker } from "../components/form/DatePicker";
import { CharacterBasicData } from "@/shared/types/character/CharacterBasicData";
import { AlertMessage } from "../components/AlertMessage";
import { SubmitButton } from "../components/form/SubmitButton";

export default function CharacterCreatePage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CharacterBasicData>({
    resolver: yupResolver(characterBasicDataSchema) as any,
    mode: "onBlur",
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CharacterBasicData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || "Erro ao salvar personagem");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Personagem criado com sucesso!");
    } catch {
      setServerError("Erro inesperado ao salvar personagem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <Title>Criar Novo Personagem</Title>
      <div className="container my-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
          <InputField
            name="name"
            label="Nome"
            md={6}
            register={register}
            errors={errors}
          />

          <SelectBox
            name="socialClass"
            label="Classe Social"
            options={[
                  { value: "alta", label: "Alta" },
                  { value: "mediaAlta", label: "Média Alta" },
                  { value: "media", label: "Média" },
                  { value: "mediaBaixa", label: "Média Baixa" },
                  { value: "baixa", label: "Baixa" },
            ]}
            md={6}
            register={register}
            errors={errors}
          />

          <InputField
            name="profession"
            label="Profissão"
            md={6}
            register={register}
            errors={errors}
          />
          <DatePicker
            name="birthDate"
            label="Data de Nascimento"
            md={6}
            control={control}
            errors={errors}
            defaultValue={undefined}
            
          />
          <InputField
            name="birthPlace"
            label="Local de Nascimento"
            md={6}
            register={register}
            errors={errors}
          />
          <SelectBox
            name="gender"
            label="Sexo"
            options={[
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
            ]}
            md={6}
            register={register}
            errors={errors}
          />
          <InputField
            name="heightCm"
            label="Altura (cm)"
            md={4}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="weightKg"
            label="Peso (kg)"
            md={4}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="apparentAge"
            label="Idade Aparente (anos)"
            md={4}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="religion"
            label="Religião"
            md={6}
            register={register}
            errors={errors}
          />

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton isLoading={isLoading} isSubmitting={isSubmitting} />
        </form>
      </div>
    </MainLayout>
  );
}
