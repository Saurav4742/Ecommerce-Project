import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../Axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();
    useEffect (() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (token) {
                    navigation.replace("Main");
                }
            } catch (err) {
                console.log("error message",err);
            }
        };
        checkLoginStatus();
    }, []);
    const handleLogin = () => {
        const user = {
            email: email,
            password: password
        }
        console.log(user);

        axios
            .post(`${BASE_URL}/login`, user)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                AsyncStorage.setItem("authToken", token);
                navigation.replace("Main");
            })
            .catch((error) => {
                Alert.alert("Login Error", "Invalid Email");
                console.log(error);
            })
    };
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
        >
            <View>
                <Image
                    style={{ width: 180, height: 100, marginTop: 25 }}
                    source={{
                        uri: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo-700x394.png",
                    }}
                />
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginTop: 8,
                            color: "#041E42"
                        }}
                    >
                        Login to your Account
                    </Text>
                </View>

                <View
                    style={{ marginTop: 70 }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email" size={24} color="gray"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16
                            }}
                            placeholder="enter your email"
                        />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <AntDesign
                            style={{ marginLeft: 8 }}
                            name="lock1"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 16
                            }}
                            placeholder="enter your Password"
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Text>keep me logged in</Text>

                    <Text
                        style={{ color: "#007FFF", fontWeight: "500" }}>
                        Forget Password</Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleLogin}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    style={{
                        width: 200,
                        backgroundColor: isPressed ? "#008000" :"#FEBE10",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>Don't have an account? sign Up</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default LoginScreen

const styles = StyleSheet.create({});
