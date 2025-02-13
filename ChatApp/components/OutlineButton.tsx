import {Pressable, Text,StyleSheet} from "react-native";
import {GlobalColor, Gray, Neutral, Yellow} from "@/components/Styling/Color";
import {useState} from "react";
let buttonColor;
const Button : ({title,onClick,width,height,theme}:{title:string,onClick:any,width:any,height:any,theme:string})=>any=({title,onClick,height,width,theme})=>{
    const [onHover,setHover] = useState(false);
    const [onPress,setPress] = useState(false);
    const style = StyleSheet.create({
        button:{
            backgroundColor:onHover||onPress? Neutral["900"]:"transparent",
            paddingVertical:8,
            paddingHorizontal:12,
            elevation:10,
            width:width,
            height:height,
            borderRadius:0,
            justifyContent:"center",
            alignItems:"center",
            borderColor:theme==="dark"?"dark":Neutral["600"],
            borderWidth:0.5
        },
        textStyle:{
            color:theme==="dark"?"dark":"white",
        }
    })
    return (
        <Pressable onPress={onClick} style={style.button} onHoverIn={()=>{setHover(true)}} onHoverOut={()=>{setHover(false)}} onPressIn={()=>{setPress(true)}} onPressOut={()=>{setPress(false)}}><Text style={style.textStyle}>{title}</Text></Pressable>
    )
};
export default Button;