import {cva, VariantProps} from 'class-variance-authority';
import {PropsWithChildren} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';

export interface ButtonBaseProps
  extends PropsWithChildren<Partial<TouchableOpacity>>,
    VariantProps<typeof buttonBase> {
  buttonClassName?: string;
}

const ButtonBase = ({
  variant,
  disabled,
  size,
  children,
  buttonClassName: className,
}: ButtonBaseProps) => {
  return (
    <Pressable className={buttonBase({variant, size, disabled, className})} disabled={!!disabled}>
      {children}
    </Pressable>
  );
};

export const buttonBase = cva(['font-bold', 'rounded-md'], {
  variants: {
    variant: {
      primary: [
        'bg-blue-400',
        'active:bg-blue-500',
        'text-red-700',
        'item-center',
        'justify-center',
      ],
      secondary: ['bg-red-400', 'text-white', 'item-center', 'justify-center'],
      custom: [],
    },
    size: {
      small: ['h-10', 'px-5'],
      medium: ['px-5', 'h-10', 'min-w-[100px]'],
      large: ['px-5', 'h-14', 'min-w-[150px]'],
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
