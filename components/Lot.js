import React, { useContext } from "react";
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Countdown from "./Countdown";
import { AuthContext } from "../context/AuthContext";

const getImageUrl = "http://192.168.0.123:8082/images/"

export default function Lot({ navigation, lot }) {
    const { userToken } = useContext(AuthContext)
    const insets = useSafeAreaInsets();

    const openDetails = () => {
        if (!userToken) {
            Alert.alert("Warning", "To show details you need to log in")
            return;
        }
        navigation.navigate("LotDetailes", { lotId: lot.id })
    }

    return (
        <View style={styles.lot}>
            <Image
                source={{
                    uri: getImageUrl + lot.coverPhoto,
                }}
                style={{
                    width: '45%',
                    height: Dimensions.get('screen').height * 0.19 * 0.9
                }}
                resizeMode="contain"
            />

            <View style={styles.details}>
                <Text style={[styles.text, { fontSize: 24, marginBottom: 10 }]}>{lot.title}</Text>

                <View style={styles.info}>
                    <View style={[styles.textContainer, { marginRight: '5%' }]}>
                        <Text style={styles.text}>Ends in: <Countdown endDate={lot.endDate} /></Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Current bet: {lot.currentBet ? lot.currentBet + "$" : "There is no bets yet"}</Text >
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => openDetails()}
                >
                    <Text style={[styles.text, { fontSize: 24 }]}>More info</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles =
    StyleSheet.create({
        lot: {
            width: Dimensions.get('screen').width * 0.9,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 1)',
            borderRadius: 25,
            flexDirection: 'row',
            marginBottom: '4%',
            padding: 10
        },
        details: {
            width: '53%',
            marginLeft: '3%'
        },
        textContainer: {
            flex: 1,
            justifyContent: 'center'
        },
        text: {
            color: 'white',
            textAlign: 'center'
        },
        info: {
            minHeight: Dimensions.get('screen').height * 0.19 * 0.4,
            flexDirection: 'row',
            width: '100%',
            marginBottom: 10
        },
        button: {
            width: '100%',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
        }
    });






