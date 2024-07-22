import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAllLots, getFavoriteLots } from "../api/api";
import LotsStackNavigation from "./LotsStackNavigation";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import OpenDrawer from "../components/OpenDrawer";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'black'
                },
                tabBarInactiveTintColor: 'white',
                unmountOnBlur: true
            }}
        >
            <Tab.Screen
                name="All lots"
                children={(props) => <LotsStackNavigation navigationButton={<OpenDrawer navigation={props.navigation} />} lotsApiFunction={getAllLots} />}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Favorites"
                children={(props) => <LotsStackNavigation {...props} navigationButton={<OpenDrawer navigation={props.navigation} />} lotsApiFunction={getFavoriteLots} />}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="favorite-border" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}