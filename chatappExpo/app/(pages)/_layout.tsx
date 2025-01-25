import {Stack} from "expo-router";
import {Neutral} from "@/components/Styling/Color";
import Animated from "react-native-reanimated";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false,animation:"slide_from_left",animationDuration:10}} />
            <Stack.Screen name="login" options={{headerShown: false,animation:"slide_from_right",animationDuration:10}} />
            <Stack.Screen name="register" options={{headerShown: false,animation:"slide_from_right",animationDuration:10}} />
        </Stack>
    )
}