import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Modal, TextInput, Text, Keyboard } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import BouncyCheckboxGroup from "react-native-bouncy-checkbox-group";

export default function SearchFilterLots({ sortBy, changeSortBy, changeTitle }) {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState(sortBy)
    const [title, setTitle] = useState("")

    const verticalStaticData = [
        {
            id: 0,
            value: "dateAsc",
            fillColor: 'rgba(255, 145, 193, 1)',
            style: {
                marginVertical: 5
            },
            textStyle: { textDecorationLine: "none", color: 'white', fontSize: 20 },
            size: 35,
            text: 'By end time decrement',
            isChecked: true
        },
        {
            id: 1,
            value: "dateDesc",
            fillColor: 'rgba(255, 145, 193, 1)',
            style: {
                marginVertical: 5
            },
            textStyle: { textDecorationLine: "none", color: 'white', fontSize: 20 },
            size: 35,
            text: 'By end time increment'
        },
        {
            id: 2,
            value: "priceDesc",
            fillColor: 'rgba(255, 145, 193, 1)',
            style: {
                marginVertical: 5
            },
            textStyle: { textDecorationLine: "none", color: 'white', fontSize: 20 },
            size: 35,
            text: 'By price decrement'
        },
        {
            id: 3,
            value: "priceAsc",
            fillColor: 'rgba(255, 145, 193, 1)',
            style: {
                marginVertical: 5
            },
            textStyle: { textDecorationLine: "none", color: 'white', fontSize: 20 },
            size: 35,
            text: 'By price increment'
        },
    ]


    return (
        <View style={{ marginTop: insets.top, width: '95%', alignItems: 'flex-end', position: 'absolute', zIndex: 2 }} onTouchStart={() => Keyboard.dismiss()}>
            <TouchableOpacity
                style={styles.toogler}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesome name="filter" size={24} color="white" />
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 5 }}>
                            <TextInput
                                style={{ color: 'black', fontSize: 24, borderColor: 'white', borderWidth: 1, width: '85%', borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingHorizontal: 8 }}
                                placeholder="Search"
                                placeholderTextColor={'black'}
                                onChangeText={(text) => setTitle(text)}
                            />
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <EvilIcons name="close-o" size={50} color="white" />
                            </TouchableOpacity>
                        </View>

                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 24 }}>Order by:</Text>

                        <BouncyCheckboxGroup
                            data={verticalStaticData}
                            style={{ flexDirection: "column" }}
                            initial={selected.id}
                            onChange={(selectedItem) => {
                                setSelected(selectedItem)
                                changeSortBy(selectedItem)
                            }}
                        />

                        <TouchableOpacity
                            style={{ alignItems: 'center', borderColor: 'white', borderWidth: 2, borderRadius: 25 }}
                            onPress={() => {
                                setModalVisible(false)
                                changeTitle(title)
                                setTitle("")
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 35, textAlign: 'center' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    );
}

const styles =
    StyleSheet.create({
        toogler: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: Dimensions.get('screen').width * 0.1,
            height: Dimensions.get('screen').width * 0.1,
            marginLeft: 10,
            borderRadius: 25,
            paddingTop: '1%',
            paddingBottom: '1%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 2
        },
        modalContainer: {
            width: Dimensions.get('screen').width,
            position: 'absolute',
            height: Dimensions.get('screen').height,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            alignItems: 'center',
            justifyContent: 'center'
        },
        modalContent: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            width: '90%',
            borderRadius: 25,
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 1,
            padding: 9
        }
    });