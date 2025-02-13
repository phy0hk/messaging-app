import { Text,StyleSheet, Pressable } from "react-native"
import { Yellow } from "./Styling/Color"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
const LinkText : ({ text, onPress,link}:{text:string,onPress:any,link:string})=> any = ({text,onPress,link}) => {
    const [hover,setHover] = useState(false);
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        text:{
            color:hover? Yellow["200"]:Yellow["400"],
        }
    })

    return (
        <Pressable onHoverIn={()=>setHover(true)} onHoverOut={()=>setHover(false)}>
            <Text onPress={//@ts-ignore
            ()=>navigation.navigate(link)} style={styles.text}>{text}
            </Text>
        </Pressable>
    )
}
export default LinkText