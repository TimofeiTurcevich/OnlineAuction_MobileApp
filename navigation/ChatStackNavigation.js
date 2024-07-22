import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from "../screens/ChatScreen";
import DialogsScreen from "../screens/DialogsScreen";
import LotDetailsScreen from "../screens/LotDetailsScreen";
import ProfileStackNavigation from "./ProfileStackNavigation";
import BackNavigation from "../components/BackNavigation";

const Stack = createNativeStackNavigator();

export default function ChatStackNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Chats"
                component={DialogsScreen}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
            />
            <Stack.Screen
                name="Profile"
                children={(props) => <ProfileStackNavigation navigationButton={<BackNavigation navigation={props.navigation} />} {...props} />}
            />
            <Stack.Screen
                name="LotDetailes"
                component={LotDetailsScreen}
            />
        </Stack.Navigator>
    )
}