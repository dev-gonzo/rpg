type Props = {
  onChange: (checked: boolean) => void;
  value: boolean;
};

export const ButtonSwitch = ({ onChange, value }: Props) => {
  return (
    <div
      className="form-check form-switch d-flex justify-content-end"
      style={{ cursor: "pointer" }}
    >
      <input
        className={`form-check-input ${
          value ? "bg-dark border-dark" : "bg-secondary border-secondary"
        }`}
        style={{ cursor: "pointer" }}
        type="checkbox"
        id="flexSwitchCheckDefault"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};
