import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/stack-navigator';

GoogleSignin.configure({
  webClientId: '291970194958-olfn5vp6gfrb61hs1lod5beth8rfofja.apps.googleusercontent.com',
});

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
