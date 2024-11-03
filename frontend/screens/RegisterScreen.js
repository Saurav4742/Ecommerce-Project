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
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { BASE_URL } from '../Axios';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation();
    const handleRegister = () => {

        // console.log(name,email,password);
        const user = {
            name: name,
            email: email,
            password: password,
        };

        //send A post request to the backend API
        //`${process.env.REACT_APP_BACKEND_URL}/register`
        axios
            .post(`${BASE_URL}/register`, user)
            .then((response) => {
                // console.log("then");
                console.log(response);
                Alert.alert(
                    "Registration Succesfull",
                    "You have registered successfully"
                );
                setName("");
                setPassword("");
                setEmail("");
            })
            .catch((error) => {
                //console.log("catch123");
                Alert.alert(
                    "Registration Error",
                    "an error occured during failed", error
                );
                console.log("registration failed", error);
            });
    };
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
        >
            <View>
                <Image
                    style={{
                        width: 180, height: 100, marginTop: 25
                    }}
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
                            marginTop: 12,
                            color: "#041E42"
                        }}
                    >
                        Register to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
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
                        <Ionicons
                            name="person"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />

                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: name ? 16 : 16
                            }}
                            placeholder="enter your Name"
                        />
                    </View>

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
                            name="email"
                            size={24}
                            color="gray"
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
                            placeholder="enter your Email"
                        />
                    </View>
                </View>

                <View>
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
                        Forget Password
                    </Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleRegister}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    style={{
                        width: 200,
                        backgroundColor: isPressed ? "#008000" : "#FEBE10",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        padding: 15,
                    }}
                >
                    <Text style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold"
                    }}
                    >
                        Register
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()} style={{ marginTop: 15 }}
                >

                    <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
                        Already have an account? sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})