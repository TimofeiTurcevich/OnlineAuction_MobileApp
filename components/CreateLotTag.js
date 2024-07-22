import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";


export default function CreateLotTag({ icon, tag, tagFunction }) {
    return (
        <TouchableOpacity
            style={styles.tag}
            onPress={() => tagFunction(tag)}
        >
            <Text style={{ color: 'white', fontSize: 15, flex: 2, textAlign: 'center' }}>{tag.title}</Text>
            {icon}
        </TouchableOpacity>
    )
}

const styles =
    StyleSheet.create({
        tag: {
            width: '30%',
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            marginBottom: 3,
            marginRight: 2
        }
    });