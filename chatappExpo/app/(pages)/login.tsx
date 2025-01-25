import {Text, View, StyleSheet, TextInput, Dimensions, Platform} from "react-native";
import {Neutral} from "@/components/Styling/Color";
import {GlobalStyles} from "@/components/Styling/GlobalStyle";
import Button from "../../components/Button"
import {Input} from "postcss";
import "../style.css"
import {Label} from "@react-navigation/elements";
import OutlineButton from "@/components/OutlineButton";
import OrSeperator from "@/components/OrSeperator";
import {router} from "expo-router";
import {useEffect} from "react";
import {BackHandler} from "react-native"

export default function Login() {
    const styles = StyleSheet.create({
        loginContainer: {
            backgroundColor:Neutral["950"],
            width:"90%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal:15,
            paddingVertical:30,
            elevation:10,
            gap:20,
            borderColor:Neutral["600"],
            borderRadius:10,
            borderStyle:"solid",
            borderWidth:1,
            maxWidth:400
        },
        loginInput: {
            borderWidth: 1,
            width:"95%",
            padding:10,
            color:Neutral["50"],
            borderRadius:10,
            borderColor:Neutral["600"],
            outline:"none"
        },
        loginInputContainer:{
            width:"80%",
        },
        headerLabelStyle: {
            fontSize:18,
            textAlign:"left",
            fontWeight:"bold",
            color:Neutral["50"],
        },
        headerDescriptionStyle: {
            fontSize:15,
            fontWeight:"400",
            textAlign:"left",
            color:Neutral["50"],
        },
        headerContainer: {
            flexDirection:"column",
            gap:8,
            width:"95%"
        },
        inputLabelStyle: {
            fontSize:15,
            textAlign:"left",
            color:Neutral["50"],
            fontWeight:"semibold",
            width:"95%",
        },
        buttonContainer: {
            flexDirection:"column",
            gap:10,
            width:"95%"
        }
    });

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
        <View style={GlobalStyles.mainContainer}>
            <View style={styles.loginContainer}>
                    <View style={styles.headerContainer}>
                <Label style={styles.headerLabelStyle}>Login</Label>
                    <Text style={styles.headerDescriptionStyle}>Enter your credentials to access your account.</Text>
                </View>
                <Label style={styles.inputLabelStyle}>Email</Label>
                <TextInput placeholderTextColor={"white"} style={styles.loginInput} />
                <Label style={styles.inputLabelStyle}>Password</Label>
                    <TextInput placeholderTextColor={"white"} secureTextEntry={true} style={styles.loginInput} />
                <View style={styles.buttonContainer}>
                    <Button title={"Login"} onClick={undefined} width={"auto"} height={"auto"} />
                    <OrSeperator />
                    <OutlineButton title={"Register"} onClick={()=>{router.push("/register")}} width={"auto"} height={"auto"} theme={"light"}/>
                </View>
            </View>
        </View>
    )
}