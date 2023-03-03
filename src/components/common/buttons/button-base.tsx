import {cva, VariantProps} from 'class-variance-authority';
import {PropsWithChildren} from 'react';
import {Pressable, PressableProps} from 'react-native';

export const enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  CUSTOM = 'custom',
}

export const enum ButtonSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  CUSTOM = 'custom',
}

export interface ButtonBaseProps
  extends PropsWithChildren<Partial<PressableProps>>,
    VariantProps<typeof buttonBase> {
  buttonClassName?: string;
}

const ButtonBase = (props: ButtonBaseProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      className={buttonBase({
        variant: props.variant,
        size: props.size,
        disabled: props.disabled,
        className: props.buttonClassName,
      })}
      disabled={!!props.disabled}
    >
      {props.children}
    </Pressable>
  );
};

export const buttonBase = cva(['rounded-full shadow-xl'], {
  variants: {
    variant: {
      primary: [
        'bg-primary-main',
        'active:bg-primary-dark',
        'flex',
        'item-center',
        'justify-center',
      ],
      secondary: [
        'bg-secondary-main',
        'active:bg-secondary-dark',
        'flex',
        'item-center',
        'justify-center',
      ],
      custom: [],
    },
    size: {
      small: ['h-10', 'px-5'],
      medium: ['px-5', 'h-14', 'min-w-[100px]'],
      large: ['px-5', 'h-16', 'min-w-[150px]'],
      custom: [],
    },
    disabled: {
      true: [
        'opacity-60',
        //     TODO: add other styles here. use 'disabled:... selector'
      ],
    },
  },
  //   compoundVariants: [{variant: 'primary', size: 'medium', className: ''}],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
});

export default ButtonBase;
