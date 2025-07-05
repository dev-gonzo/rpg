"use cliente";

type Props = {
  col?: number;
  colSm?: number;
  label: string;
  content: string | number | null | undefined;
  zeroNull?: boolean;
};

export const FieldView = ({
  col = 12,
  colSm = 12,
  label,
  content,
  zeroNull = false,
}: Props) => {
  return (
    <div className={`col-${colSm} col-md-${col} d-flex flex-column my-1`}>
      <label style={{ fontSize: 10 }}>{label}</label>
      <span
        className={`${typeof content == "number" ? "text-center fs-3" : ""} ${zeroNull && content == 0 ? "text-secondary" : ""}`}
      >
        {zeroNull && content == 0 ? "Ø" : content ?? <>&nbsp;</>}
      </span>
      <hr className="my-2 fs-3" />
    </div>
  );
};
