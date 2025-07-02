"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";

import { AlertMessage } from "@/app/components/AlertMessage";
import { DatePicker } from "@/app/components/form/DatePicker";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import { SubmitButton } from "@/app/components/form/SubmitButton";
import { characterBasicDataSchema } from "@/shared/schemas/characterBasicDataSchema";
import { CharacterBasicData } from "@/shared/types/character/CharacterBasicData";

export default function CharacterFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const characterId = searchParams.get("id") || undefined;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!characterId);
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CharacterBasicData>({
    resolver: yupResolver(characterBasicDataSchema) as any,
    mode: "onBlur",
  });

  // Se houver id, carrega os dados para edição
  useEffect(() => {
    if (!characterId) return;

    async function fetchCharacter() {
      setServerError(null);
      setIsLoading(true);
      try {
        const res = await fetch(`/api/characters?characterId=${characterId}`);
        if (!res.ok) {
          setServerError("Erro ao carregar personagem.");
          setIsLoading(false);
          return;
        }
        const json = await res.json();
        if (json.character) {
          // Ajusta a data para o formato yyyy-MM-dd
          const character = json.character;
          if (character.birthDate) {
            character.birthDate = character.birthDate.split("T")[0];
          }
          reset(character);
        }
      } catch {
        setServerError("Erro inesperado ao carregar personagem.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacter();
  }, [characterId, reset]);

  const onSubmit: SubmitHandler<CharacterBasicData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const method = characterId ? "PUT" : "POST";
      const url = "/api/characters";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || "Erro ao salvar personagem");
        setIsSaving(false);
        return;
      }

      setSuccessMessage(
        characterId
          ? "Personagem atualizado com sucesso!"
          : "Personagem criado com sucesso!"
      );
      // Opcional: redirecionar ou limpar form após sucesso
      // router.push("/characters");
    } catch {
      setServerError("Erro inesperado ao salvar personagem");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Title>
          {characterId ? "Editando Personagem" : "Criar Novo Personagem"}
        </Title>
        <div className="container my-4 text-light">
          Carregando dados do personagem...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title>
        {characterId ? "Editar Personagem" : "Criar Novo Personagem"}
      </Title>
      <div className="container my-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
          <InputField
            name="name"
            label="Nome"
            md={12}
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
            md={3}
            control={control}
            errors={errors}
            defaultValue={undefined}
          />
          <InputField
            name="birthPlace"
            label="Local de Nascimento"
            md={9}
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
            md={3}
            register={register}
            errors={errors}
          />
          <InputField
            name="heightCm"
            label="Altura (cm)"
            md={3}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="weightKg"
            label="Peso (kg)"
            md={3}
            type="number"
            register={register}
            errors={errors}
          />
          <InputField
            name="apparentAge"
            label="Idade Aparente (anos)"
            md={3}
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

          <SubmitButton isLoading={isSaving} isSubmitting={isSubmitting} />
        </form>
      </div>
    </MainLayout>
  );
}
