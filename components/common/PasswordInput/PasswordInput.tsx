import { Input } from '@/components/ui/Input';
import { InputProps } from '@/components/ui/Input/Input';
import { useThemedColors } from '@/hooks/use-theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

type PasswordInputProps = Omit<InputProps, 'endIcon' | 'secureTextEntry'>;

const PasswordInput = (props: PasswordInputProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const colors = useThemedColors();

  return (
    <Input
      secureTextEntry={!isShow}
      endIcon={
        <Ionicons
          name={isShow ? 'eye' : 'eye-off'}
          size={16}
          color={colors.icon}
          onPress={() => setIsShow((prev) => !prev)}
        />
      }
      {...props}
    />
  );
};

export default PasswordInput;
