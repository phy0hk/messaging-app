import {useRouter} from "expo-router";
import React from 'react';
import {Button, Pressable, StyleSheet, Text} from "react-native";
import {Yellow,Neutral} from "./Styling/Color";
import {Toast} from "expo-router/build/views/Toast";

// export default function LinkButton(link:any,Title:string) {
//     console.log(link)

//     return (
//         <Link href={link} asChild>
//             <Button title={Title}></Button>
//         </Link>
// );
// }

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
const LinkButton : ({link, title}: { link: any; title: string }) => any = ({link,title}) => {
    const router = useRouter();
    return (
        <Pressable onPress={()=>{router.push(link)}} style={styles.button}><Text style={styles.text}>{title}</Text></Pressable>
    )
}
export default LinkButton;