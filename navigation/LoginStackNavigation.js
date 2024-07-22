import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from "../screens/LogInScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function LoginStackNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="LogIn"
                component={LogInScreen}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
            />
        </Stack.Navigator>
    );
}