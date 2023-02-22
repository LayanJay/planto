/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ButtonBase from './src/components/common/buttons/ButtonBase';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View className='mt-8'>
      <Text className='text-2xl text-black dark:text-white'>{title}</Text>
      <Text className='mt-2 text-lg text-black dark:text-white'>{children}</Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = 'bg-white dark:bg-slate-900';

  return (
    <SafeAreaView className={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.white}
      />
      <ScrollView contentInsetAdjustmentBehavior='automatic' className={backgroundStyle}>
        <Header />
        <View className='bg-white dark:bg-black px-4'>
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
}

export default App;
