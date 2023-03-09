import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login-screen';
import SignUpScreen from '../screens/auth/signup-screen';
import GetStartedScreen from '../screens/get-started-screen';
import HomeScreen from '../screens/home-screen';
import { Colors } from '../utils/colors';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  'Getting Started': undefined;
  Login: undefined;
  'Sign Up': undefined;
  // TODO: Add other public routes and it's params here
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Getting Started'
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'Poppins',
          fontWeight: '500',
          fontSize: 18,
          color: Colors.TEAL_DARKER,
        },
        headerBackVisible: true,
        headerBackTitleStyle: {
          fontFamily: 'Poppins',
          fontSize: 10,
        },
        headerStyle: {
          backgroundColor: Colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        component={GetStartedScreen}
        name='Getting Started'
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen component={HomeScreen} name='Home' />
      <Stack.Screen component={LoginScreen} name='Login' options={{ headerTitle: 'Login' }} />
      <Stack.Screen component={SignUpScreen} name='Sign Up' options={{ headerTitle: 'Sign Up' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
