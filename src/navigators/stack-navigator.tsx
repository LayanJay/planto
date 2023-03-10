import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddQuestionScreen from '../screens/add-question-screen';
import AllQuestionsScreen from '../screens/all-questions-screen';
import GetStartedScreen from '../screens/get-started-screen';
import HomeScreen from '../screens/home-screen';
import SingleQuestionScreen from '../screens/single-question-screen';
import {Colors} from '../utils/colors';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  'Getting Started': undefined;
  'All Questions': undefined;
  'Single Question': {id: string};
  'Add Question': undefined;
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
        component={GetStartedScreen}
        name='Getting Started'
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen component={HomeScreen} name='Home' />
      <Stack.Screen component={AllQuestionsScreen} name='All Questions' />
      <Stack.Screen component={SingleQuestionScreen} name='Single Question' />
      <Stack.Screen component={AddQuestionScreen} name='Add Question' />
    </Stack.Navigator>
  );
};

export default StackNavigator;
