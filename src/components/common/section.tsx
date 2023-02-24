import {PropsWithChildren} from 'react';
import {Text, useColorScheme, View} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Section = ({title, children}: SectionProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View className='mb-8'>
      <Text className='text-2xl text-black dark:text-white'>{title}</Text>
      <Text className='mt-2 text-lg text-black dark:text-white'>{children}</Text>
    </View>
  );
};

export default Section;
