import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type InputProps = {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & TextInputProps;

const Input = ({ startIcon, endIcon, ...props }: InputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.startIcon}>{startIcon}</View>
      <TextInput {...props} />
      <View style={styles.endIcon}>{endIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  startIcon: {
    marginHorizontal: 8,
  },
  endIcon: {
    marginHorizontal: 8,
  },
});

export default Input;
