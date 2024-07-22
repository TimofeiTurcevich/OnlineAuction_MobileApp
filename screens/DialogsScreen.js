import React, { useState, useCallback, useEffect, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Dialog from "../components/Dialog";
import { getChats } from "../api/api";
import OpenDrawer from "../components/OpenDrawer";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function DialogsScreen(navigation) {
    const { userToken, userId } = useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const [chats, setChats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getChatsFromApi = useCallback(async () => {
        setIsLoading(true);
        setChats(await getChats(userId, userToken))
        setIsLoading(false);
    }, [])
    console.log(chats)

    useEffect(() => {
        getChatsFromApi();
    }, [])

    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.app}
        >
            <OpenDrawer {...navigation} />
            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="loader" size={100} color="black" />
                    <Text style={{ fontSize: 24 }}>Loading</Text>
                </View>
                :
                <FlatList
                    data={chats}
                    style={{ flexGrow: 1, width: '100%', paddingTop: insets.top }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, key }) =>
                        <Dialog {...navigation} chat={item} />
                    }
                />
            }
        </LinearGradient>
    );
}

const styles =
    StyleSheet.create({
        app: {
            flex: 1,
            alignItems: 'center'
        }
    });