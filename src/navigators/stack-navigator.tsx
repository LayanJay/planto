import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import SplashScreen from '../screens/splash-screen';
import {Colors} from '../utils/colors';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  'Getting Started': undefined;
  // TODO: Add other routes and it's params here
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
          color: Colors.BLACK,
        },
        headerStyle: {
          backgroundColor: Colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        component={SplashScreen}
        name='Getting Started'
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen component={HomeScreen} name='Home' />
    </Stack.Navigator>
  );
};

export default StackNavigator;
