import {Platform, StyleSheet,Dimensions} from 'react-native';
import {Neutral} from "./Color";


export const GlobalStyles:({screenWidth,screenHeight}:{screenWidth:any,screenHeight:any})=>any=({screenHeight,screenWidth}) => StyleSheet.create({
    mainContainer: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor:Neutral["950"],
        height:screenHeight || "100%",
        width:screenWidth || "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap:10,
    },
    subContainer: {
        backgroundColor:Neutral["950"],
        width:"90%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal:15,
        paddingVertical:30,
        elevation:10,
        gap:20,
        borderColor:Neutral["600"],
        borderRadius:10,
        borderStyle:"solid",
        borderWidth:1,
        maxWidth:400
    }
})