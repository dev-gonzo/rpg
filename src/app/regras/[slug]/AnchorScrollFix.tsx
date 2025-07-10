"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Title from "@/app/components/Title";

export default function AnchorScrollFix(doc: any) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      // Função que tenta rolar para a âncora
      const scrollToHash = () => {
        const id = window.location.hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      // Primeira tentativa imediata
      if (!scrollToHash()) {
        // Tenta novamente após delay(s) - útil para conteúdo SSR/assíncrono
        const intervalId = setInterval(() => {
          if (scrollToHash()) clearInterval(intervalId);
        }, 100);
        // Limpa o intervalo após 2 segundos
        setTimeout(() => clearInterval(intervalId), 2000);
      }
    }
  }, [pathname]); // Executa toda vez que o pathname muda

  return (
    <>
      <Title>{doc.title}</Title>
    </>
  );
}
