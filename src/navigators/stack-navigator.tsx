import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCurrentUser } from '../hooks/user/use-current-user';
import { IProductDocument } from '../schemas/product-schema';
import AddQuestionScreen from '../screens/add-question-screen';
import AllQuestionsScreen from '../screens/all-questions-screen';
import CartScreen from '../screens/auth/cart-screen';
import CheckoutScreen from '../screens/auth/checkout-screen';
import EditProfileScreen from '../screens/auth/edit-profile-screen';
import LoginScreen from '../screens/auth/login-screen';
import ProfileScreen from '../screens/auth/profile-screen';
import SignUpScreen from '../screens/auth/signup-screen';
import GetStartedScreen from '../screens/get-started-screen';
import HomeScreen from '../screens/home-screen';
import AddProductScreen from '../screens/product/add-product-screen';
import AllProducts from '../screens/product/all-products-screen';
import EditProductScreen from '../screens/product/edit-product-screen';
import SingleProductScreen from '../screens/product/single-product-screen';
import AddReviewScreen from '../screens/review/add-review-screen';
import EditReviewScreen from '../screens/review/edit-review-screen';
import ReviewsScreen from '../screens/review/reviews-screen';
import SingleQuestionScreen from '../screens/single-question-screen';
import { Colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/Feather';
import useProtectedRouter from '../hooks/router/use-protected-router';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  'Getting Started': undefined;
  'All Questions': undefined;
  'Single Question': {
    id: string;
  };
  'Add Question': undefined;
  'Add Review': { id: string; rating: number };
  'Edit Review': { product_id: string; review_id: string };
  Login: undefined;
  Reviews: { id: string };
  'All Products': undefined;
  'Single Product': IProductDocument;
  'Edit Product': IProductDocument;
  'Add Product': undefined;
  'Sign Up': undefined;
  Profile: undefined;
  EditProfile: {
    email: string;
    first_name: string;
    last_name: string;
    address: string;
  };
  Checkout: undefined;
  Cart: undefined;
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
      <Stack.Screen component={AllProducts} name='Home' />
      <Stack.Screen component={ProfileScreen} name='Profile' />
      <Stack.Screen
        component={EditProfileScreen}
        name='EditProfile'
        options={{ headerTitle: 'Edit Profile' }}
      />
      <Stack.Screen component={CartScreen} name='Cart' options={{ headerTitle: 'My Cart' }} />
      <Stack.Screen
        component={CheckoutScreen}
        name='Checkout'
        options={{ headerTitle: 'Checkout' }}
      />
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
      <Stack.Screen
        component={EditReviewScreen}
        name='Edit Review'
        options={{ headerTitle: 'Edit your Review' }}
      />
      <Stack.Screen component={ReviewsScreen} name='Reviews' options={{ headerTitle: 'Reviews' }} />
      <Stack.Screen component={AllProducts} name='All Products' />
      <Stack.Screen
        component={SingleProductScreen}
        name='Single Product'
        options={{ headerTitle: 'Plant' }}
      />
      <Stack.Screen component={AddProductScreen} name='Add Product' />
      <Stack.Screen component={EditProductScreen} name='Edit Product' />
    </Stack.Navigator>
  );
};

export default StackNavigator;
