import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";
import { Loading } from "./src/components/Loading";

import { THEME } from "./src/global/theme";
import { AuthContextProvider } from "./src/context/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
