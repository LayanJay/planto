import React from 'react';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {Text, TextInput, View} from 'react-native';

interface Props {
  label: string;
  name: string;
  control: Control;
  style: any;
  inputStyle?: any;
  labelStyle?: any;
  errors: any;
  registerOptions?: RegisterOptions;
  placeholder: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
}

const Input = ({
  label,
  name,
  control,
  style,
  inputStyle,
  errors,
  registerOptions,
  placeholder,
  labelStyle,
  multiline = false,
  secureTextEntry = false,
}: Props) => {
  return (
    <View className='relative'>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={style}>
        <Controller
          control={control}
          rules={registerOptions}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              style={inputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={multiline}
            />
          )}
          name={name}
        />
      </View>
      <View className='absolute bottom-0 right-0'>
        {errors[name] && errors[name].message ? (
          <Text className='text-xs text-red'>{errors[name].message}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default Input;
