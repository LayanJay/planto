import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login-screen';
import SignUpScreen from '../screens/auth/signup-screen';
import { Colors } from '../utils/colors';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  Login: undefined;
  'Sign Up': undefined;
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'Poppins',
          fontWeight: '500',
          fontSize: 18,
          color: Colors.BLACK,
        },
        headerStyle: {
          backgroundColor: Colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
