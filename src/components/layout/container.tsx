import { cx } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

interface Props extends PropsWithChildren {
  containerClassNames?: string;
}

const Container = (props: Props) => {
  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps={'always'}
      keyboardDismissMode='on-drag'
      className={cx('container px-6 bg-white', props.containerClassNames)}
    >
      {props.children}
    </ScrollView>
  );
};

export default Container;
