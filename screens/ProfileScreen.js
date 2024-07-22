import React, { useContext, useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, ScrollView, View, Dimensions, Image, Text, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { getProfileInfo, deleteProfile, updateProfile } from "../api/api";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ProfileScreen({ navigation, providedUserId, navigationButton }) {
    const { userToken, userId } = useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const { logout } = useContext(AuthContext);
    const [profile, setProfile] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [isEdit, setIsEdit] = useState(false);

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState()
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();

    const onChangeDate = (event, selectedDate) => {
        setOpen(false)
        setDate(selectedDate)
    };

    const saveChanges = async () => {
        setIsLoading(true)
        if ((oldPass && !newPass) || (newPass && !oldPass)) {
            Alert.alert("Warning", "If You want to change password - you need to fill both old and new")
            setIsLoading(false)
            return;
        }
        setProfile(await updateProfile(userId, firstName, lastName, oldPass, newPass, date, userToken))
        // await getProfileInfo(providedUserId, userToken))
        setIsLoading(false)
        setIsEdit(false)
    }


    const getProfile = useCallback(async () => {
        setIsLoading(true)
        setProfile(await getProfileInfo(providedUserId, userToken))
        setIsLoading(false)
    }, [])

    const deleteAccount = async () => {
        setIsLoading(true)
        await deleteProfile(providedUserId, userToken)
        setIsLoading(false)
        logout()
    }


    useEffect(() => {
        getProfile();
    }, [])

    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.appContainer}
        >
            {navigationButton}
            {isLoading || !profile ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Feather name="loader" size={100} color="black" />
                    <Text style={{ fontSize: 24 }}>Loading</Text>
                </View>
                :
                <KeyboardAwareScrollView
                    style={{ flexGrow: 1, width: '100%', marginTop: insets.top }}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <View style={styles.container}>
                        <Text style={[styles.text, { fontSize: 30 }]}>{profile.nickname}</Text>

                        {
                            profile.userImage ?
                                <Image
                                    source={{
                                        uri: "http://192.168.0.123:8082/images/userImage/" + profile.userImage.fileName
                                    }}
                                    style={{
                                        resizeMode: 'center',
                                        height: Dimensions.get('screen').height * 0.3,
                                        width: Dimensions.get('screen').height * 0.3,
                                        borderRadius: (Dimensions.get('screen').height * 0.3) / 2,
                                        maxWidth: '100%',
                                        borderColor: 'white',
                                        borderWidth: 2,
                                        marginBottom: 10
                                    }}
                                />
                                :
                                <View
                                    style={{
                                        height: Dimensions.get('screen').height * 0.3,
                                        width: Dimensions.get('screen').height * 0.3,
                                        borderRadius: (Dimensions.get('screen').height * 0.3) / 2,
                                        maxWidth: '100%',
                                        borderColor: 'white',
                                        justifyContent: 'center',
                                        borderWidth: 2,
                                        marginBottom: 10
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 24, color: 'white', textAlign: 'center' }}
                                    >No photo</Text>
                                </View>
                        }

                        {
                            !isEdit
                                ?
                                <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                                    <View style={styles.infoRow}>
                                        <View style={[styles.info, { marginRight: '2%', alignItems: 'baseline' }]}>
                                            <Text style={[styles.text, { maxWidth: '100%', flex: 1 }]}>First Name:</Text>
                                            <Text style={[styles.text, { fontSize: 24, flex: 15, textAlign: 'left' }]}>{profile.firstName}</Text>
                                        </View>

                                        <View style={[styles.info, { alignItems: 'baseline' }]}>
                                            <Text style={[styles.text, { maxWidth: '100%', flex: 1 }]}>Last Name:</Text>
                                            <Text style={[styles.text, { fontSize: 24, flex: 15, textAlign: 'left' }]}>{profile.lastName}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.infoRow}>
                                        <View style={[styles.info, { marginRight: '2%', alignItems: 'baseline', justifyContent: 'center' }]}>
                                            <Text style={[styles.text, { maxWidth: '100%' }]}>Date of birth:</Text>
                                            <Text style={[styles.text, { fontSize: 24, textAlign: 'left' }]}>{(profile.dateOfBirth.toString()).substring(0, 10)}</Text>
                                        </View>

                                        <View style={[styles.info, { alignItems: 'baseline' }]}>
                                            <Text style={[styles.text, { maxWidth: '100%', flex: 1 }]}>Registration date:</Text>
                                            <Text style={[styles.text, { fontSize: 24, flex: 15, textAlign: 'left' }]}>{profile.registrationDate}</Text>
                                        </View>
                                    </View>

                                    {userId == providedUserId ?
                                        <View style={styles.buttons}>
                                            <TouchableOpacity
                                                style={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%' }]}
                                                onPress={() => navigation.navigate("UserLots", { userId: userId })}
                                            >
                                                <Text style={[styles.text, { fontSize: 20, color: 'black' }]}>Show all user lots</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.button, { marginRight: '2%', borderColor: 'rgba(255, 255, 255, 0.8)', borderWidth: 2 }]}
                                                onPress={() => {
                                                    setFirstName(profile.firstName)
                                                    setDate(new Date(profile.dateOfBirth))
                                                    setLastName(profile.lastName)
                                                    setIsEdit(!isEdit)
                                                }}
                                            >
                                                <Text style={[styles.text, { fontSize: 20 }]}>Edit info</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}
                                                onPress={() => deleteAccount()}
                                            >
                                                <Text style={[styles.text, { fontSize: 20, color: 'black' }]}>Delete account</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%' }]}
                                                onPress={() => logout()}
                                            >
                                                <Text style={[styles.text, { fontSize: 20, color: 'black' }]}>Logout</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles.buttons}>
                                            <TouchableOpacity
                                                style={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%' }]}
                                                onPress={() => navigation.navigate("UserLots", { userId: providedUserId })}
                                            >
                                                <Text style={[styles.text, { fontSize: 20, color: 'black' }]}>Show all user lots</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                                :
                                <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                                    <View style={styles.infoRow}>
                                        <View style={styles.info}>
                                            <Text style={[styles.text, { maxWidth: '100%', flex: 1 }]}>First Name:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={profile.firstName}
                                                placeholderTextColor={'rgba(255,255,255,0.8)'}
                                                onChangeText={(text) => setFirstName(text)}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.infoRow}>
                                        <View style={styles.info}>
                                            <Text style={[styles.text, { maxWidth: '100%', flex: 1 }]}>Last Name:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={profile.lastName}
                                                placeholderTextColor={'rgba(255,255,255,0.8)'}
                                                onChangeText={(text) => setLastName(text)}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.dateEdit}>
                                        {!open ?
                                            <Text style={{ fontSize: 15, color: 'white', flex: 1, textAlign: 'center' }}>{date ? date.toISOString().split('T')[0] : "Select date"}</Text>
                                            :
                                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', borderRadius: 25, marginRight: 2 }}>
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={date || new Date()}
                                                    mode={'date'}
                                                    is24Hour={true}
                                                    onChangeText={onChangeDate}
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

                                    <View style={styles.infoRow}>
                                        <View style={styles.info}>
                                            <Text style={[styles.text, { maxWidth: '100%', flex: 1 }]}>Change password:</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={"Old password"}
                                                placeholderTextColor={'rgba(255,255,255,0.8)'}
                                                onChangeText={(text) => setOldPass(text)}
                                            />

                                            <TextInput
                                                style={styles.input}
                                                placeholder={"New password"}
                                                placeholderTextColor={'rgba(255,255,255,0.8)'}
                                                onChangeText={(text) => setNewPass(text)}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.buttons}>

                                        <TouchableOpacity
                                            style={[styles.button, { marginRight: '2%', borderColor: 'rgba(255, 255, 255, 0.8)', borderWidth: 2 }]}
                                            onPress={() => saveChanges()}
                                        >
                                            <Text style={[styles.text, { fontSize: 20 }]}>Save</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, { backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}
                                            onPress={() => {
                                                setDate()
                                                setLastName()
                                                setFirstName()
                                                setOldPass()
                                                setNewPass()
                                                setIsEdit(!isEdit)
                                            }}
                                        >
                                            <Text style={[styles.text, { fontSize: 20, color: 'black' }]}>Cancel</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                        }

                    </View>

                </KeyboardAwareScrollView>
            }
        </LinearGradient>
    );
}

const styles =
    StyleSheet.create({
        appContainer: {
            flex: 1,
            alignItems: 'center'
        },
        container: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: Dimensions.get('screen').width * 0.9,
            marginBottom: 5,
            borderRadius: 25,
            padding: '3%',
            alignItems: 'center'
        },
        text: {
            color: 'white',
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        infoRow: {
            width: '100%',
            minHeight: Dimensions.get('screen').height * 0.01,
            flexDirection: 'row'
        },
        info: {
            flex: 1,
            minHeight: Dimensions.get('screen').height * 0.01,
            borderRadius: 25,
            borderColor: 'white',
            borderWidth: 2,
            padding: 10,
            marginBottom: 5
        },
        buttons: {
            width: '100%',
            minHeight: Dimensions.get('screen').height * 0.01,
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        button: {
            width: '49%',
            justifyContent: 'center',
            borderRadius: 25,
            marginBottom: 5
        },
        input: {
            width: '100%',
            flex: 15,
            marginTop: 10,
            fontSize: 25,
            borderRadius: 25,
            borderColor: 'black',
            borderWidth: 2,
            padding: 10,
            color: 'white'
        },
        dateEdit: {
            width: '100%',
            minHeight: Dimensions.get('screen').height * 0.01,
            borderRadius: 25,
            borderColor: 'white',
            borderWidth: 2,
            flexDirection: 'row',
            padding: 5,
            marginBottom: 5
        },
    });