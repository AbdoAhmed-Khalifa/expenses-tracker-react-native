import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { useAuth } from '../store/auth-context';
import StackNavigation from './StackNavigation';
import { useEffect, useState } from 'react';
import Loading from '../components/UI/Loading';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary800 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="ExpensesOverview" component={BottomTabNavigation} /> */}
      <Stack.Screen name="Edit" component={StackNavigation} />
    </Stack.Navigator>
  );
}

export default function AuthNavigation() {
  const { isAuthenticated, authenticate } = useAuth();
  const [appIsReady, setAppIsReady] = useState(true);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        authenticate(token);
      }
      setAppIsReady(false);
    }
    getToken();
  });

  if (appIsReady) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
