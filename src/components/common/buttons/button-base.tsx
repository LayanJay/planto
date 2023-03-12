import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

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
  extends PropsWithChildren<Partial<TouchableOpacityProps>>,
    VariantProps<typeof buttonBase> {
  buttonClassName?: string;
  loading?: boolean;
}

const ButtonBase = (props: ButtonBaseProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      className={buttonBase({
        variant: props.variant,
        size: props.size,
        isDisabled: props.disabled,
        className: props.buttonClassName,
      })}
      disabled={!!props.disabled}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export const buttonBase = cva(['rounded-full'], {
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
    isDisabled: {
      true: ['opacity-70'],
    },
  },
  //   compoundVariants: [{variant: 'primary', size: 'medium', className: ''}],
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    isDisabled: false,
  },
});

export default ButtonBase;
