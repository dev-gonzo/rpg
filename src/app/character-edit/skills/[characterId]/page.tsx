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


export default function Skills() {
  const {
    skills,
    attributes,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useSkills();

  return (
    <MainLayout>
      <Title back>Perícias</Title>

      <div className="container">
        <div className="row mt-3 px-2">
          {skills.length === 0 && (
            <div className="col-12 col-md-6">
              <p>Nenhuma perícia cadastrada.</p>
            </div>
          )}
        </div>

        <div className="row mt-4">
          {skills.map((item) => {
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
                            : 0 +
                              item?.cost +
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

        
      </div>

    
    </MainLayout>
  );
}
