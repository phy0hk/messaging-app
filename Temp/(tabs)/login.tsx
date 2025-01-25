import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
export default function Login() {
    const styles = StyleSheet.create({
        mainContainer: {
            height: '100%',
            paddingTop: 20,
        }
    })
    return (
        <View style={styles.mainContainer}>
            <Text>Hello World</Text>
        </View>
    )
}