import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";



import { AuthContext } from "../context/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { userData } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {userData ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
