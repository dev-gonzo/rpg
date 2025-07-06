"use client";

type Props = {
  list?: any[];
  message: string;
  test?: boolean;
};

export const AlertListEmpty = ({ list, message, test }: Props) => {
  return (
    <>
      {list?.length === 0 && !test && (
        <div className="col-12 col-md-12 px-4">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};
