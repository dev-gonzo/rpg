type AttributesViewProps = {
  label: string;
  abbreviation: string;
  value?: number;
  valueMod?: number | null;
};

export function AttributesView({
  label,
  abbreviation,
  value,
  valueMod,
}: AttributesViewProps) {
  return (
    <div className="col-12 col-md-6">
      <div className="card bg-gray">
        <div className="container-fluid">
          <div className="row align-items-center my-2">
            <div className="col-6">
              <strong>{label}</strong>
              <br />({abbreviation}) {valueMod && <small>{`[MOD.]`}</small>}
            </div>
            <div className="col-2">
              <h1>
                {value} {valueMod && <small>{`[${valueMod}]`}</small>}
              </h1>
            </div>
            <div className="col-4 text-end d-flex justify-content-end flex-column pe-3">
              <h1>{value ? ((valueMod ? valueMod : 0) + value) * 4 : 0} %</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
