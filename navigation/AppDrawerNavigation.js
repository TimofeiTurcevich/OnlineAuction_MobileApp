import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigation";
import TagStackNavigation from "./TagStackNavigation";
import CreateLotScreen from "../screens/CreateLotScreen";
import { AuthContext } from "../context/AuthContext";
import LoginStackNavigation from "./LoginStackNavigation";
import ProfileStackNavigation from "./ProfileStackNavigation";
import ChatStackNavigation from "./ChatStackNavigation";
import LotsStackNavigation from "./LotsStackNavigation";
import { getAllLots, getLotsHistory } from "../api/api";
import OpenDrawer from "../components/OpenDrawer";
import LotsScreen from "../screens/LotsScreen";


const Drawer = createDrawerNavigator();

export default function AppDrawerNavigation() {
    const { userToken, userId } = useContext(AuthContext);

    return (

        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    unmountOnBlur: true,
                    drawerLabelStyle: {
                        fontSize: 18
                    }
                }}
            >
                {userToken ?
                    <Drawer.Screen
                        name="Home"
                        component={BottomTabNavigator}

                    />
                    :


                    <Drawer.Screen
                        name="Home"
                        children={(props) => <LotsScreen {...props} navigationButton={<OpenDrawer navigation={props.navigation} />} lotsApiFunction={getAllLots} />}
                    />
                }

                <Drawer.Screen name="Tags" component={TagStackNavigation} />
                {userToken && <Drawer.Screen name="Messages" component={ChatStackNavigation} />}
                {userToken && <Drawer.Screen name="Create lot" component={CreateLotScreen} />}
                {userToken && <Drawer.Screen
                    name="Placed bets"
                    children={(props) => <LotsStackNavigation navigationButton={<OpenDrawer navigation={props.navigation} />} lotsApiFunction={getLotsHistory} />}
                />}
                {userToken ?
                    <Drawer.Screen name="Profile" children={(props) => <ProfileStackNavigation navigationButton={<OpenDrawer navigation={props.navigation} />} {...props} userId={userId} />} />
                    :
                    <Drawer.Screen
                        name="Log in"
                        component={LoginStackNavigation}

                    />
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );
}