import { create } from "zustand";

type Store = {
  isMaster: boolean;
  isControl: boolean;
  setEdit: (payload: { isControl: boolean; isMaster: boolean }) => void;
};

export const useCharacterPermission = create<Store>((set) => ({
  isControl: false,
  isMaster: false,
  setEdit: ({ isControl, isMaster }) =>
    set(() => ({ isControl, isMaster })),
}));
