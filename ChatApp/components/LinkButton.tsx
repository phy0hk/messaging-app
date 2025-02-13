import React from 'react';
import {Button, Pressable, StyleSheet, Text} from "react-native";
import {Yellow,Neutral} from "./Styling/Color";
import {router} from "expo-router"


const styles = StyleSheet.create({
    button: {
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Yellow["400"],
        boxShadow: "white",
        borderRadius:5,
    },
    text:{
        color: "black",
    }
});
const LinkButton : ({link, title}: { link: string; title: string }) => any = ({link,title}) => {
    return (
        <Pressable onPress={()=>{
            // @ts-ignore
            router.push(link)}} style={styles.button}><Text style={styles.text}>{title}</Text></Pressable>
    )
}
export default LinkButton;