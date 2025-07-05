// // components/form/DatePicker.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

// type DatePickerProps<T extends FieldValues> = {
//   name: string;
//   label: string;
//   md?: number;
//   control: Control<any>;
//   errors?: FieldErrors<T>;
//   defaultValue?: string; // ISO yyyy-mm-dd
// };

// function isoToBr(isoDate: string) {
//   const [y, m, d] = isoDate.split("-");
//   return `${d}/${m}/${y}`;
// }

// function brToIso(brDate: string) {
//   const [d, m, y] = brDate.split("/");
//   if (!d || !m || !y) return "";
//   return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
// }

// function applyDateMask(value: string) {
//   let v = value.replace(/\D/g, "");

//   if (v.length > 8) v = v.slice(0, 8);

//   if (v.length > 4) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
//   else if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;

//   return v;
// }

// export function DatePicker<T extends FieldValues>({
//   name,
//   label,
//   md = 12,
//   control,
//   errors,
//   defaultValue,
// }: DatePickerProps<T>) {
//   const [textValue, setTextValue] = useState("");
//   const errorMessage = errors && errors[name]?.message;

//   useEffect(() => {
//     if (defaultValue) {
//       console.log("dp",defaultValue);
//       setTextValue(isoToBr(defaultValue));
//     }
//   }, [defaultValue]);

//   return (
//     <div className={`mb-3 col-md-${md}`}>
//       <label htmlFor={`${name}-text`} className="form-label">
//         {label}
//       </label>
//       <Controller
//         name={name}
//         control={control}
//         defaultValue={defaultValue || ""}
//         render={({ field }) => {
//           console.log("dp",textValue);
//           return (
//             <input
//               id={`${name}-text`}
//               type="text"
//               autoComplete="off"
//               placeholder="dd/mm/aaaa"
//               className={`form-control bg-dark text-light border-secondary ${
//                 errorMessage ? "is-invalid" : ""
//               }`}
//               value={textValue}
//               onChange={(e) => {
//                 const masked = applyDateMask(e.target.value);
//                 setTextValue(masked);

//                 if (masked.length === 10) {
//                   const iso = brToIso(masked);
//                   field.onChange(iso);
//                 } else {
//                   field.onChange("");
//                 }
//               }}
//             />
//           );
//         }}
//       />
//       {errorMessage && (
//         <div className="invalid-feedback">
//           {errorMessage as React.ReactNode}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Controller, Control, FieldErrors, FieldValues } from "react-hook-form";

type DatePickerProps<T extends FieldValues> = {
  name: string;
  label: string;
  md?: number;
  control: Control<any>;
  errors?: FieldErrors<T>;
  defaultValue?: string; // ISO yyyy-mm-dd
};

function isoToBr(isoDate: string) {
  if (!isoDate) return "";
  // Pega só a parte da data antes do "T"
  const datePart = isoDate.split("T")[0];
  const parts = datePart.split("-");
  if (parts.length !== 3) return "";
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

function brToIso(brDate: string) {
  const [d, m, y] = brDate.split("/");
  if (!d || !m || !y) return "";
  return `${y.padStart(4, "0")}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function applyDateMask(value: string) {
  let v = value.replace(/\D/g, "");

  if (v.length > 8) v = v.slice(0, 8);

  if (v.length > 4) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
  else if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;

  return v;
}

export function DatePicker<T extends FieldValues>({
  name,
  label,
  md = 12,
  control,
  errors,
  defaultValue,
}: DatePickerProps<T>) {
  const [textValue, setTextValue] = useState("");
  const errorMessage = errors && errors[name]?.message;

  return (
    <div className={`mb-3 col-md-${md}`}>
      <label htmlFor={`${name}-text`} className="form-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field }) => {
          // Sincroniza o estado local com o valor do RHF
          useEffect(() => {
            if (field.value) {
              setTextValue(isoToBr(field.value));
            } else {
              setTextValue("");
            }
          }, [field.value]);

          return (
            <input
              id={`${name}-text`}
              type="text"
              autoComplete="off"
              placeholder="dd/mm/aaaa"
              className={`form-control bg-dark text-light border-secondary ${
                errorMessage ? "is-invalid" : ""
              }`}
              value={textValue}
              onChange={(e) => {
                const masked = applyDateMask(e.target.value);
                setTextValue(masked);

                if (masked.length === 10) {
                  const iso = brToIso(masked);
                  field.onChange(iso);
                } else {
                  field.onChange("");
                }
              }}
            />
          );
        }}
      />
      {errorMessage && (
        <div className="invalid-feedback">{errorMessage as React.ReactNode}</div>
      )}
    </div>
  );
}

