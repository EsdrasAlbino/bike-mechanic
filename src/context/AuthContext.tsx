import { createContext, useState } from "react";
import { Loading } from "../components/Loading";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

type AuthContextType = {
  value: number;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  let value = 0;

  return (
    <AuthContext.Provider
      value={{
        value,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
