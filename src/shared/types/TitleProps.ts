export type TitleProps = {
  children: React.ReactNode;
  link?: {
    path: string;
    label: string;
  };
  className?: string;
  back?: boolean;
  home?: boolean;
  control?: boolean;
  comp?: React.ReactNode;
};
