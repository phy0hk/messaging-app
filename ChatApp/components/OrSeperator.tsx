import {Text, View,StyleSheet} from "react-native";
import {Neutral} from "@/components/Styling/Color";
const OrSeperator :()=>any=()=> {
    const styles = StyleSheet.create({
        hr:{
            backgroundColor:Neutral["600"],
            width:"40%",
            height:1,
            marginTop:5,
        },
        container:{
            height:40,
            gap:10,
            flexDirection:"row",
            alignItems:'center',
            justifyContent:'center',
        },
        text:{
            fontSize:14,
            color:Neutral["50"],
        }
    })
    return (
        <View style={[styles.container]}>
            <View style={styles.hr}></View>
            <Text style={styles.text}>OR</Text>
            <View style={styles.hr}></View>
        </View>
)
};
export default OrSeperator;