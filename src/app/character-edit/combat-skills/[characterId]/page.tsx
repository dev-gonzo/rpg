"use client";

import { AlertMessage } from "@/app/components/AlertMessage";
import { ModalCustom } from "@/app/components/ModalCustom";
import Title from "@/app/components/Title";
import { GenericNumberInput } from "@/app/components/form/GenericNumberInput";
import { InputField } from "@/app/components/form/InputField";
import { SelectBox } from "@/app/components/form/SelectBox";
import MainLayout from "@/app/layouts/MainLayout";
import { useCombatSkills } from "./useCombatSkills";

export default function CombatSkillsPage() {
  const {
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
    isLoadingAttributes,
  } = useCombatSkills();

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
      <Title back>Perícias de Combate</Title>

      <div className="container">
        <div className="row mt-1 my-3">
          {combatSkills.length === 0 && (
            <div className="col-12 col-md-6">
              <p>Nenhuma perícia de combate cadastrada.</p>
            </div>
          )}
        </div>

        <div className="row gap-3">
          {combatSkills.map((item) => {
            const attributeValue =
              attributes && item?.attribute
                ? attributes[item?.attribute]
                : null;
            return (
              <div key={item?.id} className="col-12 col-md-6">
                <div className="card">
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
                          {item.attackCost +
                            (item.attackKitValue ? item.attackKitValue : 0) +
                            (attributeValue ? attributeValue : 0)}
                          % /{" "}
                          {item.defenseCost +
                            (item.defenseKitValue ? item.defenseKitValue : 0) +
                            (attributeValue ? attributeValue : 0)}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-end">
            <button
              className="btn btn-outline-light mb-3"
              onClick={() => setShowModal(true)}
            >
              Adicionar Perícia de Combate
            </button>
          </div>
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
