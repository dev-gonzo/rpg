"use client";

import { useGet } from "@/app/hooks/fetch/useGet";
import { useEffect } from "react";

type Props = {
  total: number;
};

export const AttributesTotal = ({ total }: Props) => {
  return (
    <div className="col-12 text-center">
      <span>Total Gasto: {total}</span>
    </div>
  );
};
