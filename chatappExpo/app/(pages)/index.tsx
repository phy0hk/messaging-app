import {Button,Text, BackHandler,Platform,StyleSheet, View} from "react-native";
import {Link, router} from "expo-router";
import LinkButton from "../../components/LinkButton";
import {Neutral,Slate} from "@/components/Styling/Color";
import {GlobalStyles} from "@/components/Styling/GlobalStyle";
import {useEffect} from "react";
export default function Home(){
    const styles = StyleSheet.create({
        font:{
            color:"white"
        }
    });
    return (
        <View style={GlobalStyles.mainContainer}>
            <Text style={styles.font}>
            This is really home
            </Text>
                <LinkButton link={"login"} title={"Login"} />
            <LinkButton link={"register"} title="Register" />
        </View>
    )
}