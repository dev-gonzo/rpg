"use client";

type Props = {
  list: any[];
  message: string;
};

export const AlertListEmpty = ({ list, message }: Props) => {
  return (
    <>
      {list?.length === 0 && (
        <div className="col-12 col-md-6 px-4">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};
