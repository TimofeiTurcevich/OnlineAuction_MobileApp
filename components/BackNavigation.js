import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function BackNavigation({ navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ width: '100%', zIndex: 2 }}>
            <TouchableOpacity
                style={styles(insets).toogler}
                onPress={() => {
                    if (!navigation.canGoBack()) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                        return
                    }
                    navigation.goBack()
                }
                }
            >
                <Ionicons name="arrow-back-circle-outline" size={35} color="white" />
            </TouchableOpacity>
        </View >
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