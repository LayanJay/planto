import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCurrentUser } from '../hooks/user/use-current-user';
import AddQuestionScreen from '../screens/add-question-screen';
import AllQuestionsScreen from '../screens/all-questions-screen';
import LoginScreen from '../screens/auth/login-screen';
import SignUpScreen from '../screens/auth/signup-screen';
import GetStartedScreen from '../screens/get-started-screen';
import HomeScreen from '../screens/home-screen';
import AddReviewScreen from '../screens/review/add-review-screen';
import ReviewsScreen from '../screens/review/reviews-screen';
import SingleQuestionScreen from '../screens/single-question-screen';
import { Colors } from '../utils/colors';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  'Sign Up': undefined;
  'Getting Started': undefined;
  'All Questions': undefined;
  'Single Question': { id: string };
  'Add Question': undefined;
  'Add Review': { id: string; rating: number };
  Login: undefined;
  Reviews: { id: string };

  // TODO: Add other public routes and it's params here
};

const StackNavigator = () => {
  const { authUser, loading } = useCurrentUser();
  return (
    <Stack.Navigator
      initialRouteName={!loading && authUser ? 'Home' : 'Getting Started'}
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
      <Stack.Screen component={AllQuestionsScreen} name='All Questions' />
      <Stack.Screen component={SingleQuestionScreen} name='Single Question' />
      <Stack.Screen component={AddQuestionScreen} name='Add Question' />
      <Stack.Screen component={LoginScreen} name='Login' options={{ headerTitle: 'Login' }} />
      <Stack.Screen component={SignUpScreen} name='Sign Up' options={{ headerTitle: 'Sign Up' }} />
      <Stack.Screen
        component={AddReviewScreen}
        name='Add Review'
        options={{ headerTitle: 'Add a Review' }}
      />
      <Stack.Screen component={ReviewsScreen} name='Reviews' options={{ headerTitle: 'Reviews' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
