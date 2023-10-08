import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { userData, isLogged } = useContext(AuthContext);

  useEffect(() => {
    //isLogged();
  }, []);

  return (
    <NavigationContainer>
      {userData ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
