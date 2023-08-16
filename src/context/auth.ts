import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export type SignInData = {
  payload: { email: string; password: string };
  cb: () => void;
};

export interface AuthContextProps {
  signed: boolean;
  loading: boolean;
  token?: string;
  user?: User;

  signIn: (params: SignInData) => void;
  signOut: (cb: () => void) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
