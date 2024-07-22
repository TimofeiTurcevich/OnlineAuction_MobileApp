import React, { useState, useCallback, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Alert } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateLotImage from "../components/CreateLotImage";
import CreateLotTag from "../components/CreateLotTag";
import CreateLotInput from "../components/CreateLotComponent";
import OpenDrawer from "../components/OpenDrawer";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createLot, getAllSubTags } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const imgDir = FileSystem.documentDirectory + 'images/';

export default function CreateLotScreen({ navigation }) {
    const { userToken, userId } = useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const [images, setImages] = useState([]);
    const [date, setDate] = useState()
    const [open, setOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [openTime, setOpenTime] = useState(false)
    const [mode, setMode] = useState();
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [title, setTitle] = useState();
    const [startPrice, setStartPrice] = useState();
    const [description, setDescription] = useState();

    const reset = async () => {
        setImages([])
        setDate()
        setSelectedTags([])
        setTitle()
        setStartPrice()
        setDescription()
        setTags(await getAllSubTags())
    }

    const titleInput = (title) => {
        setTitle(title);
    }

    const startPriceInput = (startPrice) => {
        setStartPrice(startPrice);
    }

    const descriptionInput = (description) => {
        setDescription(description);
    }

    const addTag = (tag) => {
        setTags(tags.filter(i => i.id != tag.id))
        setSelectedTags([...selectedTags, tag])
    }

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(i => i.id != tag.id))
        setTags([...tags, tag])
    }

    const onChangeDate = (event, selectedDate) => {
        setOpenDate(false)
        setDate(selectedDate)
    };

    const onChangeTime = (event, selectedDate) => {
        setOpenTime(false)
        selectedDate.setHours(selectedDate.getHours() + 2)
        setDate(selectedDate)
    };

    const deleteImage = (id) => {
        setImages(images.filter(i => i.id != id))
    }

    const ensureDirExists = async () => {
        const dirInfo = await FileSystem.getInfoAsync(imgDir);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
        }
    };


    const saveImage = async (uri) => {
        await ensureDirExists();
        const filename = new Date().getTime() + '.jpeg';
        const dest = imgDir + filename;
        await FileSystem.copyAsync({ from: uri, to: dest });
        setImages([...images, {
            id: images.length == 0 ? 1 : images.at(images.length - 1).id + 1,
            name: dest
        }]);
        console.log(images)
    };

    const selectImage = async () => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1
        };

        result = await ImagePicker.launchImageLibraryAsync(options);

        // Save image if not cancelled
        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    const create = async () => {
        if (!title || !startPrice || !date || !description || selectedTags.length == 0) {
            Alert.alert("Warning", "Some fields wasnt filled")
            return;
        }
        if (date < new Date()) {
            Alert.alert("Warning", "End date and time cannot be before now")
            return;
        }
        const lotId = await createLot(title, startPrice, date, userId, description, selectedTags, images, userToken)
        // navigation.navigate("Home", {
        //     screen: "All lots",
        //     params: {
        //         screen: "LotDetailes",
        //         initial: false,
        //         params: { lotId: 1 }
        //     }
        // })
        navigation.reset({
            routes: [
                {
                    name: 'Home',
                    state: {
                        routes: [{
                            name: 'All lots',
                            state: {
                                routes: [{
                                    name: 'LotDetailes',
                                    params: {
                                        lotId: lotId
                                    }
                                }]
                            }
                        }],
                    },
                },
            ],
        });
    }

    const getTags = useCallback(async () => {
        setTags(await getAllSubTags())
    }, [])

    useEffect(() => {
        getTags();
    }, [])

    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.container}
        >
            <OpenDrawer navigation={navigation} />

            <KeyboardAwareScrollView
                style={{ width: '100%' }}
                contentContainerStyle={{ flex: 1, width: '100%', paddingHorizontal: '2.5%', paddingTop: insets.top }}
            >
                <Text style={styles.text}>Add lot photos &#40;First photo will be lot cover photo&#41;</Text>

                <View style={{ width: '95%', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {images.map((i) => {
                        return (
                            <CreateLotImage key={i.id} image={i} deleteImage={deleteImage} />
                        );
                    })}

                    <TouchableOpacity
                        style={styles.addPhoto}
                        onPress={() => selectImage()}
                    >
                        <Entypo name="plus" size={40} color="white" />
                    </TouchableOpacity>

                    {/* <FlatList
                    data={images}
                    renderItem={({ item }) =>
                        <Image
                            source={{ uri: item }}
                            style={{
                                resizeMode: 'center',
                                width: Dimensions.get('screen').width * 0.25,
                                height: Dimensions.get('screen').width * 0.25,
                                borderRadius: 25,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                marginRight: 4
                            }}
                        />
                    }
                    horizontal={true}
                    ListFooterComponent={
                        <TouchableOpacity
                            style={styles.addPhoto}
                            onPress={() => selectImage()}
                        >

                            <Entypo name="plus" size={40} color="white" />
                        </TouchableOpacity>
                    }
                    /> */}

                </View>

                <CreateLotInput label={"Lot title:"} placeholder={"Enter lot title"} inputFunction={titleInput} value={title} />
                <CreateLotInput label={"Start price:"} placeholder={"Enter lot start price"} keyboardType={'number-pad'} inputFunction={startPriceInput} value={startPrice} />

                <View style={styles.tags}>
                    <Text style={[styles.text, { color: 'white' }]}>Selected tags:</Text>
                    <View style={[styles.tag, { borderBottomWidth: 2 }]}>
                        {selectedTags.length == 0 && <Text style={[styles.text, { color: 'white', fontSize: 15 }]}>No selected tags yet</Text>}
                        {selectedTags.map(i =>
                            <CreateLotTag key={i.id} icon={<MaterialIcons name="cancel" size={28} color="white" />} tag={i} tagFunction={removeTag} />
                        )}
                    </View>
                    <Text style={[styles.text, { color: 'white' }]}>Tags:</Text>

                    <View style={[styles.tag, { borderBottomWidth: 0 }]}>
                        {tags.length == 0 && <Text style={[styles.text, { color: 'white', fontSize: 15 }]}>No tags left</Text>}
                        {tags.map(i =>
                            <CreateLotTag key={i.id} icon={<AntDesign name="pluscircle" size={24} color="white" />} tag={i} tagFunction={addTag} />
                        )}
                    </View>

                </View>

                <Text style={styles.text}>End date:</Text>

                <View style={styles.dateTime}>
                    <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
                        {!openDate ?
                            <Text style={[styles.text, { fontSize: 15, color: 'white', flex: 1 }]}>{date ? date.toISOString().split('T')[0] : "Select date"}</Text>
                            :
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderRadius: 25, marginRight: 2 }}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date || new Date()}
                                    mode='date'
                                    is24Hour={true}
                                    onChange={onChangeDate}
                                />
                            </View>
                        }


                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => {
                                setOpenDate(true)
                            }}
                        >
                            <Text style={[styles.text, { fontSize: 15, color: 'white' }]}>Select date</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
                        {!openTime ?
                            <Text style={[styles.text, { fontSize: 15, color: 'white', flex: 1 }]}>{date ? date.toISOString().slice(11, 16) : "Select time"}</Text>
                            :
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderRadius: 25, marginRight: 2 }}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date || new Date()}
                                    mode='time'
                                    is24Hour={true}
                                    onChange={onChangeTime}
                                />
                            </View>
                        }


                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => {
                                setOpenTime(true)
                            }}
                        >
                            <Text style={[styles.text, { fontSize: 15, color: 'white' }]}>Select time</Text>
                        </TouchableOpacity>
                    </View>

                    {open && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date || new Date()}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChangeDate}
                        />
                    )}
                </View>

                <CreateLotInput label={"Description:"} placeholder={"Enter lot description"} inputFunction={descriptionInput} value={description} />

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={{ flex: 1, borderRadius: 25, backgroundColor: 'rgba(0, 0, 0, 0.5)', marginRight: '1%' }}
                        onPress={() => create()}
                    >
                        <Text style={[styles.text, { color: 'white' }]}>Create</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1, borderRadius: 25, borderColor: 'rgba(0, 0, 0, 0.5)', borderWidth: 2 }}
                        onPress={() => reset()}
                    >
                        <Text style={styles.text}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        </LinearGradient >
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        },
        addPhoto: {
            width: Dimensions.get('screen').width * 0.21,
            height: Dimensions.get('screen').width * 0.21,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center'
        },
        tags: {
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            borderRadius: 25
        },
        tag: {
            borderColor: 'white',
            borderBottomWidth: 2,
            width: '100%',
            alignItems: 'center',
            paddingBottom: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        dateButton: {
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 25,
            borderColor: 'white',
            justifyContent: 'center',
            flex: 1
        },
        dateTime: {
            width: '100%',
            borderRadius: 25,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        buttons: {
            flexDirection: 'row',
            width: '100%',
            marginBottom: 10
        },
        text: {
            fontSize: 20,
            textAlign: 'center',
            width: '100%',
            textAlignVertical: 'center'
        }
    });