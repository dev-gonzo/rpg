"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ModalCustom } from "@/app/components/ModalCustom";
import Title from "@/app/components/Title";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { InputField } from "@/app/components/form/InputField";
import MainLayout from "@/app/layouts/MainLayout";
import { useImprovements } from "./useImprovements";

export default function Improvements() {
  const {
    improvements,
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
    improvementDelete,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    modalDelete,
    onDelete,
    control,
  } = useImprovements();

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
              <div className="col-12  pb-2 mb-2 d-flex  justify-content-between border-bottom">
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
                <span>{item?.kitValue ? item?.kitValue : 0 + item?.cost}</span>
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
        <form className="row">
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
