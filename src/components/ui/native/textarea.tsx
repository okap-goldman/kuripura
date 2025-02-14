import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface TextareaProps extends TextInputProps {
  variant?: 'default' | 'outline';
}

export const Textarea = ({ variant = 'default', style, ...props }: TextareaProps) => {
  return (
    <TextInput
      style={[styles.textarea, styles[variant], style]}
      placeholderTextColor="#9ca3af"
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    color: '#1f2937',
  },
  textarea: {
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
    padding: 12,
  },
});
