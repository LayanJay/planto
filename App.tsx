import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/stack-navigator';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
