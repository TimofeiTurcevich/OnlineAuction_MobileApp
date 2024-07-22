import React from "react";
import { Image, Dimensions, View, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export default function CreateLotImage({ image, deleteImage }) {
    return (
        <View>
            <Image
                source={{ uri: image.name }}
                style={{
                    resizeMode: 'center',
                    width: Dimensions.get('screen').width * 0.21,
                    height: Dimensions.get('screen').width * 0.21,
                    borderRadius: 25,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    marginRight: 4,
                    marginBottom: 4
                }}
            />
            <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteImage(image.id)}
            >
                <AntDesign name="delete" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles =
    StyleSheet.create({
        delete: {
            position: 'absolute',
            backgroundColor: 'black',
            borderRadius: 10,
            left: '68%'
        }
    });