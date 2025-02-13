import { StyleSheet, Text, View } from "react-native"
import { Neutral, Yellow } from "./Styling/Color";

const Message:({sendBy,messageText}:{sendBy:string,messageText:string})=>any=({sendBy,messageText})=>{
    const styles = StyleSheet.create({
    container:{
        paddingLeft:8,
        padding:8,
        justifyContent:"center"
    },
    textStyle:{
        color:sendBy==="user"?Neutral[950]:Neutral[50],
    },
    subContainer:{
        backgroundColor:sendBy==="user"?Yellow[400]:Neutral[500],
        maxWidth:"80%",
        padding:10,
        width:"auto",
        alignSelf:sendBy==="user"?"flex-end":"flex-start",
    }
})
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
            <Text style={styles.textStyle}>{messageText}</Text>
            </View>
        </View>
    )
}
export default Message;