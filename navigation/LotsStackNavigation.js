import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LotDetailsScreen from "../screens/LotDetailsScreen";
import LotsScreen from "../screens/LotsScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileStackNavigation from "./ProfileStackNavigation";
import BackNavigation from "../components/BackNavigation";

const Stack = createNativeStackNavigator();

export default function LotsStackNavigation({ route, lotsApiFunction, navigationButton, userId }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                unmountOnBlur: true,

            }}
            initialRouteName="Lots"
        >
            <Stack.Screen
                name="Lots"
                children={(props) => {
                    if (props.navigation.getParent().getState().routeNames.includes("TagsDetailed")) {
                        props.route.params = { lotsApiFunction: route.params.lotsApiFunction, tag: route.params.tag }
                    }
                    if (userId) {
                        console.log(userId)
                        props.route.params = { userId: userId }
                    }
                    return <LotsScreen navigationButton={navigationButton} {...props} lotsApiFunction={lotsApiFunction} />
                }}
            />
            <Stack.Screen
                name="LotDetailes"
                component={LotDetailsScreen}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
            />
            <Stack.Screen
                name="Profile"
                children={(props) => <ProfileStackNavigation navigationButton={<BackNavigation navigation={props.navigation} />} {...props} />}
            />
        </Stack.Navigator>
    )
}