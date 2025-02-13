import {Button, StyleSheet, Text, View} from 'react-native';
import {Link} from 'expo-router'
import { Neutral } from '@/components/Styling/Color';


export default function NotFoundScreen() {
  return (
    
      <View style={styles.container}>
        <Text style={{color:Neutral[50]}}>Oppsie Not found</Text>
        <Link href="/">
          <Button title={"Go to Home"} />
        </Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap:10
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
