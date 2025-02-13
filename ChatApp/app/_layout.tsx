import { Neutral } from "@/components/Styling/Color";
import { Stack,router } from "expo-router";
import { Platform, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import { startTheDB,openDB } from "@/db/database";

export default function RootLayout() {
  useEffect(()=>{
    async function initDB() {
      try {
        const db = await openDB(); 
        await startTheDB(db);
        await db.closeAsync;
      } catch (error) {
        console.error(error)
      }  
    }
    if(Platform.OS!=="web"){
      initDB()
    }
  })
  const {height:screenHeight,width:screenWidth} = useWindowDimensions();
  return (
  <GestureHandlerRootView style={{backgroundColor:Neutral[950],height:screenHeight,width:screenWidth}}>
  <Stack screenOptions={
    {
      headerTintColor:"white",
      headerTransparent:true,
      headerTitle:"Home",
    }
  } >
    <Stack.Screen name="index" options={{headerTitle:"Home",headerBackVisible:false}}/>
    <Stack.Screen name="login" options={{headerTitle:"Login"}}/>
    <Stack.Screen name="register" options={{headerTitle:"Register"}}/>
    <Stack.Screen name="(chat)" options={{headerShown:false}} />
    </Stack>
    </GestureHandlerRootView>
)}
