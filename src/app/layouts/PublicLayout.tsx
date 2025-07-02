import { ReactNode } from "react";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 p-4">{children}</main>
      <Footer />
    </div>
  );
}
