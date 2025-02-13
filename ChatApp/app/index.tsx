import { ScrollView, Dimensions, useWindowDimensions, Text, BackHandler, Platform, StyleSheet, View } from "react-native";
import { Link, router } from "expo-router";
import LinkButton from "@/components/LinkButton";
import { Neutral, Slate } from "@/components/Styling/Color";
import { GlobalStyles } from "@/components/Styling/GlobalStyle";
import { useEffect, useState } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import Button from "@/components/Button"

export default function Home() {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const navigation = useNavigation();
    const state = navigation.getState();
    const delay = (ms: number) => { return new Promise(resolve => setTimeout(resolve, ms)) };
    const [exitApp, setExitApp] = useState(false);
    useEffect(() => {
        
        const backAction = () => {
            if (exitApp) {
              BackHandler.exitApp();
              return true;
            }
            setExitApp(true);
            ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      
            delay(2000).then(()=>{setExitApp(false)}) // Reset after 2 seconds
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [exitApp]);

    const styles = StyleSheet.create({
        font: {
            color: "white"
        }
    });
    return (
        <ScrollView>
            <View style={GlobalStyles({ screenWidth, screenHeight }).mainContainer}>
                <Text style={styles.font}>
                    This is really home
                </Text>
                <LinkButton link={"login"} title={"Login"} />
                <LinkButton link={"register"} title={"Register"} />
                <Button title={"ChatHome"} onClick={()=>router.replace("/Chats")} width={undefined} height={undefined} />
            </View>
        </ScrollView>
    )
}