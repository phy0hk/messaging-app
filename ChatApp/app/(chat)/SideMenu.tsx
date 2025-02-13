import { Button, Text, View } from "react-native"
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Neutral } from "@/components/Styling/Color";
const SideMenu = (props:any) =>{
    const navigation = useNavigation();
    return(
        <DrawerContentScrollView {...props}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:0}}>
            <Text style={{color:Neutral[50]}}>Side Menu</Text>
            <Button title="Click Me" onPress={()=>DrawerActions.closeDrawer()}/>
        </View>
        </DrawerContentScrollView>
    )
}
export default SideMenu;