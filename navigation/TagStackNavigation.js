import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TagsScreen from "../screens/TagsScreen";
import TagsDetailedScreen from "../screens/TagsDetailedScreen";
import { getLotsByTag } from "../api/api";
import LotsStackNavigation from "./LotsStackNavigation";
import BackNavigation from "../components/BackNavigation";

const Stack = createNativeStackNavigator();

export default function TagStackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="AllTags"
                component={TagsScreen}
            />
            <Stack.Screen
                name="TagsDetailed"
                children={(props) => <TagsDetailedScreen {...props} />}
            />
            <Stack.Screen
                name="TagLots"
                children={(props) => <LotsStackNavigation navigationButton={<BackNavigation navigation={props.navigation} />} {...props} lotsApiFunction={getLotsByTag} />}
            />
        </Stack.Navigator>
    )
}