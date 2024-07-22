import React, { useState } from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Text, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackNavigation from "../components/BackNavigation";
import AuthInput from "../components/AuthInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registration } from "../api/api";


const imgDir = FileSystem.documentDirectory + 'images/';

export default function RegistrationScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [image, setImage] = useState();
    const [date, setDate] = useState()
    const [open, setOpen] = useState(false)
    const [nickname, setNickname] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [password, setPassword] = useState()

    const onChangeDate = (event, selectedDate) => {
        setOpen(false)
        setDate(selectedDate)
    };

    const deleteImage = () => {
        setImage()
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
        setImage(dest);
        console.log(dest)
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

        if (!result.canceled) {
            saveImage(result.assets[0].uri);
        }
    };

    const register = async () => {
        if (!nickname || !firstName || !lastName || !date || !password || !image) {
            Alert.alert("Warning", "Some fields wasnt filled");
            return;
        }
        await registration(nickname, firstName, lastName, date, password, image)
        Alert.alert("Success", "Account have been successfully created. Please log in")
        navigation.goBack();
    }

    const nicknameInput = (nickname) => {
        setNickname(nickname)
    }

    const firstNameInput = (firstName) => {
        setFirstName(firstName)
    }

    const lastNameInput = (lastName) => {
        setLastName(lastName)
    }

    const passwordInput = (password) => {
        setPassword(password)
    }


    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.app}
        >
            <BackNavigation navigation={navigation} />

            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, width: '100%', paddingHorizontal: '2.5%', paddingTop: insets.top, paddingBottom: insets.bottom, alignItems: 'center', justifyContent: 'center' }}
            >
                <Text style={{ fontSize: 40, paddingBottom: 10 }}>Registration</Text>

                {image ?
                    <View>
                        <Image
                            source={{ uri: image }}
                            style={styles.photo}
                            resizeMode="contain"
                        />

                        <TouchableOpacity
                            style={styles.delete}
                            onPress={() => deleteImage()}
                        >
                            <AntDesign name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity
                        style={styles.photo}
                        onPress={() => selectImage()}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Photo</Text>

                        <Entypo name="plus" size={40} color="white" />
                    </TouchableOpacity>
                }

                <Text style={styles.text}>Nickname:</Text>
                <AuthInput placeholder={"Enter your nickname"} multiline={true} inputFunction={nicknameInput} />

                <Text style={styles.text}>First name:</Text>
                <AuthInput placeholder={"Enter your first name"} multiline={true} inputFunction={firstNameInput} />

                <Text style={styles.text}>Last name:</Text>
                <AuthInput placeholder={"Enter your last name"} multiline={true} inputFunction={lastNameInput} />

                <Text style={styles.text}>Birth date:</Text>
                <View style={styles.date}>
                    {!open ?
                        <Text style={{ fontSize: 15, color: 'white', flex: 1, textAlign: 'center' }}>{date ? date.toISOString().split('T')[0] : "Select date"}</Text>
                        :
                        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderRadius: 25, marginRight: 2 }}>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date || new Date()}
                                mode={'date'}
                                is24Hour={true}
                                onChange={onChangeDate}
                            />
                        </View>
                    }


                    <TouchableOpacity
                        style={{ borderWidth: 2, borderColor: 'white', borderRadius: 25, borderColor: 'white', flex: 1, justifyContent: 'center' }}
                        onPress={() => {
                            setOpen(true)
                        }}
                    >
                        <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}>Select date</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Password:</Text>
                <AuthInput placeholder={"Enter your password"} multiline={false} secureTextEntry={true} inputFunction={passwordInput} />

                <View style={{ width: '100%', minHeight: Dimensions.get('screen').height * 0.01, flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0.5)', marginRight: '2%', borderWidth: 0 }]}
                        onPress={() => register()}
                    >
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Create account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', textAlignVertical: 'center' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>

        </LinearGradient>
    );
}

const styles =
    StyleSheet.create({
        app: {
            flex: 1
        },
        input: {
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            fontSize: 15,
            borderRadius: 25,
            padding: 5,
            color: 'white',
            marginBottom: 10
        },
        photo: {
            width: Dimensions.get('screen').width * 0.25,
            height: Dimensions.get('screen').width * 0.25,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: Dimensions.get('screen').width * 0.25,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4
        },
        delete: {
            position: 'absolute',
            backgroundColor: 'black',
            borderRadius: 10,
            left: '18%'
        },
        text: {
            fontSize: 14,
            width: '100%'
        },
        date: {
            width: '100%',
            borderRadius: 25,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flexDirection: 'row',
            padding: 5
        },
        button: {
            width: '49%',
            justifyContent: 'center',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            borderRadius: 25
        }
    });