import { cx } from 'class-variance-authority';
import { Text } from 'react-native';
import ButtonBase, { ButtonBaseProps, ButtonSizes, ButtonVariants } from './button-base';

interface Props extends ButtonBaseProps {
  selected: boolean;
}

const Chip = (props: Props) => {
  return (
    <ButtonBase
      buttonClassName={cx(
        props.buttonClassName,
        'bg-white border-2 px-3 py-1',
        props.selected ? 'border-black/90' : 'border-black/30'
      )}
      variant={ButtonVariants.CUSTOM}
      size={ButtonSizes.CUSTOM}
      onPress={props.onPress}
    >
      <Text className={`font-main ${props.selected ? 'text-black font-bold' : ''}`}>
        {props.children}
      </Text>
    </ButtonBase>
  );
};

export default Chip;
