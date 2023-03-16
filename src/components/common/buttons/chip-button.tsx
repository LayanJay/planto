import { cx } from 'class-variance-authority';
import ButtonBase, { ButtonBaseProps, ButtonSizes, ButtonVariants } from './button-base';

interface Props extends ButtonBaseProps {
  selected: boolean;
}

// TODO: @Nav: Add selected state

const Chip = (props: Props) => {
  return (
    <ButtonBase
      buttonClassName={cx(props.buttonClassName, 'bg-white border px-3 py-1')}
      variant={ButtonVariants.CUSTOM}
      size={ButtonSizes.CUSTOM}
    >
      {props.children}
    </ButtonBase>
  );
};

export default Chip;