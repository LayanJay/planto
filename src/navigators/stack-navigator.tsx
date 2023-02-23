import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  // TODO: Add other routes and it's params here
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        component={HomeScreen}
        name='Home'
        options={{
          headerStyle: {
            backgroundColor: '#eee',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
