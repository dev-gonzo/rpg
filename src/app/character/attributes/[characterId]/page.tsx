"use client";

import Title from "@/app/components/Title";
import MainLayout from "@/app/layouts/MainLayout";
import { useAttributesView } from "./useAttributesView";
import { AttributeResponse } from "@/shared/types/character/AttributesResponse";

export default function Improvements() {
  const { data, loading, characterId } = useAttributesView();

  return (
    <MainLayout>
      <Title link={{label: "Editar", path: `/character-edit/attributes/${characterId}`}}>Atributos</Title>

      <div className="container">
        <div className="row gap-3">
          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center my-2">
                  <div className="col-6 ">
                    Constituição <br />
                    (CON)
                  </div>
                  <div className="col-3">
                    <h1>{data?.CON}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.CON ? data?.CON * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Força <br />
                    (FR)
                  </div>
                  <div className="col-3">
                    <h1>{data?.FR}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.FR ? data?.FR * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Destreza <br />
                    (DEX)
                  </div>
                  <div className="col-3">
                    <h1>{data?.DEX}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.DEX ? data?.DEX * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Agilidade <br />
                    (AGI)
                  </div>
                  <div className="col-3">
                    <h1>{data?.AGI}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.AGI ? data?.AGI * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Inteligência <br />
                    (INT)
                  </div>
                  <div className="col-3">
                    <h1>{data?.INT}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.INT ? data?.INT * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Força de Vontade <br />
                    (WILL)
                  </div>
                  <div className="col-3">
                    <h1>{data?.WILL}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.WILL ? data?.WILL * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Percepção <br />
                    (PER)
                  </div>
                  <div className="col-3">
                    <h1>{data?.PER}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.PER ? data?.PER * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="card bg-gray">
              <div className="container-fluid">
                <div className="row align-items-center  my-2">
                  <div className="col-6 ">
                    Carisma <br />
                    (CAR)
                  </div>
                  <div className="col-3">
                    <h1>{data?.CAR}</h1>
                  </div>
                  <div className="col-3">
                    <h1>{data?.CAR ? data?.CAR * 4 : 0} %</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
