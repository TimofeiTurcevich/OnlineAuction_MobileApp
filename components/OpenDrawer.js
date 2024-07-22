import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";

export default function OpenDrawer({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ width: '100%', zIndex: 2 }}>
            <TouchableOpacity
                style={styles(insets).toogler}
                onPress={() =>
                    navigation.openDrawer()
                }
            >
                <View style={styles(insets).line} />
                <View style={styles(insets).line} />
                <View style={[styles(insets).line, { marginBottom: 0 }]} />
            </TouchableOpacity>
        </View>
    );
}

const styles = insets =>
    StyleSheet.create({
        toogler: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: Dimensions.get('screen').width * 0.1,
            height: Dimensions.get('screen').width * 0.1,
            marginTop: insets.top,
            marginLeft: 10,
            borderRadius: 25,
            paddingTop: '1%',
            paddingBottom: '1%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 2
        },
        line: {
            backgroundColor: 'white',
            width: '80%',
            height: '5%',
            marginBottom: '10%'

        }
    });