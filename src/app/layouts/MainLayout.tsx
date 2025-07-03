import { ReactNode } from "react";
import Menu from "../components/menu/Menu";
import Footer from "../components/Footer";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}
