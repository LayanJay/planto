import { cx } from 'class-variance-authority';
import { useState } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

interface Props {
  control: Control<any, any>;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  inputWrapperClassNames?: string;
  inputClassNames?: string;
  secureTextEntry?: boolean;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

const InputBase = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={props.control}
      rules={props.rules}
      name={props.name}
      render={({ field, formState }) => (
        <View className={cx('relative flex items-start', props.inputWrapperClassNames)}>
          <Text className='font-main text-black/80 capitalize mb-1'>{props.label}</Text>

          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            placeholder={props.placeholder}
            className={cx(
              `${
                isFocused ? 'border-[1.5px] border-primary-main' : 'border border-black/20'
              } w-full rounded-full p-4 font-main`,
              props.inputClassNames
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={props.secureTextEntry}
          />
          {formState.errors && formState.errors[props.name]?.message?.toString() && (
            <Text className='absolute -bottom-4 right-2 text-red text-right text-xs truncate'>
              {formState.errors[props.name]?.message?.toString()}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default InputBase;