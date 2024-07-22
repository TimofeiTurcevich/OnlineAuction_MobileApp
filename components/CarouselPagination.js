import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

export default function CarouselPagination({ item, changePhoto, indexSelected, scrolling }) {
    return (
        <View style={[styles.photos, {
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: item.id == indexSelected + 1 ? 2 : 0
        }]}
            onTouchEnd={() => {
                if (!scrolling) {
                    changePhoto(item.id - 1)
                }
            }}
        >
            <Image
                source={{
                    uri: item.image
                }}
                style={{
                    resizeMode: 'contain',
                    width: '80%',
                    height: '80%'
                }}
            />
        </View>
    );
}

const styles =
    StyleSheet.create({
        photos: {
            width: Dimensions.get('screen').width * 0.235,
            height: Dimensions.get('screen').height * 0.1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 20,
            marginRight: 2,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })