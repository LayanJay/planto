import {useNavigation} from '@react-navigation/native';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ButtonBase from '../components/common/buttons/ButtonBase';
import Section from '../components/common/section';
import {RootStackScreenProps} from '../interfaces/navigation';

const HomeScreen = () => {
  const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>();
  const backgroundStyle = 'bg-white dark:bg-slate-900 h-screen';

  // const userRef = doc(db, `${FirestoreCollections.USERS}/1`).withConverter(userConverter);
  // const userCollRef = collection(db, `${FirestoreCollections.USERS}`).withConverter(userConverter);
  // addDoc(
  //   userCollRef,
  //   UserSchema.createDocFromJson({
  //     uid: '',
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     role: '',
  //     purchases: [],
  //     reviews: [],
  //   })
  // );
  // setDoc(
  //   userRef,
  //   UserSchema.createDocFromJson({
  //     uid: '',
  //     first_name: '',
  //     last_name: '',
  //     email: '',
  //     role: '',
  //     purchases: [],
  //     reviews: [],
  //   })
  // );
  // updateDoc(userRef, {
  //   first_name: '',
  //   email: '',
  //   purchases: [],
  //   ...FirebaseUtils.getModifiedTimestamp(),
  // });
  return (
    <SafeAreaView className='-mt-12 bg-white'>
      <ScrollView className={backgroundStyle}>
        <View className='bg-white dark:bg-black px-4 mt-4 mb-24'>
          <Section title='Step One'>
            Edit <Text className='font-bold'>App.js</Text> to change this screen and then come back
            to see your edits.
          </Section>
          {/* Reuse the button base to create customized buttons */}

          <ButtonBase buttonClassName='mt-3' variant={'primary'}>
            <Text>Hello</Text>
          </ButtonBase>

          <Section title='See Your Changes'>
            <ReloadInstructions />
          </Section>
          <Section title='Debug'>
            <DebugInstructions />
          </Section>
          <Section title='Learn More'>Read the docs to discover what to do next:</Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
