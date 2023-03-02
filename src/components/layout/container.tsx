import {cx} from 'class-variance-authority';
import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

interface Props extends PropsWithChildren {
  containerClassNames?: string;
}

const Container = (props: Props) => {
  return (
    <View className={cx('container px-4 bg-white', props.containerClassNames)}>
      {props.children}
    </View>
  );
};

export default Container;
