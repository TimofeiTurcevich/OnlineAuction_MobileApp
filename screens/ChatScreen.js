import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Message from "../components/Message";
import { Feather } from '@expo/vector-icons';
import { getDialog, sendAMessage } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function ChatScreen({ navigation, route }) {
    const { userToken, userId } = useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const [dialog, setDialog] = useState({})
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState()

    inputRef = useRef(null)

    const openProfile = () => {
        navigation.navigate("Profile", { userId: dialog.lot.seller.id === userId ? dialog.user.id : dialog.lot.seller.id })
    }

    const getDialogFromApi = useCallback(async () => {
        setIsLoading(true)
        setDialog(await getDialog(route.params.dialogId, userToken))
        setIsLoading(false)
    }, [])

    const sendMessage = async () => {
        if (!message) {
            return;
        }
        setDialog(await sendAMessage(userId, message, dialog.id, userToken))
        setMessage()
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardWillShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        getDialogFromApi();

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <LinearGradient
                colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
                onTouchEnd={() => Keyboard.isVisible() && Keyboard.dismiss()}
                style={styles.container}
            >
                {isLoading || !dialog.lot ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Feather name="loader" size={100} color="black" />
                        <Text style={{ fontSize: 24 }}>Loading</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={[styles.chatInfo, { paddingTop: insets.top }]}>

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => navigation.goBack()}
                            >
                                <Ionicons name="arrow-back-circle-outline" size={50} color="white" />
                            </TouchableOpacity>

                            <View style={styles.titles}>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => openProfile()}
                                >
                                    <Text style={[styles.text, { fontWeight: 'bold' }]} numberOfLines={1}>{dialog.lot && (dialog.lot.seller.id == userId ? dialog.user.nickname : dialog.lot.seller.nickname)}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => navigation.navigate('LotDetailes', { lotId: dialog.lot.id })}
                                >
                                    <Text style={styles.text} numberOfLines={1}>{dialog.lot && (dialog.lot.title)}</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={{ flex: 1, height: '95%' }}
                                onPress={() => navigation.navigate('LotDetailes', { lotId: dialog.lot.id })}

                            >
                                < Image
                                    source={{
                                        uri: "http://192.168.0.123:8082/images/" + (dialog.lot.lotImages.length > 0 ? dialog.lot.lotImages.at(0).fileName : ""),

                                    }}
                                    style={{
                                        flex: 1,
                                        resizeMode: 'center',
                                        borderRadius: Dimensions.get('screen').width * 0.25,
                                        borderColor: 'white',
                                        borderWidth: 1
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        {
                            dialog.message.length <= 0 ?
                                <View style={{
                                    flex: 10,
                                    flexGrow: 10,
                                    width: '100%',
                                    padding: '1%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ fontSize: 30 }}>No messages yet</Text>
                                </View>
                                :
                                <FlatList
                                    data={dialog.message}
                                    style={styles.messages}
                                    onScrollBeginDrag={() => Keyboard.dismiss()}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, key }) => <Message message={item} />}
                                    inverted={-1}

                                />
                        }

                        <View style={[styles.sendMessage, { paddingBottom: navigation.getParent().getState().routeNames.includes("Favorites") ? 0 : (isKeyboardVisible ? 2 : insets.bottom) }]}>
                            <TextInput
                                style={styles.messageInput}
                                placeholder="Send message"
                                placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
                                multiline={true}
                                onChangeText={(message) => setMessage(message)}
                                value={message}
                            />

                            <TouchableOpacity
                                style={styles.sendButton}
                                onPress={() => sendMessage()}
                            >
                                <Feather name="send" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </LinearGradient >
        </KeyboardAvoidingView>
    );
}


const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            alignItems: 'center'
        },
        chatInfo: {
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flexDirection: 'row',
            alignItems: 'center',
            height: Dimensions.get('screen').height * 0.12,

        },
        messages: {
            flex: 10,
            flexGrow: 10,
            width: '100%',
            padding: '1%'
        },
        sendMessage: {
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '1%',
            flexDirection: 'row',
            minHeight: Dimensions.get('screen').height * 0.03,
            maxHeight: Dimensions.get('screen').height * 0.15,
            alignItems: 'flex-end'
        },
        titles: {
            flex: 4.5
        },
        text: {
            color: 'white',
            fontSize: 24,
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        sendButton: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            height: 40,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        messageInput: {
            flex: 6,
            marginRight: '1%',
            height: '100%',
            color: 'white',
            fontSize: 20,
            borderRadius: 20,
            borderColor: 'white',
            borderWidth: 1,
            paddingHorizontal: 15
        }
    });