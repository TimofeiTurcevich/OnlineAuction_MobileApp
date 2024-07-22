import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Message({ message }) {
    const { userId } = useContext(AuthContext)

    return (
        <View>
            <View style={message.sender.id !== userId ? styles.received : styles.sent}>
                <View style={[styles.message, { backgroundColor: message.sender.id !== userId ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.8)', borderWidth: 1, borderColor: message.sender.id !== userId ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)' }]}>
                    <Text style={{ color: message.sender.id !== userId ? 'white' : 'black', fontSize: 18 }}>{message.message}</Text>
                    <Text style={{ color: message.sender.id !== userId ? 'white' : 'black', fontSize: 12, width: '100%', textAlign: 'right' }}>{message.sendDate}</Text>
                </View>
            </View>
        </View>
    );
}

const styles =
    StyleSheet.create({
        message: {
            width: '45%',
            padding: '1%',
            borderRadius: 10
        },
        received: {
            width: '100%',
            marginTop: 5
        },
        sent: {
            width: '100%',
            alignItems: 'flex-end',
            marginTop: 5
        }
    });