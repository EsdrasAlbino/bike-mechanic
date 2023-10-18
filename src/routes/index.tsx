import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Loading } from "../components/Loading";
import { AuthRoutes } from "./auth.routes";
import { TabsApp } from "./bottom.routes";

export function Routes() {
  const [userData, setUserData] = useState<FirebaseAuthTypes.User>();
  const [isLoading, setIsLoading] = useState(false);

  const isLogged = async () => {
    setIsLoading(true);
    setUserData(null);
    auth().onAuthStateChanged((user) => {
      setUserData(user);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <NavigationContainer>
      {isLoading && <Loading />}
      {userData ? <TabsApp /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
