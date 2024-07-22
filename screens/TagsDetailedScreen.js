import React, { useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Dimensions, ScrollView, Text, View, TouchableOpacity } from "react-native";
import Tag from "../components/Tag";
import BackNavigation from "../components/BackNavigation";
import { getSubTags } from "../api/api";
import { Feather } from "@expo/vector-icons";

export default function TagsDetailedScreen({ navigation, route, lotsApiFunction }) {
    const insets = useSafeAreaInsets();
    const [tags, setTags] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const openLots = (tag) => {
        navigation.goBack()
        navigation.navigate("TagLots", { lotsApiFunction: lotsApiFunction, tag: tag })
    }

    const getTags = useCallback(async () => {
        setIsLoading(true);
        setTags(await getSubTags(route.params.tag.id))
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
            <BackNavigation navigation={navigation} />

            {isLoading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="loader" size={100} color="black" />
                    <Text style={{ fontSize: 24 }}>Loading</Text>
                </View>
                :
                < ScrollView
                    style={{ flexGrow: 1, width: '95%', paddingTop: insets.top }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <Text style={styles.text} >{route.params.tag.title}</Text>

                    <TouchableOpacity
                        style={[styles.tag, { marginRight: 0, width: '100%', marginTop: '1%' }]}
                        onPress={() => openLots(route.params.tag)}
                    >
                        <View style={{ flex: 1.2, justifyContent: 'center', marginLeft: 10 }}>
                            <Text style={[styles.text, { color: 'white' }]}>Show all lots by selected tag, without choosing subtag</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.tagsRow}>
                        {tags.map((i) => {
                            return (
                                <Tag key={i.id} tag={i} length={tags.length} navigation={navigation} openLots={openLots} />
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
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        tagsRow: {
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        tag: {
            paddingVertical: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            minHeight: Dimensions.get('screen').height * 0.13,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 1)',
            marginBottom: '2%',
            flexDirection: 'row'
        }
    });