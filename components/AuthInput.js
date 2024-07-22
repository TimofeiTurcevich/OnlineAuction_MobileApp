import React from "react";
import { TextInput, StyleSheet } from "react-native";


export default function AuthInput({ placeholder, multiline, secureTextEntry, inputFunction }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
            style={styles.input}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => inputFunction(text)}
        />
    )
}

const styles =
    StyleSheet.create({
        input: {
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            fontSize: 15,
            borderRadius: 25,
            padding: 5,
            color: 'white',
            marginBottom: 10
        }
    });