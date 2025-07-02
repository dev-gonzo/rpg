"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import Title from "@/app/components/Title";
import { AttributeInput } from "@/app/components/form/AttributeInput";
import MainLayout from "@/app/layouts/MainLayout";
import { AlertMessage } from "@/app/components/AlertMessage";
import { SubmitButton } from "@/app/components/form/SubmitButton";

type AttributesForm = {
  CON: number;
  FR: number;
  DEX: number;
  AGI: number;
  INT: number;
  WILL: number;
  PER: number;
  CAR: number;
};

export default function CharacterAttributes() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AttributesForm>({
    // sem defaultValues para iniciar vazio
  });

  // Watch all attribute values to calculate total
  const attributes = useWatch({
    control,
    name: ["CON", "FR", "DEX", "AGI", "INT", "WILL", "PER", "CAR"],
  });

  const total = attributes
    .map((v) => (typeof v === "number" ? v : 0))
    .reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    async function fetchAttributes() {
      try {
        const response = await axios.get("/api/attributes", {
          params: { characterId },
        });
        if (response.status === 200 && response.data.attribute) {
          reset(response.data.attribute);
        }
      } catch {
        // erro silencioso: assume primeiro cadastro
      } finally {
        setIsLoading(false);
      }
    }
    if (characterId) {
      fetchAttributes();
    }
  }, [characterId, reset]);

  const onSubmit: SubmitHandler<AttributesForm> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      const payload = { characterId, ...data };
      const response = await axios.post("/api/attributes", payload);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Atributos salvos com sucesso!");
      } else {
        setServerError("Erro ao salvar atributos");
      }
    } catch {
      setServerError("Erro inesperado ao salvar atributos");
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Title>Atributos do Personagem</Title>
        <div className="container my-4 text-light">
          <p>Carregando atributos...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title>Atributos do Personagem</Title>
      <div className="container my-4">
        <form onSubmit={handleSubmit(onSubmit)} className="row">
          <AttributeInput name="CON" control={control} />
          <AttributeInput name="FR" control={control} />
          <AttributeInput name="DEX" control={control} />
          <AttributeInput name="AGI" control={control} />
          <AttributeInput name="INT" control={control} />
          <AttributeInput name="WILL" control={control} />
          <AttributeInput name="PER" control={control} />
          <AttributeInput name="CAR" control={control} />

          <div className="col-md-5 col-sm-8 mt-3 text-center">
            <strong>Total de Pontos:</strong>
            <br />
            <strong className="h4">{total}</strong>
          </div>

          <AlertMessage error={serverError} success={successMessage} />

          <SubmitButton isLoading={isLoading} isSubmitting={isSubmitting} />
        </form>
      </div>
    </MainLayout>
  );
}
