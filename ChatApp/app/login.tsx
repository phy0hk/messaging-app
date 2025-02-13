import {Text, View, StyleSheet, TextInput, Dimensions, Platform,ScrollView, useWindowDimensions} from "react-native";
import {Neutral} from "@/components/Styling/Color";
import {GlobalStyles} from "@/components/Styling/GlobalStyle";
import Button from "@/components/Button";
import {Label} from "@react-navigation/elements";
import OutlineButton from "@/components/OutlineButton";
import OrSeperator from "@/components/OrSeperator";
import {router} from "expo-router";
import {useEffect} from "react";
import {BackHandler} from "react-native"
import {useNavigation,CommonActions} from "@react-navigation/native";


export default function Login() {
    const {height:screenHeight,width:screenWidth} = useWindowDimensions();

    const navigation = useNavigation();
    useEffect(() => {

        const backAction = () => {
            // navigation.dispatch(
            //     CommonActions.reset({
            //     index: 0,
            // routes: [{ name: "Home" }],
            // }));
            router.replace("/")
            return true;
        };
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            )
        return () => {backHandler.remove()}
    }, []);

return (
    <ScrollView>
        <View style={GlobalStyles({screenWidth,screenHeight}).mainContainer}>
            <View style={GlobalStyles({screenWidth,screenHeight}).subContainer}>
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
                    <OutlineButton title={"register"} onClick={()=>{
                        // @ts-ignore
                        navigation.navigate('Register')}} width={"auto"} height={"auto"} theme={"light"}/>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    loginInput: {
        borderWidth: 1,
        width:"95%",
        padding:10,
        color:Neutral["50"],
        borderRadius:10,
        borderColor:Neutral["600"],
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