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

type Improvement = {
  id: string;
  name: string;
  kitValue: number;
  cost: number;
};

type ImprovementFormData = {
  name: string;
  kitValue: number;
  cost: number;
};

export default function Improvements() {
  const params = useParams();
  const characterId = params.characterId as string;

  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverErrorDelete, setServerErrorDelete] = useState<string | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [improvementDelete, setImprovementDelete] =
    useState<Improvement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ImprovementFormData>({
    mode: "onBlur",
  });

  useEffect(() => {
    async function fetchImprovements() {
      setServerError(null);
      try {
        const response = await axios.get("/api/improvements", {
          params: { characterId },
        });
        if (
          response.status === 200 &&
          Array.isArray(response.data.improvements)
        ) {
          setImprovements(response.data.improvements);
        }
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
    if (characterId) {
      fetchImprovements();
    }
  }, [characterId]);

  const resetForm = () => {
    reset();
    setServerError(null);
    setSuccessMessage(null);
  };

  const onSubmit: SubmitHandler<ImprovementFormData> = async (data) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const payload = {
        characterId,
        ...data,
        kitValue: Number(data.kitValue),
        cost: Number(data.cost),
      };

      const response = await axios.post("/api/improvements", payload);

      if (response.status === 201) {
        setImprovements((prev) => [...prev, response.data.improvement]);
        setSuccessMessage("Aprimoramento adicionado com sucesso!");
        resetForm();
        setShowModal(false);
      } else {
        setServerError("Erro ao adicionar aprimoramento");
      }
    } catch {
      setServerError("Erro inesperado ao adicionar aprimoramento");
    } finally {
      setIsSaving(false);
    }
  };

  const modalDelete = (improvement: Improvement) => {
    setImprovementDelete(improvement);
    setShowModalDelete(true);
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete("/api/improvements", {
        params: { id: improvementDelete?.id },
      });
      if (
        response.status === 200 &&
        Array.isArray(response.data.improvements)
      ) {
        setImprovements(response.data.improvements);
      }
    } catch (error: any) {
      setServerErrorDelete(
        error.response?.data?.error || "Erro ao deletar aprimoramento"
      );
    } finally {
      setShowModalDelete(false);
      setIsLoading(false);
      setImprovementDelete(null);
      setTimeout(() => {
        setImprovements((prev) =>
          prev.filter((item) => item?.id != improvementDelete?.id)
        );
      }, 400);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Title>Aprimoramentos</Title>
        <div className="container my-4 text-light">
          <p>Carregando aprimoramentos...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Title>Aprimoramentos</Title>

      <div className="row gy-3">
        {improvements.length === 0 && (
          <div className="col-12 col-md-6">
            <p>Nenhum aprimoramento cadastrado.</p>
          </div>
        )}
      </div>

      {improvements.map((item) => (
        <div key={item?.id} className="card my-3">
          <div className="container-fluid">
            <div className="row my-3">
              <div className="col-12 col-md-6 pb-2 mb-2 d-flex  justify-content-between border-bottom">
                <span>
                  <strong>{item?.name}</strong>
                </span>
                <button
                  className="btn btn-close"
                  onClick={() => modalDelete(item)}
                ></button>
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
                  <small>Valor Kit</small>
                </strong>
                <br />
                <span>{item?.kitValue}</span>
              </div>
              <div className="col-4 text-center">
                <strong>
                  <small>Total</small>
                </strong>
                <br />
                <span>{item?.kitValue + item?.cost}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button
            className="btn btn-outline-light mb-3"
            onClick={() => setShowModal(true)}
          >
            Adicionar Aprimoramento
          </button>
        </div>
      </div>

      <ModalCustom
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Adicionar Aprimoramento"
        actionLabel={isSaving ? "Salvando..." : "Adicionar"}
        onAction={handleSubmit(onSubmit)}
        size="lg"
      >
        <form>
          <InputField
            name="name"
            label="Aprimoramento"
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
        title="Excluir Aprimoramento"
        actionLabel={isSaving ? "Salvando..." : "Excluir"}
        onAction={onDelete}
        size="lg"
      >
        <h4>
          Deseja excluir o aprimoramento:
          <br /> {improvementDelete?.name}?
        </h4>

        <AlertMessage error={serverErrorDelete} success={successMessage} />
      </ModalCustom>
    </MainLayout>
  );
}
