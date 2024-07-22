import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";
import OpenDrawer from "../components/OpenDrawer";
import AuthInput from "../components/AuthInput";

export default function LogInScreen({ navigation }) {
    const { logIn } = useContext(AuthContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const usernameInput = (username) => {
        setUsername(username)
    }

    const passwordInput = (password) => {
        setPassword(password)
    }

    return (
        <LinearGradient
            colors={['rgba(255, 145, 193, 1)', 'rgba(255, 228, 88, 1)']}
            style={styles.appContainer}
        >
            <OpenDrawer navigation={navigation} />

            <View style={styles.container}>
                <Text style={{ fontSize: 40, marginBottom: 20 }}>Log In</Text>

                <AuthInput placeholder={"Login"} inputFunction={usernameInput} />

                <AuthInput placeholder={"Password"} multiline={false} secureTextEntry={true} inputFunction={passwordInput} />

                <View
                    style={{ flexDirection: 'row', marginBottom: 10 }}
                >
                    <Text>If you dont have account yet - you can </Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Registration")}
                    >
                        <Text style={{ color: 'blue' }}>Register</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => logIn(username, password)}
                >
                    <Text style={{ fontSize: 18 }}>Log In</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles =
    StyleSheet.create({
        appContainer: {
            flex: 1,
            paddingHorizontal: '2.5%'
        },
        container: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        input: {
            width: '95%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            fontSize: 15,
            borderRadius: 25,
            padding: 5,
            color: 'white',
            marginBottom: 10
        },
        button: {
            width: '50%',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.5)',
            borderWidth: 2,
            borderRadius: 25
        }
    });