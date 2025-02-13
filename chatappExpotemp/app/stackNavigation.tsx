import 'react-native-reanimated';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Home from "./pages/home"
import Register from "./pages/register"
import Login from "./pages/login"
import Conversation from './pages/conversation';
import ChatHomeRouter from './pages/chatHome/SideMenuRouter';
import ChatHome from './pages/chatHome/chatHome'
import {createStackNavigator} from '@react-navigation/stack';
import { Neutral } from '@/components/Styling/Color';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import "@/hooks/guestureHandler"
import "@/app/style.css"

const Stack = createStackNavigator();
export default function RootLayout() {
  return (
        <View style={{backgroundColor:Neutral["950"],flex: 1}}>
        <Stack.Navigator screenOptions={{headerShown: true,headerShadowVisible:true,headerTintColor:Neutral[50],headerStyle:{backgroundColor:Neutral[950]}}}  detachInactiveScreens={false}>
          <Stack.Screen
              name={"Home"}
              component={Home}
              options={{animation: "slide_from_left",headerShown:Platform.OS!=='web',headerTransparent:true}}
          />
      <Stack.Screen
          name={"Login"}
          component={Login}
          options={{animation: "slide_from_right",headerShown:Platform.OS!=='web',headerTransparent:true}}
            />
            <Stack.Screen
          name="Register"
          component={Register}
          options={{animation: "slide_from_right",headerShown:Platform.OS!=='web',headerTransparent:true}}
            />
          <Stack.Screen
          name="ChatHome"
          component={ChatHomeRouter}
          options={{animation: "slide_from_right",headerShown:false}}
            />            
            <Stack.Screen
          name="Conversation"
          //@ts-ignore
          component={Conversation}
          options={{animation: "slide_from_right",headerShown:Platform.OS!=='web'}}
            />
        </Stack.Navigator>
        </View>
  );
}