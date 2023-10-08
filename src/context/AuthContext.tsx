import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { auth } from "../../firebase.config";

type AuthContextType = {
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const isLogged = async () => {
    onAuthStateChanged(auth, (user) => {
      setUserData(user);
      console.log("usere", user);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    isLogged();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
