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
  default: {
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
  },
  input: {
    borderRadius: 8,
    fontSize: 16,
    height: 44,
    paddingHorizontal: 12,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    color: '#1f2937',
  },
});
