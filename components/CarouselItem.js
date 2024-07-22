import React from "react";
import { View, Image, Dimensions } from "react-native";

export default function CarouselItem({ item, open }) {
    return (
        <View style={{ width: Dimensions.get('screen').width * 0.9, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: 25, padding: 10 }}>
            <Image
                onTouchEnd={() => {
                    open(item.id)
                }}
                source={{
                    uri: item.image
                }}
                style={{
                    width: '100%',
                    height: Dimensions.get('screen').height * 0.38,
                    marginBottom: 2
                }}
                resizeMode="contain"
            />
        </View>
    );
}