import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ButtonBase from '../components/common/buttons/button-base';
import IconButton from '../components/common/buttons/icon-button';
import Section from '../components/common/section';
import ReviewSection from '../components/review/review-section';
import useProtectedRouter from '../hooks/router/use-protected-router';
import useRouter from '../hooks/router/use-router';
import { useCurrentUser } from '../hooks/user/use-current-user';
import { Colors } from '../utils/colors';

const product_id = 'SXlUlrf0646JAvA3ClNz';
const HomeScreen = () => {
  const router = useRouter('Home');
  const protectedRouter = useProtectedRouter('Home');
  const { authUser } = useCurrentUser();
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

  return (
    <SafeAreaView className='-mt-12 bg-white'>
      <ScrollView className={backgroundStyle}>
        <View className='bg-white dark:bg-black px-6 mt-4 mb-24'>
          <Section title='Step One'>
            Edit <Text className='font-bold'>App.js</Text> to change this screen and then come back
            to see your edits.
          </Section>
          {/* Reuse the button base to create customized buttons */}
          <IconButton
            onPress={() => (authUser ? protectedRouter.navigate('Cart') : null)}
            variant={'custom'}
            buttonClassName='flex justify-center bg-white border border-primary-dark/50'
          >
            <Icon name='shopping-cart' size={24} color={Colors.TEAL_DARKER.concat('90')}></Icon>
          </IconButton>
          <ButtonBase
            onPress={() => router.replace('Getting Started')}
            buttonClassName='mt-3'
            variant={'primary'}
          >
            <Text>Hello</Text>
          </ButtonBase>
          <ButtonBase
            onPress={() => protectedRouter.navigate('Profile')}
            buttonClassName='mt-3'
            variant={'secondary'}
          >
            <Text>Profile</Text>
          </ButtonBase>
          <ButtonBase
            onPress={() => router.navigate('All Questions')}
            buttonClassName='mt-3'
            variant={'primary'}
          >
            <Text>Forum</Text>
          </ButtonBase>
          <ButtonBase
            onPress={() =>
              router.navigate('Reviews', {
                id: product_id,
              })
            }
            buttonClassName='mt-3'
            variant={'secondary'}
          >
            <Text>Reviews</Text>
          </ButtonBase>

          <ButtonBase
            onPress={() => router.navigate('All Products')}
            buttonClassName='mt-3'
            variant={'primary'}
          >
            <Text>All products</Text>
          </ButtonBase>

          <Section title='See Your Changes'>
            <ReloadInstructions />
          </Section>
          <Section title='Debug'>
            <DebugInstructions />
          </Section>
          <Section title='Learn More'>Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
          <ReviewSection product_id={product_id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
