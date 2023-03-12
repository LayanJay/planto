import { cx } from 'class-variance-authority';
import ButtonBase, { ButtonBaseProps, ButtonSizes } from './button-base';

interface Props extends ButtonBaseProps {}

const IconButton = (props: Props) => {
  return (
    <ButtonBase
      buttonClassName={cx(props.buttonClassName, 'items-center w-14 h-14')}
      size={ButtonSizes.CUSTOM}
      variant={props.variant}
    >
      {props.children}
    </ButtonBase>
  );
};

export default IconButton;
