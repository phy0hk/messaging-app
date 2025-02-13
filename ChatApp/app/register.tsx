import { BackHandler, Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ScrollView, useWindowDimensions } from "react-native";
import { Label } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { GlobalStyles } from "@/components/Styling/GlobalStyle";
import { useNavigation,CommonActions, useNavigationContainerRef } from "@react-navigation/native";
import { Neutral } from "@/components/Styling/Color";
import Button from "@/components/Button";
import LinkText from "@/components/LinkText";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {router} from "expo-router"

export default function Register() {
    const navigation = useNavigationContainerRef();
    const [UsernameInputFocus, setUsernameInputFocus] = useState(false);
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    useEffect(() => {
        const backAction = () => {
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [{ name: "Home" }],
            //     }));
            router.replace("/")
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    }, []);



    return (
        <ScrollView style={{ height: screenHeight, width: screenWidth }}>
            <View style={GlobalStyles({ screenWidth, screenHeight }).mainContainer}>
                <View style={GlobalStyles({ screenWidth, screenHeight }).subContainer}>
                    <View style={styles.headerContainer}>
                        <Label style={styles.labelStyle}>Register</Label>
                        <Label style={styles.labelStyle2}>Enter your details to register</Label>
                    </View>
                    <View style={styles.inputFieldContainer}>
                        <View style={styles.subInputFieldContainer}>
                            <Label style={styles.inputLabelStyle}>Username</Label>
                            <TextInput style={styles.inputBoxStyle} onFocus={() => setUsernameInputFocus(true)} />
                        </View>
                        <View style={styles.subInputFieldContainer}>
                            <Label style={styles.inputLabelStyle}>Email</Label>
                            <TextInput style={styles.inputBoxStyle} />
                        </View>
                        <View style={styles.subInputFieldContainer}>
                            <Label style={styles.inputLabelStyle}>Password</Label>
                            <TextInput style={styles.inputBoxStyle} secureTextEntry={true} />
                        </View>
                        <View style={styles.subInputFieldContainer}>
                            <Label style={styles.inputLabelStyle}>Confirm Password</Label>
                            <TextInput style={styles.inputBoxStyle} secureTextEntry={true} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Register" onClick={undefined} width={"auto"} height={"auto"} />
                        <View style={styles.footerText}>

                            <Label style={styles.footerLabelStyle}>Already have an account? </Label><LinkText text={"Login"} onPress={undefined} link={"Login"} />
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>
    )

}
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "column",
        gap: 8,
        width: "95%"
    },
    labelStyle: {
        color: Neutral["50"],
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left"
    },
    labelStyle2: {
        color: Neutral["50"],
        fontSize: 15,
        fontWeight: "400",
        textAlign: "left"
    },
    inputFieldContainer: {
        width: "95%",
        display: "flex",
        gap: 20
    },
    subInputFieldContainer: {
        gap: 10
    },
    buttonContainer: {
        width: "95%",
        display: "flex",
        gap: 15
    },
    footerText: {
        display: "flex",
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    inputBoxStyle: {
        color: Neutral["50"],
        borderWidth: 1,
        borderColor: Neutral["600"],
        borderRadius: 10,
        padding: 10,
    }
    ,
    footerLabelStyle: {
        color: Neutral["50"],
    },
    inputLabelStyle: {
        color: Neutral["50"],
        fontSize: 15,
        fontWeight: "semibold",
        textAlign: "left",
    }
})