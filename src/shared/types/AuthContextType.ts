import { User } from "./User";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
};
