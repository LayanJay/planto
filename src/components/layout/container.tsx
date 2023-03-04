import { cx } from 'class-variance-authority';
import React, { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

interface Props extends PropsWithChildren {
  containerClassNames?: string;
}

const Container = (props: Props) => {
  return (
    <ScrollView className={cx('container px-6 bg-white', props.containerClassNames)}>
      {props.children}
    </ScrollView>
  );
};

export default Container;
