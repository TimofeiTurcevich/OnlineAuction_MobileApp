import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, Dimensions, Image, View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Dialog({ navigation, chat }) {
    const { userId } = useContext(AuthContext)

    const openChat = () => {
        navigation.navigate("Chat", { dialogId: chat.id })
    }
    console.log(chat)

    return (
        <TouchableOpacity
            style={styles.dialog}
            onPress={openChat}
        >
            <Image
                source={{
                    uri: "http://192.168.0.123:8082/images/" + chat.fileName

                }}
                style={{
                    resizeMode: 'center',
                    height: '95%',
                    flex: 1.2,
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: Dimensions.get('screen').height * 0.15,
                    marginRight: 3
                }}
            />

            <View style={styles.container}>
                <View style={styles.info} >
                    <Text style={styles.text} numberOfLines={1}>{chat.lot.title}</Text>
                    <Text style={styles.text} numberOfLines={1}>{chat.lot.seller.id == userId ? "Buyer: " + chat.user.nickname : "Seller: " + chat.lot.seller.nickname}</Text>
                </View>

                <View style={styles.messageInfo}>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        {chat.message ?
                            <Text style={{ color: 'white', textAlignVertical: 'center' }} numberOfLines={2}>
                                <Text style={{ color: 'rgba(58, 216, 255, 1)' }}>{chat.message.sender.id == userId ? "You:" : chat.lot.seller.nickname + ":"} </Text>
                                {chat.message.message}
                            </Text>
                            :
                            <Text style={{ color: 'white', textAlignVertical: 'center' }} numberOfLines={2}>
                                No messages yet
                            </Text>
                        }

                    </View>

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {chat.message && <Text style={{ color: 'white', textAlign: 'center' }}>{chat.message.sendDate}</Text>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles =
    StyleSheet.create({
        dialog: {
            width: '90%',
            height: Dimensions.get('screen').height * 0.1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: Dimensions.get('screen').height * 0.1,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 3,
            marginBottom: 7
        },
        container: {
            flex: 4,
            height: '95%',
            flexDirection: 'column'
        },
        info: {
            flexDirection: 'column',
            width: '100%',
            flex: 2.5,
            paddingRight: '5%',
            marginBottom: 4
        },
        text: {
            flex: 1,
            color: 'white'
        },
        messageInfo: {
            flex: 3,
            borderRadius: Dimensions.get('screen').height * 0.1,
            borderWidth: 1,
            borderColor: 'white',
            width: '95%',
            flexDirection: 'row',
            paddingHorizontal: 10
        }
    });