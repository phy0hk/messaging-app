import {Pressable, Text,StyleSheet} from "react-native";
import {GlobalColor, Yellow} from "@/components/Styling/Color";
import {useState} from "react";
let buttonColor;
const Button : ({title,onClick,width,height}:{title:string,onClick:any,width:any,height:any})=>any=({title, onClick,height,width})=>{
    const [onHover,setHover] = useState(false);
    const [onPress,setPress] = useState(false);
    const style = StyleSheet.create({
        button:{
            backgroundColor: onHover||onPress? Yellow["500"]:Yellow["400"],
            paddingVertical:8,
            paddingHorizontal:12,
            elevation:10,
            width:width,
            height:height,
            borderRadius:10,
            justifyContent:"center",
            alignItems:"center"
        }
    })
    return (
        <Pressable onPress={onClick} style={style.button} onHoverIn={()=>{setHover(true)}} onHoverOut={()=>{setHover(false)}} onPressIn={()=>{setPress(true)}} onPressOut={()=>{setPress(false)}}><Text>{title}</Text></Pressable>
    )
};
export default Button;