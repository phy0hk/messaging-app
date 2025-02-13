import { CommonActions, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { BackHandler, Text,View,useWindowDimensions,Button, StyleSheet } from "react-native"
import { Neutral } from "@/components/Styling/Color";
import {router} from "expo-router"
import Chat from "@/components/Chat";

const ChatHome =()=>{
    const {height:screenHeight,width:screenWidth}=useWindowDimensions();
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
    return(
        <View style={styles(screenHeight,screenWidth).mainContainer}>
            <Chat name={"Kyaw Zin Htut"} lastMessage="Blah Blah Blah" id={0}/>
            <Chat name={"Aung Myint Myat"} lastMessage="Abrakadabra" id={1}/>
            <Chat name={"Bruce Wayne"} lastMessage="The truth is I am Batman" id={2}/>
            <Chat name={"Lwin Min Thein"} lastMessage="Nah" id={3}/>
        </View>
    )
}
export default ChatHome;
const styles =(screenHeight:number,screenWidth:number) =>StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems:"center",
        width:screenWidth,
        height:screenHeight,
        backgroundColor:Neutral["950"]
    }
})