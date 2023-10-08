import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { RegisterOrder } from "../pages/RegisterOrder";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
                name='Home'
                component={Home}
            />

            <Screen
                name='New'
                component={RegisterOrder}
            />

            <Screen
                name='Details'
                component={Details}
            />
        </Navigator>
    )
}