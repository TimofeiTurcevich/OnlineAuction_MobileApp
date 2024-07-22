import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function BetHistoryItem({ number, name, bet }) {
    return (
        <View style={styles.bet}>
            <Text style={[styles.text, { flex: 1 }]}>
                {number}
            </Text>
            <Text style={[styles.text, { flex: 3 }]}>
                {name}
            </Text>
            <Text style={[styles.text, { flex: 3 }]}>
                {bet}
            </Text>
        </View>
    );
}

const styles =
    StyleSheet.create({
        bet: {
            minHeight: Dimensions.get('screen').height * 0.04,
            width: '95%',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
            borderBottomColor: 'white',
            borderBottomWidth: 2
        },
        text: {
            fontSize: 24,
            color: 'white',
            textAlign: 'center'
        }
    })