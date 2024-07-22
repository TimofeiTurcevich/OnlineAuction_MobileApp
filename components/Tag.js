import React from "react";
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from "react-native";

const getImageUrl = "http://192.168.0.123:8082/images/tagImage/"

export default function Tag({ tag, length, openDetailed, openLots }) {
    return (
        <TouchableOpacity
            style={[styles.tag, { marginRight: tag.id % 2 == 1 && length != 1 ? '2%' : 0, width: (length % 2 == 1 && tag.id == length) || length == 1 ? '100%' : '49%' }]}
            onPress={() => openDetailed ? openDetailed(tag) : openLots(tag)}
        >
            <Image
                source={{
                    uri: getImageUrl + tag.fileName
                }}
                style={{
                    flex: 1,
                    marginLeft: 10
                }}
                resizeMode='contain'
            />

            <View style={{ flex: 1.2, justifyContent: 'center', marginLeft: 10 }}>
                <Text style={styles.text}>{tag.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles =
    StyleSheet.create({
        tag: {
            paddingVertical: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            minHeight: Dimensions.get('screen').height * 0.13,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 1)',
            marginBottom: '2%',
            flexDirection: 'row'
        },
        text: {
            fontSize: 30,
            textAlign: 'center',
            color: 'white'
        }
    });