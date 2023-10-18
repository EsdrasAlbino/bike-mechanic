import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AppRoutes } from "./app.routes";
import { ScanCode } from "../pages/ScanCode";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { THEME } from "../global/theme";

const Tab = createBottomTabNavigator();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: false,
};

const RenderIconHome = ({ focused }) => {
  return focused ? (
    <Feather name="home" size={24} color={THEME.bg.orange} />
  ) : (
    <Feather name="home" size={24} color="gray" />
  );
};

const RenderIconCamera = ({ focused }) => {
  return focused ? (
    <AntDesign name="camerao" size={24} color={THEME.bg.orange} />
  ) : (
    <AntDesign name="camerao" size={24} color="gray" />
  );
};

export function TabsApp() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={AppRoutes}
        options={{
          tabBarIcon: RenderIconHome,
        }}
      />
      <Tab.Screen
        name="ScanCode"
        component={ScanCode}
        options={{
          tabBarIcon: RenderIconCamera,
        }}
      />
    </Tab.Navigator>
  );
}
