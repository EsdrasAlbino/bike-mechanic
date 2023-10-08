import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../pages/SignUp';
import { SignIn } from '../pages/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen
                name='SignIn'
                component={SignIn}
            />

            <Screen
                name='SignUp'
                component={SignUp}
            />
        </Navigator>
    )
}