import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { Loading } from "./src/components/Loading";

import { AuthContextProvider } from "./src/context/AuthContext";
import { THEME } from "./src/global/theme";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
        <StatusBar style="auto" />
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
