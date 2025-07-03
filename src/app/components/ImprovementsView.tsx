type AttributesViewProps = {
  label: string;
  valueKit?: number;
  value?: number;
};

export function ImprovementsView({
  label,
  valueKit,
  value,
}: AttributesViewProps) {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container">
          <div className="row align-items-center my-2">
            <div className="col-6">
              <strong>{label}</strong>
              <br />
              <small>
                {valueKit ?? 0} / {value ?? 0} | Kit / Custo
              </small>
            </div>
            <div className="col-3  text-center d-flex justify-content-end flex-column"></div>
            <div className="col-3 text-center d-flex justify-content-end flex-column">
              <span className="h1">{(valueKit ?? 0) + (value ?? 0)}</span>
              <small>Total</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
