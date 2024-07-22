import React, { useCallback, useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, FlatList, View, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Lot from "../components/Lot";
import SearchFilterLots from "../components/SearchFIlterLots";
import OpenDrawer from "../components/OpenDrawer";
import { Feather } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";

export default function LotsScreen({ navigation, route, lotsApiFunction, navigationButton }) {
    const { userToken, userId } = useContext(AuthContext)
    const tag = route.params && route.params.tag ? route.params.tag : undefined
    const insets = useSafeAreaInsets();
    const [lots, setLots] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [newDataLoading, setNewDataLoading] = useState(false);
    const [sortBy, setSortBy] = useState(
        {
            id: 0,
            value: "dateAsc",
            fillColor: 'rgba(255, 145, 193, 1)',
            style: {
                marginVertical: 5
            },
            textStyle: { textDecorationLine: "none", color: 'white', fontSize: 20 },
            size: 35,
            text: 'By end time decrement',
            isChecked: true
        }
    )
    const [title, setTitle] = useState("")
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const changeTitle = (titleValue) => {
        if (title == titleValue) {
            setTitle(title == "" ? undefined : "")
            return;
        }
        setTitle(titleValue)
    }

    const changeSortBy = (sortBy) => {
        setSortBy(sortBy)
    }

    const getLots = async () => {
        if (lots.length > 0 && page == 0) {
            return;
        }

        lots.length == 0 ? setIsLoading(true) : setNewDataLoading(true)
        data = await lotsApiFunction(sortBy, title ? title : "", page, userToken, (route.params ? route.params.userId : userId), (tag || (route.params && route.params.userId)))
        setTotalPages(data.totalPages)
        setLots(lots.length > 0 ? [...lots, ...data.content] : data.content)
        // setLots(lotsApiFunction == undefined ?
        //     await route.params.lotsApiFunction(tag || route.params.userId)
        //     :
        //     route.params && route.params.userId ?
        //         await lotsApiFunction(route.params.userId)
        //         :
        //         await lotsApiFunction(sortBy, title))
        setIsLoading(false)
        setNewDataLoading(false)
    }

    const getNewLots = async () => {
        setIsLoading(true)
        setPage(0)
        data = await lotsApiFunction(sortBy, title ? title : "", 0, userToken, userId, (tag || (route.params && route.params.userId)))
        setTotalPages(data.totalPages)
        setLots(data.content)
        setIsLoading(false)
    }

    useEffect(() => {
        getLots();
    }, [page, navigation])

    useEffect(() => {
        getNewLots()
    }, [title])

    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.container}
        >
            {navigationButton}

            <SearchFilterLots sortBy={sortBy} changeSortBy={changeSortBy} changeTitle={changeTitle} />

            {!isLoading && lots.length == 0 &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>There is no lots yet</Text>
                </View>
            }

            {lots.length > 0 && !isLoading &&
                <FlatList
                    data={lots}
                    style={{ flexGrow: 1, width: '100%', paddingTop: insets.top }}
                    contentContainerStyle={{ alignItems: 'center', paddingBottom: insets.bottom }}
                    scrollIndicatorInsets={{ right: 1 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, key }) =>
                        <Lot navigation={navigation} lot={item} />
                    }
                    onEndReached={() => {
                        if (totalPages > (page + 1)) {
                            setPage(page + 1)
                        }
                    }}
                    ListFooterComponent={
                        <View>
                            {newDataLoading &&
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Feather name="loader" size={50} color="black" />
                                    <Text style={{ fontSize: 24 }}>Loading</Text>
                                </View>
                            }
                        </View>

                    }
                    ListFooterComponentStyle={{ paddingBottom: insets.bottom }}
                />
            }
            {isLoading &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="loader" size={100} color="black" />
                    <Text style={{ fontSize: 24 }}>Loading</Text>
                </View>
            }
        </LinearGradient>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        }
    });