import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getLotsByUserId } from "../api/api";
import ProfileScreen from "../screens/ProfileScreen";
import LotsStackNavigation from "./LotsStackNavigation";
import BackNavigation from "../components/BackNavigation";
import OpenDrawer from "../components/OpenDrawer";

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigation({ route, userId, navigationButton }) {
    console.log(route.params)
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="ProfileDetails"
                children={(props) => <ProfileScreen navigationButton={navigationButton} {...props} providedUserId={userId || route.params.userId} />}
            />
            <Stack.Screen
                name="UserLots"
                children={(props) => <LotsStackNavigation navigationButton={<BackNavigation navigation={props.navigation} />} {...props} lotsApiFunction={getLotsByUserId} userId={userId || route.params.userId} />}
            />
        </Stack.Navigator>
    )
}