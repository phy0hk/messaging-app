import { Neutral } from "@/components/Styling/Color";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useWindowDimensions } from "react-native";
export default function RootLayout() {
  const {height:screenHeight,width:screenWidth} = useWindowDimensions();
  return (
  <GestureHandlerRootView style={{backgroundColor:Neutral[950],width:screenWidth,height:screenHeight}}>
  <Stack screenOptions={
    {
      headerTintColor:"white",
      headerStyle:{backgroundColor:Neutral[950]},
      headerShadowVisible:false
        }
  }>
    <Stack.Screen name="Chats" options={{headerShown:false}}/>
    <Stack.Screen name="Chats/conversation/[username]/[conversation]"/> 
    </Stack>
    </GestureHandlerRootView>
    )
}
