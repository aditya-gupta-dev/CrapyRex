import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/firebase";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { AuthProvider } from "./src/providers/AuthProvider";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const Theme: ReactNativePaper.Theme = { 
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ef562f"
  }
}

export default function App() {

  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={Theme}>
        <AuthProvider user={user}>
          <NavigationContainer>
            <Stack.Navigator>

              { user ? (
                <Stack.Screen name="Home" component={HomeScreen}/>
              ) : (
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
              ) }

            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
