import React, { useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, Text, View } from "react-native";
import Tag from "../components/Tag";
import { getAllTags } from "../api/api";
import OpenDrawer from "../components/OpenDrawer";
import { Feather } from "@expo/vector-icons";

export default function TagsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const openDetailed = (tag) => {
        navigation.navigate("TagsDetailed", { tag: tag })
    }

    const getTags = useCallback(async () => {
        setIsLoading(true);
        setTags(await getAllTags())
        setIsLoading(false)
    }, [])

    useEffect(() => {
        getTags();
    }, [])

    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.container}
        >
            <OpenDrawer navigation={navigation} />

            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="loader" size={100} color="black" />
                    <Text style={{ fontSize: 24 }}>Loading</Text>
                </View>
                :
                <ScrollView
                    style={{ flexGrow: 1, width: '95%', paddingTop: insets.top }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <Text style={styles.text}>Tags</Text>

                    <View style={styles.tagsRow}>
                        {tags.map((i) => {
                            return (
                                <Tag key={i.id} tag={i} length={tags.length} navigation={navigation} openDetailed={openDetailed} />
                            );
                        })}
                    </View>
                </ScrollView>
            }

        </LinearGradient>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        text: {
            fontSize: 32,
            width: '100%',
            textAlign: 'center'
        },
        tagsRow: {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
        }
    });