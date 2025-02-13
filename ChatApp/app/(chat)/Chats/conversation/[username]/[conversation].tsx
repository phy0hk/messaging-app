import { GlobalStyles } from "@/components/Styling/GlobalStyle";
import { BackHandler,  StyleSheet, Text,View,useWindowDimensions,Keyboard, ScrollView, Platform } from "react-native"
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Neutral, Slate, Yellow, Zinc } from "@/components/Styling/Color";
import { FlatList, Pressable, TextInput } from "react-native-gesture-handler";
import Message from "@/components/message";
import { useLocalSearchParams } from "expo-router";
import {router,useNavigation } from 'expo-router'
import Button from "@/components/Button"
import { addMessage, getMessagesByChatID, openDB, saveScreenPosition } from "@/db/database";
import { index } from "realm";

const Conversation = ({ }: {  }) => {
    const params = useLocalSearchParams();
    const scrollViewRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }
  const scrollAlittle = () =>{
    scrollViewRef.current?.scrollToOffset({offset:1000,animated:true})
  }
    const userName = params.username;
    const chatID = params.conversation;
    const navigation = useNavigation()
    const [keyboardHeight,setKeyboardHeight] = useState(0);
    const [messagesAreaHeight,setMessagesAreaHeight] = useState(0);
    const [chatInputAreaHeight,setcChatInputAreaHeight] = useState(0);
    const [messagesArray,setMessagesArray]:any = useState([]);
    const [scrollPosition,setScrollPosition] = useState()
    
    const [text,setText] = useState("");
    const [onSendHover,setSendHover] = useState(false)
    const [onSendPress,setSendPress] = useState(false)
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    
useEffect(()=>{
    async function getMessagesFromLocal(){
        const messages = await getMessagesByChatID(chatID,await openDB())
        for(const msg of messages){
                setMessagesArray((prevMessage: any)=>[...prevMessage,{message:msg.message,sender:"user"}]);   
        }
    }
    if(Platform.OS!=="web"){
            getMessagesFromLocal()
    }
},[])
const scrollPOSSave = async (event:any) =>{
    setScrollPosition(event.nativeEvent.contentOffset.y)
    saveScreenPosition(scrollPosition,chatID,await openDB());
}
    const sendMesssage = async () =>{
            if(text!==""){
                saveMessageToLocal(text)
                setMessagesArray((prevMessage: any)=>[...prevMessage,{message:text,sender:"user"}]);
                scrollToBottom()
            }
        setText("")
    }
    const saveMessageToLocal =async(text:string)=>{
        if(Platform.OS!=="web"){
            await addMessage(await openDB(),"user",text,Date.now(),chatID)
        }
    }
    const styles = StyleSheet.create({
        mainContainer:{
            width:screenWidth,
            height:screenHeight,
            backgroundColor:Neutral[950],
            flex:1
        },
        inputArea:{
            backgroundColor:Neutral[900],
            textAlignVertical:"center",
            textAlign:"center",
            height:50,
            width:"100%",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"row",
            gap:10,
            padding:5,
            maxHeight:50,
            minHeight:50,
        },
        messagesArea:{
        width:"100%",
        flex:1,
        backgroundColor:Neutral[700],
        maxHeight:(screenHeight-50)-(keyboardHeight+55),
        },
        TextStyle:{
            color:Neutral[50],
        },
        inputStyle:{
            color:Neutral[50],
            flex:1,
            height:"100%"
        },
        scrollViewStyle:{
            flex:1,
            minHeight:"100%",
        },
        sendButton:{
        backgroundColor: onSendHover||onSendPress? Yellow["500"]:Yellow["400"],
                paddingVertical:8,
                paddingHorizontal:12,
                elevation:10,
                width:"auto",
                height:"auto",
                borderRadius:5,
                justifyContent:"center",
                alignItems:"center",
        }
    })
    useEffect(()=>{
        const showSubscription = Keyboard.addListener("keyboardDidShow",async (event) => {
            setKeyboardHeight(event.endCoordinates.height);
            scrollAlittle()
          });
      
          const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
          });
          return () => {
            showSubscription.remove();
            hideSubscription.remove();
          };
    },[])
    useLayoutEffect(()=>{
        navigation.setOptions({title:userName})
        navigation.setOptions({headerLeft:()=>null})
    })
    useEffect(() => {
            const backAction = () => {
                router.back()
                return true;
            };
                const backHandler = BackHandler.addEventListener(
                    "hardwareBackPress",
                    backAction
                )
            return () => {backHandler.remove()}
        }, []);
    return(
        <View style={styles.mainContainer}>
            <View style={styles.messagesArea}>
                <FlatList ref={scrollViewRef} style={styles.scrollViewStyle} data={messagesArray} onScroll={(event)=>scrollPOSSave(event)} initialScrollIndex={0} renderItem={({item})=>(<Message index={item.id} sendBy={item.sender} messageText={item.message} onLoad={null}/>)} contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end",paddingBottom:keyboardHeight>=0?10:0}}/>
                <Button title={"GO to bottom"} onClick={undefined} width={"auto"} height={"auto"} />
            </View>
            <View style={styles.inputArea}>
                <TextInput multiline={true} placeholderTextColor={Neutral[50]} placeholder="Message" value={text} onChangeText={(value)=>setText(value)} style={styles.inputStyle} />
                {/* <Pressable onPress={sendMesssage} style={{backgroundColor:"blue",padding:3}}><Text>Send</Text></Pressable> */}
                <Pressable style={styles.sendButton} onPress={sendMesssage}><Text>Send</Text></Pressable>
            </View>
        </View>
    )
};
export default Conversation;

