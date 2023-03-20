import { cx } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface Props extends PropsWithChildren {
  containerClassNames?: string;
}

const Container = (props: Props) => {
  return (
    <View className={cx('container px-6 bg-white', props.containerClassNames)}>
      {props.children}
    </View>
  );
};

export default Container;
