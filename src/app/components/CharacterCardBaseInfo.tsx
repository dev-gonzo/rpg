
type CharacterCardBasicInfoProps = {
  label: string;
  value: number;
  valueCurrent: number;
  control?: boolean;
  isNotCompared?: boolean;
};

export const CharacterCardBasicInfo = ({
  label,
  value,
  valueCurrent,
  control = true,
  isNotCompared = false,
}: CharacterCardBasicInfoProps) => {
  return (
    <div className="card bg-dark text-light shadow-sm border-2" style={{width: "45%"}} >
      <div className="card-body text-center d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title">
          {!isNotCompared ? `${valueCurrent}` : ""}
          {!isNotCompared ? ` / ${value}` : value}
        </h5>
        <small className="card-subtitle mb-2 text-body-light" style={{fontSize: "9px"}}>{label}</small>
      </div>
    </div>
  );
};
