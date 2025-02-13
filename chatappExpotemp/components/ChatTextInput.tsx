import { StyleSheet,TextInput, View } from "react-native"
import { Neutral } from "./Styling/Color"

const CusTextInput :({}:{})=>any=()=>{
    return (
        <View style={styles.container}>
            <TextInput style={styles.e} />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    
})

export default CusTextInput