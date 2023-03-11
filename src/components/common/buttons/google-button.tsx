import { Image, Text } from 'react-native';
import ButtonBase, { type ButtonBaseProps } from './button-base';

interface Props extends Pick<ButtonBaseProps, 'disabled' | 'onPress'> {}

const GoogleButton = (props: Props) => {
  return (
    <ButtonBase
      onPress={props.onPress}
      variant={'custom'}
      disabled={props.disabled}
      buttonClassName='flex flex-row items-center justify-center space-x-3 bg-transparent active:bg-black/5 border border-black/20'
    >
      <Image source={require('../../../assets/images/icons/google-icon.png')} className='w-5 h-5' />
      <Text className='font-main text-black/80'>Continue with Google</Text>
    </ButtonBase>
  );
};

export default GoogleButton;
