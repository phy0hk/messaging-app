import {createDrawerNavigator} from "@react-navigation/drawer";
import Main from "./chatHome";
import SideMenu from "./SideMenu";
import { Platform, Text, View } from "react-native";
import { Neutral } from "@/components/Styling/Color";
const Router=()=>{
    const Drawer = createDrawerNavigator();
    return(
        
        <Drawer.Navigator drawerContent={(props)=><SideMenu{...props}/>} screenOptions={{

            drawerActiveTintColor: "#000000",
            drawerInactiveTintColor: "gray",
            drawerLabelStyle: { fontSize: 16, fontWeight: "bold" },
            headerStyle: { height:60,backgroundColor: Neutral["950"] },
            headerTintColor: Neutral[50],
            drawerStyle:{backgroundColor:Neutral[800]},
            headerShadowVisible:false
            // headerTransparent: true,
          }}>
            <Drawer.Screen  name="all" component={Main} options={{headerTitle:"Chats"}}/>
        </Drawer.Navigator>
    )
}
export default Router