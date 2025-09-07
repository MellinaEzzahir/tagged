//libraries
import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './auth-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

//components
import LoginScreen from './login/login-screen';
import SignUpScreen from './login/sign-up-screen';
import MainScreen from './main-screen';

//functions
const Stack = createNativeStackNavigator();
const Tab = createNativeStackNavigator();

function AuthStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn == null){
    return null;
  }

  return isLoggedIn ? (<MainScreen />) : (<AuthStack />)
}



export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
