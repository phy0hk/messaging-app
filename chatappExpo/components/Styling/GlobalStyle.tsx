import {Platform, StyleSheet,Dimensions} from 'react-native';
import {Neutral} from "./Color";

const {height:screenHeight,width:screenWidth} = Dimensions.get('window');
export const GlobalStyles = StyleSheet.create({
    mainContainer: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor:Neutral["950"],
        height:screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
        gap:10,
    }
})