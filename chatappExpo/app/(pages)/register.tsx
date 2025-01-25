import {BackHandler, Text, View} from "react-native";
import {useEffect} from "react";
import {router} from "expo-router";

export default function Register() {
    useEffect(() => {
        const backAction = () => {
            router.push("/"); // Navigate to the previous screen
            return true; // Prevent default behavior
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        )
        return () => {backHandler.remove()}
    }, [router]);

    return (
        <View><Text>Hello This is the Register page</Text></View>
    )
}