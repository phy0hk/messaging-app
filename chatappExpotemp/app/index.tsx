import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import StackNavigationRoutes from './stackNavigation'
import ChatHomeDrawer from "./pages/chatHome/SideMenuRouter"
export default function RootLayout() {
  const linking = {
    prefixes: ['http://localhost:8081/', 'exp://'],
    config: {
      screens: {
        Home: '',
        Login: 'login',
        Register:'register',
        ChatHome:'chatHomegg',
      },
    },
  }
  return (
<NavigationIndependentTree>
  <NavigationContainer linking={linking}>
    <StackNavigationRoutes/>
  </NavigationContainer>
</NavigationIndependentTree>
  )

}