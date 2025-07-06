"use client";

// hooks/useUploadImage.ts
export function useUploadImage() {
  const upload = async (
    file: File,
    characterId: string
  ): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("characterId", characterId);

    try {
      const res = await fetch("/api/characters/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar imagem.");
      }

      const data = await res.json();
      return data.imageUrl as string;
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      return null;
    }
  };

  return { upload };
}
