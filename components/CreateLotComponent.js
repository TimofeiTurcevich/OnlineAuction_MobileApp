import React from "react";
import { View, Text, TextInput } from "react-native";

export default function CreateLotInput({ label, placeholder, keyboardType, inputFunction, value }) {
    return (
        <View>
            <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', width: '100%', textAlignVertical: 'center' }}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                style={{ color: 'black', borderColor: 'rgba(0, 0, 0, 0.5)', borderWidth: 1, borderRadius: 25, fontSize: 15, padding: 5, marginBottom: 10 }}
                placeholderTextColor={'black'}
                multiline={true}
                value={value}
                keyboardType={keyboardType}
                onChangeText={(value) => inputFunction(value)}
            />
        </View>
    );
}