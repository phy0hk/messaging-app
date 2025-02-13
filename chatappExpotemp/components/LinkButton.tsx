import React from 'react';
import {Button, Pressable, StyleSheet, Text} from "react-native";
import {Yellow,Neutral} from "./Styling/Color";
import {useNavigation} from "@react-navigation/native";


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
    const Navigation = useNavigation();
    return (
        <Pressable onPress={()=>{
            // @ts-ignore
            Navigation.navigate(link)}} style={styles.button}><Text style={styles.text}>{title}</Text></Pressable>
    )
}
export default LinkButton;