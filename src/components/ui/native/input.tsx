import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'outline';
}

export const Input = ({ variant = 'default', style, ...props }: InputProps) => {
  return (
    <TextInput
      style={[styles.input, styles[variant], style]}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 8,
  },
  default: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    color: '#1f2937',
  },
});
