import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Neutral } from "./Styling/Color";
import {router} from "expo-router"
const Chat : ({ name,id,lastMessage }:{name:string,id:number,lastMessage:string })=>any=({name,id,lastMessage}) => {
  
  return (
    //@ts-ignore
      <Pressable onPress={()=>{router.push("Chats/conversation/" + name+"/"+id)}} style={ styles.mainContainer }>
        <View style={styles.container}>
             <Image
      source={require('@/assets/images/userIcon.jpg')} // Placeholder image URL
      style={styles.profileImage}
    /><View style={styles.childContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
    </View>
        </View>
        </Pressable>
    )
};

export default Chat;
const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 150 / 2,
      },
      container:{
        flexDirection:"row",
        gap:10,
        padding: 5,
        backgroundColor: Neutral[950],
        width: "100%",
        borderWidth:1,
        borderRadius:5,
        borderColor:Neutral[600]
      },
      childContainer:{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        width: "100%",
        gap: 2,
      },
      name:{
        fontSize: 16,
        fontWeight: "bold",
        color:Neutral[50]
      },
      lastMessage:{
        fontSize: 15,
        color:Neutral[50]
      },
      mainContainer:{
        width:"100%"
      }
})