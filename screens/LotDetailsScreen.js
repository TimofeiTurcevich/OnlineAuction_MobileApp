import React, { useState, useRef, useCallback, useEffect, useContext } from "react";
import { View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LinearGradient } from "expo-linear-gradient";
import CarouselItem from "../components/CarouselItem";
import Countdown from "../components/Countdown";
import CarouselPagination from "../components/CarouselPagination";
import BetHistoryItem from "../components/BetHistoryItem";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackNavigation from "../components/BackNavigation";
import { addToFavorite, checkIfInFavorite, deleteLot, getDialogId, getLotDetails, placeABet, removeFromFavorite } from "../api/api";
import { Feather } from '@expo/vector-icons';
import { AuthContext } from "../context/AuthContext";

const getImageUrl = "http://192.168.0.123:8082/images/"

export default function LotDetailsScreen({ navigation, route }) {
    const { userToken, userId } = useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const [images, setImages] = useState([]);
    const [lot, setLot] = useState({})
    const [indexSelected, setIndexSelected] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalIndex, setModalIdex] = useState(0);
    const [scrolling, setScrolling] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [betCount, setBetCount] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const carouselRef = useRef(null);
    const paginationRef = useRef(null);

    const changePhoto = touched => {
        if (touched === indexSelected || images.length == 0) return;

        setIndexSelected(touched)
        carouselRef.current.scrollToIndex({ index: touched })
    };

    const openImageFullScreen = id => {
        if (!scrolling) {
            setModalVisible(true)
            setModalIdex(id - 1)
        }
    }

    const getDetails = useCallback(async () => {
        setIsLoading(true)

        setLot(await getLotDetails(route.params.lotId, userToken))
        setFavorite(await checkIfInFavorite(userId, route.params.lotId, userToken))
        await getLotDetails(route.params.lotId, userToken).then(res => {
            setImages(res.lotImages.map((i, index) => {
                return {
                    id: index + 1,
                    image: getImageUrl + i.fileName
                }
            }))
        })
        setIsLoading(false)
    }, [])


    const favoriteHandler = async () => {
        setIsLoading(true)
        setFavorite(
            favorite ?
                await removeFromFavorite(userId, lot.id, userToken)
                :
                await addToFavorite(userId, lot.id, userToken)
        )
        setIsLoading(false)
    }

    const bet = async () => {
        if (!betCount || parseInt(betCount) < (lot.bets.length > 0 ? lot.bets.at(lot.bets.length - 1).bet : lot.startPrice)) {
            Alert.alert("Warning", "Bet is absent or less than start price or current bet")
            return;
        }
        setIsLoading(true)
        setLot(await placeABet(userId, lot.id, betCount, userToken))
        setBetCount()
        setIsLoading(false)
    }

    const deleteLotApi = async () => {

        if (await deleteLot(lot.id, userToken)) {
            navigation.getParent().reset({
                routes: [
                    { name: "Home" }
                ]
            })
        }
    }

    const openDialog = async () => {
        const chatId = await getDialogId(userId, lot.id, userToken)
        navigation.navigate("Chat", { dialogId: chatId })
    }

    useEffect(() => {
        getDetails();
    }, [])


    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={{ flex: 1 }}
        >
            <BackNavigation navigation={navigation} />
            <Modal visible={isLoading} transparent={true} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <Feather name="loader" size={100} color="white" />
                    <Text style={{ fontSize: 24, color: 'white' }}>Loading</Text>
                </View>
            </Modal>
            {!lot.title ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="loader" size={100} color="black" />
                    <Text style={{ fontSize: 24 }}>Loading</Text>
                </View>
                :
                <KeyboardAwareScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center', flexGrow: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
                    onScrollBeginDrag={() => setScrolling(true)}
                    onScrollEndDrag={() => setScrolling(false)}
                >
                    <Text style={[styles.text, { fontSize: 35, width: '100%', }]}>{lot.title}</Text>

                    <FlatList
                        data={images}
                        style={{ width: '90%', marginBottom: 2 }}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, key }) => <CarouselItem item={item} open={openImageFullScreen} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        ref={carouselRef}
                        onScrollBeginDrag={() => setScrolling(true)}
                        onScrollEndDrag={() => setScrolling(false)}
                        onMomentumScrollEnd={(event) => {
                            if (images.length == 0) return;
                            const index = Math.floor(
                                Math.floor(event.nativeEvent.contentOffset.x) /
                                Math.floor(event.nativeEvent.layoutMeasurement.width) + 0.5
                            )
                            setIndexSelected(index)
                            paginationRef.current.scrollToIndex({ index: index })
                        }}
                    />

                    <Modal visible={modalVisible} transparent={true}>
                        <AntDesign
                            name="closecircleo"
                            size={30} color="white"
                            style={{ position: 'absolute', zIndex: 2, left: '92%', paddingTop: insets.top }}
                            onPress={() => setModalVisible(false)}
                        />
                        <ImageViewer imageUrls={images.map(i => {
                            return {
                                url: i.image
                            }
                        })} index={modalIndex} />
                    </Modal>

                    <FlatList
                        data={images}
                        style={{ maxWidth: '90%', height: Dimensions.get('screen').height * 0.11, marginBottom: 2 }}
                        keyExtractor={(item) => item.id}
                        onScrollBeginDrag={() => setScrolling(true)}
                        onScrollEndDrag={() => setScrolling(false)}
                        renderItem={({ item, key }) =>
                            <CarouselPagination item={item} changePhoto={changePhoto} indexSelected={indexSelected} scrolling={scrolling} />
                        }
                        horizontal
                        ref={paginationRef}
                    />

                    <View style={styles.betDetailsContainer}>

                        <View style={styles.betDetails}>
                            <Text style={[styles.text, { fontSize: 18, width: '49%', marginRight: 4 }]}>{lot.bets && (lot.bets.length > 0 ? "Current bet: " + lot.bets.at(lot.bets.length - 1).bet : "Start price: " + lot.startPrice)}$</Text >
                            <Text style={[styles.text, { fontSize: 18, width: '49%' }]}>Ends in: <Countdown endDate={lot.endDate} /></Text>
                        </View>

                        {lot.seller.id != userId &&
                            <View style={styles.betDetails}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={lot.bets && (lot.bets.length > 0 ? lot.bets.at(lot.bets.length - 1).bet : lot.startPrice) + "$"}
                                    keyboardType="number-pad"
                                    value={betCount}
                                    onChangeText={(betCount) => setBetCount(betCount)}
                                />

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => bet()}
                                >
                                    <Text style={[styles.text, { fontSize: 26, color: 'white' }]}>Place a bet</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                    <View style={[styles.betDetailsContainer, { padding: 5, justifyContent: 'center' }]}>
                        <Text style={{ fontSize: 24, textAlign: 'center' }}>{lot.description}</Text>
                    </View>

                    {lot.seller.id != userId &&
                        <View style={styles.icons}>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => favoriteHandler()}
                            >
                                {favorite ?
                                    <MaterialIcons name="favorite" size={60} color="black" />
                                    :
                                    <MaterialIcons name="favorite-border" size={60} color="black" />}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.message}
                                onPress={() => openDialog()}
                            >
                                <Entypo name="new-message" size={60} color="black" />
                                <Text style={[styles.text, { fontSize: 28, flex: 2 }]}>Send a message</Text>
                            </TouchableOpacity>
                        </View>


                    }

                    {lot.seller.id == userId &&
                        <View style={styles.icons}>
                            <TouchableOpacity
                                style={styles.message}
                                onPress={() => deleteLotApi()}
                            >
                                <AntDesign name="delete" size={60} color="red" />
                                <Text style={[styles.text, { fontSize: 28, flex: 2, color: 'red' }]}>Delete lot</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <View style={styles.betHistoryContainer}>
                        <Text style={[styles.text, { width: '100%', fontSize: 30, marginBottom: 5, color: 'white' }]}>Bet History</Text>

                        <BetHistoryItem number={'№'} name={'Name'} bet={'Bet'} />

                        {!lot.bets || lot.bets.length == 0 ?
                            <Text style={[styles.text, { color: 'white', width: '100%', fontSize: 24 }]}>No bet was made yet</Text>
                            :
                            lot.bets && lot.bets.map((i, index) => {
                                return (
                                    <BetHistoryItem key={i.id} number={index + 1} name={i.user.lastName + " " + i.user.firstName} bet={i.bet} />
                                )
                            })
                        }

                    </View>
                </ KeyboardAwareScrollView>
            }
        </LinearGradient >
    );
}

const styles =
    StyleSheet.create({
        text: {
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        betDetailsContainer: {
            minHeight: Dimensions.get('screen').height * 0.10,
            width: '90%',
            borderRadius: 25,
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            marginBottom: 4
        },
        betDetails: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        },
        input: {
            width: '49%',
            textAlign: 'center',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            borderRadius: 25,
            marginRight: 4,
            fontSize: 24
        },
        button: {
            width: '49%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 25,
            justifyContent: 'center'
        },
        icons: {
            height: Dimensions.get('screen').height * 0.075,
            width: '90%',
            flexDirection: 'row',
        },
        message: {
            flex: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        betHistoryContainer: {
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 25,
            alignItems: 'center',
            marginBottom: 10
        }
    });